<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'
import api, { API_BASE_URL } from '@/utils/api'

useHead({
  title: 'AllDrop - LạcGO',
  meta: [
    {
      name: 'description',
      content: 'Truyền file P2P trong local network qua WebRTC, không relay dữ liệu file qua server.',
    },
  ],
})

interface DeviceItem {
  device_id: string
  device_name: string
  ip: string
  capabilities?: Record<string, unknown>
  last_seen_at: string
}

interface IncomingFileOffer {
  transferId: string
  senderDeviceId: string
  senderName: string
  fileName: string
  fileSize: number
  mimeType: string
  isSpeedTest: boolean
}

interface ReceivedFileItem {
  transferId: string
  senderName: string
  fileName: string
  fileSize: number
  mimeType: string
  blobUrl: string | null
  savedToDisk: boolean
  createdAt: string
}

type SignalType =
  | 'file-offer'
  | 'file-accept'
  | 'file-reject'
  | 'resume-request'
  | 'webrtc-offer'
  | 'webrtc-answer'
  | 'webrtc-ice'

interface SignalMessage {
  signal_id: string
  sender_device_id: string
  target_device_id: string
  signal_type: SignalType
  payload: any
  created_at: string
}

interface TransferState {
  transferId: string
  peer: RTCPeerConnection | null
  channel: RTCDataChannel | null
  channels: RTCDataChannel[]
  file: File | null
  targetDeviceId: string
  targetName: string
  sentBytes: number
  receivedBytes: number
  expectedBytes: number
  buffers: ArrayBuffer[]
  fileMeta: {
    fileName: string
    fileSize: number
    mimeType: string
    senderName: string
    isSpeedTest: boolean
  } | null
  status: 'waiting' | 'connecting' | 'sending' | 'receiving' | 'done' | 'rejected' | 'error'
  connectTimeoutId: ReturnType<typeof setTimeout> | null
  startedAtMs: number | null
  completedAtMs: number | null
  speedMbps: number | null
  isSpeedTest: boolean
  checksumState: number
  expectedChecksum: number | null
  checksumStrict: boolean
  resumeAttempts: number
  writer: any | null
  writeQueue: Promise<void>
  currentSpeedMbps: number | null
  lastSpeedBytes: number
  lastSpeedAtMs: number | null
  chunkSize: number
  parallelChannels: number
  nextReceiveChunkIndex: number
  pendingChunks: Map<number, ArrayBuffer>
  uiLastUpdateAtMs: number | null
  packetMode: boolean
  singleChannelMode: boolean
  fallbackRetried: boolean
  adaptiveEnabled: boolean
  targetParallelChannels: number
  lowSpeedSinceMs: number | null
  highSpeedSinceMs: number | null
  adaptiveSwitchCount: number
  isAdaptiveSwitching: boolean
}

const DEVICE_ID_KEY = 'local_send_session_device_id'
const DEVICE_NAME_KEY = 'local_send_device_name'
const AUTO_ACCEPT_ALL_KEY = 'local_send_auto_accept_all'
const CHUNK_SIZE = 64 * 1024
const BUFFERED_AMOUNT_LIMIT = 16 * 1024 * 1024
const BUFFERED_AMOUNT_LOW = 4 * 1024 * 1024
const PARALLEL_DATA_CHANNELS = 1
const MEMORY_RECEIVE_LIMIT = 150 * 1024 * 1024

const ANIMAL_NAMES = [
  'Fox',
  'Otter',
  'Tiger',
  'Koala',
  'Panda',
  'Falcon',
  'Dolphin',
  'Rabbit',
  'Wolf',
  'Lynx',
  'Turtle',
  'Owl',
]

const deviceId = ref(getOrCreateDeviceId())
const deviceName = ref(getOrCreateDeviceName())

const selectedFile = ref<File | null>(null)
const selectedTarget = ref<string | null>(null)
const autoAcceptAll = ref(localStorage.getItem(AUTO_ACCEPT_ALL_KEY) === '1')

const devices = ref<DeviceItem[]>([])
const incomingOffers = ref<IncomingFileOffer[]>([])
const activeOffer = ref<IncomingFileOffer | null>(null)
const offerDialog = ref(false)

const receivedFiles = ref<ReceivedFileItem[]>([])
const transferList = ref<TransferState[]>([])

const loadingDevices = ref(false)
const requesting = ref(false)
const announcing = ref(false)
const lastError = ref('')

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref<'success' | 'error' | 'info'>('info')

const transferMap = reactive(new Map<string, TransferState>())
const apiBaseHint = API_BASE_URL
let announceTimer: ReturnType<typeof setInterval> | null = null
let deviceTimer: ReturnType<typeof setInterval> | null = null
let signalTimer: ReturnType<typeof setInterval> | null = null

const deviceOptions = computed(() =>
  devices.value.map((d) => ({
    value: d.device_id,
    label: `${d.device_name} (${d.ip})`,
  }))
)

const latestSpeedResult = computed(() =>
  transferList.value.find((t) => t.isSpeedTest && t.speedMbps && t.status === 'done')
)

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i += 1) {
    let c = i
    for (let j = 0; j < 8; j += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c >>> 0
  }
  return table
})()

function crc32Start(): number {
  return 0xffffffff
}

function crc32Update(crc: number, bytes: Uint8Array): number {
  let c = crc >>> 0
  for (let i = 0; i < bytes.length; i += 1) {
    const byte = bytes[i] ?? 0
    const tableValue = CRC32_TABLE[(c ^ byte) & 0xff] ?? 0

    c = tableValue ^ (c >>> 8)
    //c = CRC32_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8)
  }
  return c >>> 0
}

function crc32Finalize(crc: number): number {
  return (crc ^ 0xffffffff) >>> 0
}

function getOrCreateDeviceId(): string {
  const existed = sessionStorage.getItem(DEVICE_ID_KEY)
  if (existed) {
    return existed
  }

  const created = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  sessionStorage.setItem(DEVICE_ID_KEY, created)
  return created
}

function getOrCreateDeviceName(): string {
  const existed = localStorage.getItem(DEVICE_NAME_KEY)
  if (existed) {
    return existed
  }

  const generated = createRandomAnimalDeviceName()
  localStorage.setItem(DEVICE_NAME_KEY, generated)
  return generated
}

function createRandomAnimalDeviceName(): string {
  const animal = ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)]
  return `${animal}-${Math.floor(Math.random() * 900 + 100)}`
}

function regenerateDeviceName(): void {
  const generated = createRandomAnimalDeviceName()
  deviceName.value = generated
  localStorage.setItem(DEVICE_NAME_KEY, generated)
  notify('Đã tạo tên thiết bị ngẫu nhiên mới.', 'info')
  void announceDevice()
}

function saveDeviceName(): void {
  localStorage.setItem(DEVICE_NAME_KEY, deviceName.value.trim())
  void announceDevice()
}

function notify(text: string, color: 'success' | 'error' | 'info' = 'info'): void {
  snackbarText.value = text
  snackbarColor.value = color
  showSnackbar.value = true
}

function saveAutoAcceptAll(): void {
  localStorage.setItem(AUTO_ACCEPT_ALL_KEY, autoAcceptAll.value ? '1' : '0')
}

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function transferProgress(transfer: TransferState): number {
  if (transfer.expectedBytes <= 0) return 0
  const bytes = transfer.status === 'sending' ? transfer.sentBytes : transfer.receivedBytes
  return Math.min(100, Math.round((bytes / transfer.expectedBytes) * 100))
}

function updateLiveSpeed(transfer: TransferState, currentBytes: number): void {
  const now = Date.now()

  if (!transfer.lastSpeedAtMs) {
    transfer.lastSpeedAtMs = now
    transfer.lastSpeedBytes = currentBytes
    transfer.currentSpeedMbps = null
    return
  }

  const deltaTimeMs = now - transfer.lastSpeedAtMs
  if (deltaTimeMs < 450) {
    return
  }

  const deltaBytes = currentBytes - transfer.lastSpeedBytes
  if (deltaBytes >= 0) {
    const mbps = deltaBytes / (deltaTimeMs / 1000) / (1024 * 1024)
    transfer.currentSpeedMbps = Number(mbps.toFixed(2))
  }

  transfer.lastSpeedAtMs = now
  transfer.lastSpeedBytes = currentBytes
}

function transferSubtitle(transfer: TransferState): string {
  const parts = [`${transfer.targetName}`, transfer.status]

  if (transfer.currentSpeedMbps !== null && (transfer.status === 'sending' || transfer.status === 'receiving')) {
    parts.push(`${transfer.currentSpeedMbps} MB/s`)
  }

  if (transfer.speedMbps) {
    parts.push(`${transfer.speedMbps} MB/s`)
  }

  if (transfer.resumeAttempts) {
    parts.push(`resume x${transfer.resumeAttempts}`)
  }

  return parts.join(' • ')
}

function transferTitle(transfer: TransferState): string {
  const baseName = transfer.fileMeta?.fileName || transfer.file?.name || 'Phiên truyền file'
  return baseName
}

async function announceDevice(): Promise<void> {
  if (!deviceName.value.trim()) {
    notify('Vui lòng nhập tên thiết bị.', 'error')
    return
  }

  announcing.value = true
  lastError.value = ''
  try {
    await api.post('/all-drop/devices/announce', {
      device_id: deviceId.value,
      device_name: deviceName.value.trim(),
      capabilities: {
        webrtc_data_channel: true,
      },
    })
  } catch (error) {
    console.error(error)
    lastError.value = 'Không thể announce thiết bị. Kiểm tra API base URL và kết nối backend.'
    notify(lastError.value, 'error')
  } finally {
    announcing.value = false
  }
}

async function loadDevices(): Promise<void> {
  loadingDevices.value = true
  try {
    const response = await api.get('/all-drop/devices', {
      params: {
        exclude_device_id: deviceId.value,
      },
    })

    devices.value = response.data.devices ?? []

    if (selectedTarget.value && !devices.value.some((d) => d.device_id === selectedTarget.value)) {
      selectedTarget.value = null
    }
  } catch (error) {
    console.error(error)
    lastError.value = 'Không tải được danh sách thiết bị. Có thể frontend chưa gọi đúng backend trong cùng mạng LAN.'
  } finally {
    loadingDevices.value = false
  }
}

async function sendSignal(targetDeviceId: string, signalType: SignalType, payload: Record<string, any>): Promise<void> {
  await api.post('/all-drop/signals', {
    sender_device_id: deviceId.value,
    target_device_id: targetDeviceId,
    signal_type: signalType,
    payload,
  })
}

function createTransferState(data: Partial<TransferState> & Pick<TransferState, 'transferId' | 'targetDeviceId' | 'targetName'>): TransferState {
  const state: TransferState = {
    transferId: data.transferId,
    peer: data.peer ?? null,
    channel: data.channel ?? null,
    channels: data.channels ?? [],
    file: data.file ?? null,
    targetDeviceId: data.targetDeviceId,
    targetName: data.targetName,
    sentBytes: data.sentBytes ?? 0,
    receivedBytes: data.receivedBytes ?? 0,
    expectedBytes: data.expectedBytes ?? 0,
    buffers: data.buffers ?? [],
    fileMeta: data.fileMeta ?? null,
    status: data.status ?? 'waiting',
    connectTimeoutId: null,
    startedAtMs: data.startedAtMs ?? null,
    completedAtMs: data.completedAtMs ?? null,
    speedMbps: data.speedMbps ?? null,
    isSpeedTest: data.isSpeedTest ?? false,
    checksumState: data.checksumState ?? crc32Start(),
    expectedChecksum: data.expectedChecksum ?? null,
    checksumStrict: data.checksumStrict ?? true,
    resumeAttempts: data.resumeAttempts ?? 0,
    writer: data.writer ?? null,
    writeQueue: data.writeQueue ?? Promise.resolve(),
    currentSpeedMbps: data.currentSpeedMbps ?? null,
    lastSpeedBytes: data.lastSpeedBytes ?? 0,
    lastSpeedAtMs: data.lastSpeedAtMs ?? null,
    chunkSize: data.chunkSize ?? CHUNK_SIZE,
    parallelChannels: data.parallelChannels ?? 1,
    nextReceiveChunkIndex: data.nextReceiveChunkIndex ?? 0,
    pendingChunks: data.pendingChunks ?? new Map<number, ArrayBuffer>(),
    uiLastUpdateAtMs: data.uiLastUpdateAtMs ?? null,
    packetMode: data.packetMode ?? false,
    singleChannelMode: data.singleChannelMode ?? false,
    fallbackRetried: data.fallbackRetried ?? false,
    adaptiveEnabled: data.adaptiveEnabled ?? true,
    targetParallelChannels: data.targetParallelChannels ?? PARALLEL_DATA_CHANNELS,
    lowSpeedSinceMs: data.lowSpeedSinceMs ?? null,
    highSpeedSinceMs: data.highSpeedSinceMs ?? null,
    adaptiveSwitchCount: data.adaptiveSwitchCount ?? 0,
    isAdaptiveSwitching: data.isAdaptiveSwitching ?? false,
  }

  transferMap.set(state.transferId, state)
  upsertTransferList(state)
  return state
}

function createSpeedTestFile(sizeMB: number): File {
  const totalBytes = sizeMB * 1024 * 1024
  const buffer = new Uint8Array(totalBytes)
  return new File([buffer], `SpeedTest-${sizeMB}MB.bin`, {
    type: 'application/octet-stream',
  })
}

function calculateMBps(bytes: number, startedAtMs: number | null, completedAtMs: number | null): number | null {
  if (!startedAtMs || !completedAtMs || completedAtMs <= startedAtMs) {
    return null
  }

  const seconds = (completedAtMs - startedAtMs) / 1000
  const megaBytes = bytes / (1024 * 1024)
  return Number((megaBytes / seconds).toFixed(2))
}

async function waitForBufferedAmountLow(channel: RTCDataChannel): Promise<void> {
  if (channel.bufferedAmount <= BUFFERED_AMOUNT_LIMIT) {
    return
  }

  await new Promise<void>((resolve) => {
    const done = () => {
      channel.removeEventListener('bufferedamountlow', done)
      resolve()
    }
    channel.addEventListener('bufferedamountlow', done, { once: true })
  })
}

function hasOpfsSupport(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.storage && 'getDirectory' in navigator.storage
}

function hasDiskStreamingSupport(): boolean {
  const hasSavePicker = typeof window !== 'undefined' && 'showSaveFilePicker' in window
  const hasOpfs = hasOpfsSupport()
  return hasSavePicker || hasOpfs
}

function createSafeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, '_')
}

async function prepareReceiveWriter(offer: IncomingFileOffer, autoMode = false): Promise<any | null> {
  if (offer.isSpeedTest) {
    return null
  }

  if (autoMode && hasOpfsSupport()) {
    const root = await (navigator.storage as any).getDirectory()
    const safeName = createSafeFileName(offer.fileName)
    const fileHandle = await root.getFileHandle(`${Date.now()}-${safeName}`, { create: true })
    return fileHandle.createWritable({ keepExistingData: false })
  }

  const hasPicker = typeof window !== 'undefined' && 'showSaveFilePicker' in window
  if (!hasPicker) {
    if (!hasOpfsSupport()) {
      return null
    }

    const root = await (navigator.storage as any).getDirectory()
    const safeName = createSafeFileName(offer.fileName)
    const fileHandle = await root.getFileHandle(`${Date.now()}-${safeName}`, { create: true })
    return fileHandle.createWritable({ keepExistingData: false })
  }

  const picker = (window as unknown as { showSaveFilePicker: Function }).showSaveFilePicker
  const fileHandle = await picker({
    suggestedName: offer.fileName,
    types: [
      {
        description: 'Received file',
        accept: {
          [offer.mimeType || 'application/octet-stream']: ['.*'],
        },
      },
    ],
  })

  return fileHandle.createWritable({ keepExistingData: false })
}

async function enqueueWriterChunk(transfer: TransferState, data: ArrayBuffer): Promise<void> {
  if (!transfer.writer) {
    return
  }

  transfer.writeQueue = transfer.writeQueue.then(() => transfer.writer.write(data))
  await transfer.writeQueue
}

function upsertTransferList(state: TransferState): void {
  const idx = transferList.value.findIndex((x) => x.transferId === state.transferId)
  if (idx === -1) {
    transferList.value.unshift(state)
    return
  }

  transferList.value[idx] = state
  transferList.value = [...transferList.value]
}

function maybeUpdateTransferList(state: TransferState): void {
  const now = Date.now()
  if (!state.uiLastUpdateAtMs || (now - state.uiLastUpdateAtMs) >= 220 || state.status === 'done' || state.status === 'error') {
    state.uiLastUpdateAtMs = now
    upsertTransferList(state)
  }
}

function processIncomingPayload(transfer: TransferState, payload: ArrayBuffer): void {
  transfer.checksumState = crc32Update(transfer.checksumState, new Uint8Array(payload))
  if (transfer.writer) {
    void enqueueWriterChunk(transfer, payload)
  } else {
    transfer.buffers.push(payload)
  }

  transfer.receivedBytes += payload.byteLength
  updateLiveSpeed(transfer, transfer.receivedBytes)
  maybeUpdateTransferList(transfer)
}

async function handleSenderChannelFailure(transfer: TransferState, reason: string): Promise<void> {
  transfer.status = 'error'
  upsertTransferList(transfer)
  notify(reason, 'error')
}

async function requestSendFile(overrideFile?: File | Event | null, speedTest = false): Promise<void> {
  const fileToSend = overrideFile instanceof File ? overrideFile : selectedFile.value

  if (!fileToSend || !selectedTarget.value) {
    notify('Vui lòng chọn file và thiết bị nhận.', 'error')
    return
  }

  const target = devices.value.find((d) => d.device_id === selectedTarget.value)
  if (!target) {
    notify('Thiết bị nhận không còn online.', 'error')
    return
  }

  const transferId = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  const file = fileToSend
  const state = createTransferState({
    transferId,
    targetDeviceId: target.device_id,
    targetName: target.device_name,
    file,
    expectedBytes: file.size,
    status: 'waiting',
    isSpeedTest: speedTest,
  })

  requesting.value = true
  try {
    await sendSignal(target.device_id, 'file-offer', {
      transferId,
      senderName: deviceName.value.trim(),
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
      isSpeedTest: speedTest,
    })

    notify(
      speedTest
        ? `Đã gửi yêu cầu test tốc độ tới ${target.device_name}.`
        : `Đã gửi yêu cầu truyền file tới ${target.device_name}.`,
      'success'
    )
    upsertTransferList(state)
  } catch (error) {
    console.error(error)
    state.status = 'error'
    upsertTransferList(state)
    notify('Không gửi được yêu cầu truyền file.', 'error')
  } finally {
    requesting.value = false
  }
}

async function startSpeedTest(sizeMB: number): Promise<void> {
  if (!selectedTarget.value) {
    notify('Vui lòng chọn thiết bị nhận để test tốc độ.', 'error')
    return
  }

  const file = createSpeedTestFile(sizeMB)
  await requestSendFile(file, true)
}

async function pullSignals(): Promise<void> {
  try {
    const response = await api.get(`/all-drop/signals/${encodeURIComponent(deviceId.value)}/pull`)
    const signals: SignalMessage[] = response.data.signals ?? []

    lastError.value = ''

    for (const signal of signals) {
      await handleSignal(signal)
    }
  } catch (error) {
    const err = error as Error & { status?: number; details?: unknown; url?: string }
    console.error(err)

    if (err.status === 503) {
      // Signal queue lock contention can happen briefly, do not surface as hard error.
      return
    }

    const suffix = err.status ? ` (HTTP ${err.status})` : ''
    const endpoint = err.url ? ` [${err.url}]` : ''
    lastError.value = `Không pull được tín hiệu kết nối P2P từ backend${suffix}${endpoint}.`
    if (err.message) {
      notify(err.message, 'error')
    }
  }
}

async function handleSignal(signal: SignalMessage): Promise<void> {
  switch (signal.signal_type) {
    case 'file-offer': {
      const payload = signal.payload
      const offer: IncomingFileOffer = {
        transferId: payload.transferId,
        senderDeviceId: signal.sender_device_id,
        senderName: payload.senderName,
        fileName: payload.fileName,
        fileSize: payload.fileSize,
        mimeType: payload.mimeType,
        isSpeedTest: Boolean(payload.isSpeedTest),
      }

      incomingOffers.value.unshift(offer)
      if (autoAcceptAll.value) {
        const requiresManualPicker = !offer.isSpeedTest
          && !hasOpfsSupport()
          && typeof window !== 'undefined'
          && 'showSaveFilePicker' in window

        if (requiresManualPicker) {
          activeOffer.value = offer
          offerDialog.value = true
          notify('Auto nhận cần bạn xác nhận nơi lưu file trên thiết bị này.', 'info')
          break
        }

        await acceptIncomingOffer(offer, true)
        break
      }

      if (!activeOffer.value) {
        activeOffer.value = offer
        offerDialog.value = true
      }
      break
    }

    case 'file-accept': {
      const payload = signal.payload
      const transferId: string = payload.transferId
      const state = transferMap.get(transferId)
      if (!state || !state.file) {
        return
      }

      await startSenderPeerConnection(state, payload.resumeOffset ?? 0)
      break
    }

    case 'file-reject': {
      const transferId: string = signal.payload.transferId
      const state = transferMap.get(transferId)
      if (!state) {
        return
      }

      state.status = 'rejected'
      upsertTransferList(state)
      notify(`${state.targetName} đã từ chối file.`, 'info')
      break
    }

    case 'resume-request': {
      const payload = signal.payload
      const transferId: string = payload.transferId
      const state = transferMap.get(transferId)
      if (!state || !state.file) {
        return
      }

      state.resumeAttempts += 1
      upsertTransferList(state)
      await startSenderPeerConnection(state, payload.resumeOffset ?? state.sentBytes)
      break
    }

    case 'webrtc-offer': {
      const payload = signal.payload
      await startReceiverPeerConnection(
        payload.transferId,
        signal.sender_device_id,
        payload.senderName,
        payload.fileName,
        payload.fileSize,
        payload.mimeType,
        payload.resumeOffset ?? 0,
        Boolean(payload.isSpeedTest),
        payload.offer
      )
      break
    }

    case 'webrtc-answer': {
      const payload = signal.payload
      const state = transferMap.get(payload.transferId)
      if (!state?.peer) {
        return
      }

      const sanitizedAnswer = sanitizeSdpDescription(payload.answer)
      await state.peer.setRemoteDescription(new RTCSessionDescription(sanitizedAnswer))
      break
    }

    case 'webrtc-ice': {
      const payload = signal.payload
      const state = transferMap.get(payload.transferId)
      if (!state?.peer || !payload.candidate) {
        return
      }

      try {
        await state.peer.addIceCandidate(new RTCIceCandidate(payload.candidate))
      } catch (error) {
        console.error(error)
      }
      break
    }

    default:
      break
  }
}

async function acceptIncomingOffer(offer: IncomingFileOffer, autoMode = false): Promise<void> {
  if (!offer.isSpeedTest && !hasDiskStreamingSupport()) {
    if (offer.fileSize > MEMORY_RECEIVE_LIMIT) {
      notify('Thiết bị nhận sẽ dùng RAM để nhận file lớn. Với file rất lớn, nên dùng Chrome/Edge desktop để lưu trực tiếp xuống đĩa.', 'info')
    }
  }

  let writer: any | null = null
  try {
    writer = await prepareReceiveWriter(offer, autoMode)
  } catch (error) {
    if (autoMode) {
      activeOffer.value = offer
      offerDialog.value = true
      notify('Auto nhận tạm dừng: cần bạn xác nhận nơi lưu file.', 'info')
      return
    }

    notify('Bạn đã hủy chọn nơi lưu file nhận.', 'info')
    return
  }

  incomingOffers.value = incomingOffers.value.filter((o) => o.transferId !== offer.transferId)
  activeOffer.value = incomingOffers.value[0] ?? null
  offerDialog.value = Boolean(activeOffer.value)

  const existing = transferMap.get(offer.transferId)
  const resumeOffset = existing?.receivedBytes ?? 0

  createTransferState({
    transferId: offer.transferId,
    targetDeviceId: offer.senderDeviceId,
    targetName: offer.senderName,
    expectedBytes: offer.fileSize,
    receivedBytes: resumeOffset,
    fileMeta: {
      fileName: offer.fileName,
      fileSize: offer.fileSize,
      mimeType: offer.mimeType,
      senderName: offer.senderName,
      isSpeedTest: offer.isSpeedTest,
    },
    status: 'connecting',
    isSpeedTest: offer.isSpeedTest,
    writer,
    writeQueue: Promise.resolve(),
    lastSpeedAtMs: Date.now(),
    lastSpeedBytes: resumeOffset,
  })

  await sendSignal(offer.senderDeviceId, 'file-accept', {
    transferId: offer.transferId,
    resumeOffset,
  })

  notify(`Đã chấp nhận file từ ${offer.senderName}.`, 'success')
}

async function rejectIncomingOffer(offer: IncomingFileOffer): Promise<void> {
  incomingOffers.value = incomingOffers.value.filter((o) => o.transferId !== offer.transferId)
  activeOffer.value = incomingOffers.value[0] ?? null
  offerDialog.value = Boolean(activeOffer.value)

  await sendSignal(offer.senderDeviceId, 'file-reject', {
    transferId: offer.transferId,
  })

  notify('Đã từ chối yêu cầu nhận file.', 'info')
}

function createPeerConnection(transfer: TransferState): RTCPeerConnection {
  const peer = new RTCPeerConnection({
    iceServers: [],
  })

  peer.onicecandidate = (event) => {
    if (!event.candidate) {
      return
    }

    void sendSignal(transfer.targetDeviceId, 'webrtc-ice', {
      transferId: transfer.transferId,
      candidate: event.candidate,
    })
  }

  peer.onconnectionstatechange = () => {
    if (peer.connectionState === 'connected') {
      clearTransferConnectTimeout(transfer)
    }

    if (peer.connectionState === 'failed' || peer.connectionState === 'disconnected') {
      if (transfer.status === 'receiving' && transfer.expectedBytes > 0 && transfer.receivedBytes < transfer.expectedBytes) {
        void sendSignal(transfer.targetDeviceId, 'resume-request', {
          transferId: transfer.transferId,
          resumeOffset: transfer.receivedBytes,
        })
        transfer.status = 'connecting'
        upsertTransferList(transfer)
        startTransferConnectTimeout(transfer)
        return
      }

      clearTransferConnectTimeout(transfer)
      transfer.status = 'error'
      upsertTransferList(transfer)
      notify('Kết nối P2P bị gián đoạn.', 'error')
    }
  }

  transfer.peer = peer
  upsertTransferList(transfer)
  return peer
}

function startTransferConnectTimeout(transfer: TransferState): void {
  clearTransferConnectTimeout(transfer)
  transfer.connectTimeoutId = setTimeout(() => {
    if (transfer.status === 'connecting' || transfer.status === 'waiting') {
      transfer.status = 'error'
      upsertTransferList(transfer)
      notify('Kết nối P2P timeout. Hãy thử gửi lại.', 'error')

      if (transfer.channel) {
        transfer.channel.close()
      }

      for (const ch of transfer.channels) {
        ch.close()
      }

      if (transfer.peer) {
        transfer.peer.close()
      }
    }
  }, 20000)
}

function clearTransferConnectTimeout(transfer: TransferState): void {
  if (!transfer.connectTimeoutId) {
    return
  }

  clearTimeout(transfer.connectTimeoutId)
  transfer.connectTimeoutId = null
}

async function waitForIceGatheringComplete(peer: RTCPeerConnection, timeoutMs = 6000): Promise<void> {
  if (peer.iceGatheringState === 'complete') {
    return
  }

  await new Promise<void>((resolve) => {
    let settled = false

    const done = () => {
      if (settled) {
        return
      }

      settled = true
      peer.removeEventListener('icegatheringstatechange', onStateChange)
      clearTimeout(timer)
      resolve()
    }

    const onStateChange = () => {
      if (peer.iceGatheringState === 'complete') {
        done()
      }
    }

    const timer = setTimeout(done, timeoutMs)
    peer.addEventListener('icegatheringstatechange', onStateChange)
  })
}

async function startSenderPeerConnection(transfer: TransferState, startOffset = 0): Promise<void> {
  if (!transfer.file) {
    return
  }

  if (transfer.channel) {
    transfer.channel.close()
  }

  for (const ch of transfer.channels) {
    ch.close()
  }

  if (transfer.peer) {
    transfer.peer.close()
  }

  transfer.status = 'connecting'
  startTransferConnectTimeout(transfer)
  const peer = createPeerConnection(transfer)
  const channel = peer.createDataChannel('file-transfer', { ordered: true })
  channel.bufferedAmountLowThreshold = BUFFERED_AMOUNT_LOW
  channel.binaryType = 'arraybuffer'

  transfer.channel = channel
  transfer.channels = []
  transfer.parallelChannels = 1
  transfer.targetParallelChannels = 1
  transfer.chunkSize = CHUNK_SIZE
  transfer.packetMode = false
  upsertTransferList(transfer)

  let started = false
  const tryStart = () => {
    if (started) {
      return
    }

    if (channel.readyState !== 'open') {
      return
    }

    started = true
    void sendFileThroughChannels(transfer)
  }

  channel.onopen = () => {
    tryStart()
  }

  channel.onerror = () => {
    void handleSenderChannelFailure(transfer, 'Data channel gặp lỗi khi gửi file.')
  }

  const offer = await peer.createOffer()
  await peer.setLocalDescription(offer)
  await waitForIceGatheringComplete(peer)

  await sendSignal(transfer.targetDeviceId, 'webrtc-offer', {
    transferId: transfer.transferId,
    senderName: deviceName.value.trim(),
    fileName: transfer.file.name,
    fileSize: transfer.file.size,
    mimeType: transfer.file.type || 'application/octet-stream',
    resumeOffset: startOffset,
    isSpeedTest: transfer.isSpeedTest,
    offer: peer.localDescription,
  })
}

async function startReceiverPeerConnection(
  transferId: string,
  senderDeviceId: string,
  senderName: string,
  fileName: string,
  fileSize: number,
  mimeType: string,
  resumeOffset: number,
  isSpeedTest: boolean,
  offer: RTCSessionDescriptionInit
): Promise<void> {
  let transfer = transferMap.get(transferId)
  if (!transfer) {
    transfer = createTransferState({
      transferId,
      targetDeviceId: senderDeviceId,
      targetName: senderName,
      expectedBytes: fileSize,
      receivedBytes: resumeOffset,
      fileMeta: {
        fileName,
        fileSize,
        mimeType,
        senderName,
        isSpeedTest,
      },
      status: 'connecting',
      isSpeedTest,
    })
  } else if (resumeOffset > transfer.receivedBytes) {
    transfer.receivedBytes = resumeOffset
    upsertTransferList(transfer)
  }

  const peer = createPeerConnection(transfer)
  startTransferConnectTimeout(transfer)

  peer.ondatachannel = (event) => {
    const channel = event.channel
    channel.binaryType = 'arraybuffer'

    transfer.channel = channel
    transfer.status = 'receiving'
    upsertTransferList(transfer)
    channel.onmessage = (msgEvent) => {
      handleIncomingData(transfer as TransferState, msgEvent.data)
    }
    channel.onerror = () => {
      transfer.status = 'error'
      upsertTransferList(transfer)
      notify('Data channel gặp lỗi khi nhận file.', 'error')
    }
  }

  const sanitizedOffer = sanitizeSdpDescription(offer)
  await peer.setRemoteDescription(new RTCSessionDescription(sanitizedOffer))
  const answer = await peer.createAnswer()
  await peer.setLocalDescription(answer)
  await waitForIceGatheringComplete(peer)

  await sendSignal(senderDeviceId, 'webrtc-answer', {
    transferId,
    answer: peer.localDescription,
  })
}

function sanitizeSdpDescription(desc: RTCSessionDescriptionInit): RTCSessionDescriptionInit {
  const type = desc.type
  const sdp = desc.sdp

  if (!type || !sdp) {
    return desc
  }

  const normalizedSdp = sdp
    .replace(/\r?\n/g, '\n')
    .split('\n')
    .filter((line) => line.trim() !== 'a=max-message-size:262144')
    .join('\r\n')

  return {
    type,
    sdp: normalizedSdp.endsWith('\r\n') ? normalizedSdp : `${normalizedSdp}\r\n`,
  }
}

async function sendFileThroughChannels(transfer: TransferState): Promise<void> {
  const file = transfer.file
  const channel = transfer.channel
  if (!file || !channel) {
    return
  }

  const startOffset = transfer.sentBytes > 0 ? transfer.sentBytes : 0
  let chunkCount = Math.floor(startOffset / CHUNK_SIZE)

  transfer.status = 'sending'
  clearTransferConnectTimeout(transfer)
  transfer.startedAtMs = Date.now()
  transfer.sentBytes = startOffset
  transfer.expectedBytes = file.size
  transfer.checksumState = crc32Start()
  transfer.lastSpeedAtMs = Date.now()
  transfer.lastSpeedBytes = startOffset
  transfer.currentSpeedMbps = null
  transfer.isAdaptiveSwitching = false
  transfer.parallelChannels = 1
  transfer.chunkSize = CHUNK_SIZE
  transfer.uiLastUpdateAtMs = Date.now()
  upsertTransferList(transfer)

  try {
    channel.send(JSON.stringify({
      kind: 'file-meta',
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
      senderName: deviceName.value.trim(),
      isSpeedTest: transfer.isSpeedTest,
      resumeOffset: startOffset,
      checksumEnabled: startOffset === 0,
      protocolVersion: 1,
      chunkSize: CHUNK_SIZE,
      parallelChannels: 1,
      startChunkIndex: chunkCount,
      packetMode: false,
    }))

    let offset = startOffset
    while (offset < file.size) {
      if (channel.readyState !== 'open') {
        throw new Error('Data channel chưa sẵn sàng gửi.')
      }

      await waitForBufferedAmountLow(channel)

      const chunk = file.slice(offset, offset + CHUNK_SIZE)
      const buffer = await chunk.arrayBuffer()
      transfer.checksumState = crc32Update(transfer.checksumState, new Uint8Array(buffer))
      channel.send(buffer)

      offset += buffer.byteLength
      chunkCount += 1
      transfer.sentBytes = offset
      updateLiveSpeed(transfer, transfer.sentBytes)
      maybeUpdateTransferList(transfer)

      if ((chunkCount & 0x3f) === 0) {
        await delay(0)
      }
    }

    const checksum = startOffset === 0 ? crc32Finalize(transfer.checksumState) : null
    channel.send(JSON.stringify({
      kind: 'file-complete',
      checksum,
      totalBytes: transfer.sentBytes,
      totalChunks: chunkCount,
    }))
    transfer.completedAtMs = Date.now()
    transfer.speedMbps = calculateMBps(transfer.sentBytes, transfer.startedAtMs, transfer.completedAtMs)
    transfer.currentSpeedMbps = null
    transfer.status = 'done'
    upsertTransferList(transfer)
    if (transfer.isSpeedTest && transfer.speedMbps) {
      notify(`Test tốc độ gửi: ${transfer.speedMbps} MB/s.`, 'success')
    } else {
      notify(`Đã gửi xong ${file.name}.`, 'success')
    }
  } catch (error) {
    console.error(error)
    await handleSenderChannelFailure(transfer, 'Gửi file thất bại do lỗi data channel.')
  }
}

function handleIncomingData(transfer: TransferState, data: any): void {
  if (typeof data === 'string') {
    try {
      const msg = JSON.parse(data)
      if (msg.kind === 'file-meta') {
        const resumeOffset = Number(msg.resumeOffset || 0)
        const checksumEnabled = Boolean(msg.checksumEnabled)
        transfer.fileMeta = {
          fileName: msg.fileName,
          fileSize: msg.fileSize,
          mimeType: msg.mimeType,
          senderName: msg.senderName,
          isSpeedTest: Boolean(msg.isSpeedTest),
        }
        transfer.isSpeedTest = Boolean(msg.isSpeedTest)
        transfer.expectedBytes = msg.fileSize
        transfer.receivedBytes = resumeOffset
        transfer.chunkSize = Number(msg.chunkSize || CHUNK_SIZE)
        transfer.parallelChannels = Number(msg.parallelChannels || 1)
        transfer.packetMode = Boolean(msg.packetMode || Number(msg.protocolVersion) >= 2)
        transfer.nextReceiveChunkIndex = Number(msg.startChunkIndex || Math.floor(resumeOffset / transfer.chunkSize))
        transfer.pendingChunks = new Map<number, ArrayBuffer>()
        if (resumeOffset === 0) {
          transfer.buffers = []
        }
        transfer.checksumState = crc32Start()
        transfer.checksumStrict = checksumEnabled
        transfer.status = 'receiving'
        transfer.startedAtMs = Date.now()
        transfer.lastSpeedAtMs = Date.now()
        transfer.lastSpeedBytes = resumeOffset
        transfer.currentSpeedMbps = null
        clearTransferConnectTimeout(transfer)
        upsertTransferList(transfer)
        return
      }

      if (msg.kind === 'file-complete') {
        void finalizeReceivedFile(transfer, msg)
        return
      }
    } catch (error) {
      console.error(error)
    }

    return
  }

  if (data instanceof ArrayBuffer) {
    processIncomingPayload(transfer, data)
    return
  }

  if (data instanceof Blob) {
    data.arrayBuffer().then((buffer) => {
      processIncomingPayload(transfer, buffer)
    }).catch((error) => {
      console.error(error)
    })
  }
}

async function finalizeReceivedFile(transfer: TransferState, completionMeta?: { checksum?: number; totalBytes?: number }): Promise<void> {
  if (!transfer.fileMeta) {
    transfer.status = 'error'
    upsertTransferList(transfer)
    return
  }

  if (transfer.writer) {
    await transfer.writeQueue
    await transfer.writer.close()
    transfer.writer = null
  }

  const finalChecksum = crc32Finalize(transfer.checksumState)
  transfer.expectedChecksum = typeof completionMeta?.checksum === 'number' ? completionMeta.checksum : null
  if (transfer.checksumStrict && transfer.expectedChecksum !== null && transfer.expectedChecksum !== finalChecksum) {
    transfer.status = 'error'
    upsertTransferList(transfer)
    notify('Checksum không khớp. File có thể bị lỗi khi truyền.', 'error')
    return
  }

  transfer.completedAtMs = Date.now()
  transfer.speedMbps = calculateMBps(transfer.receivedBytes, transfer.startedAtMs, transfer.completedAtMs)
  transfer.currentSpeedMbps = null

  if (!transfer.isSpeedTest) {
    if (transfer.buffers.length > 0) {
      const blob = new Blob(transfer.buffers, { type: transfer.fileMeta.mimeType })
      const blobUrl = URL.createObjectURL(blob)

      const received: ReceivedFileItem = {
        transferId: transfer.transferId,
        senderName: transfer.fileMeta.senderName,
        fileName: transfer.fileMeta.fileName,
        fileSize: transfer.fileMeta.fileSize,
        mimeType: transfer.fileMeta.mimeType,
        blobUrl,
        savedToDisk: false,
        createdAt: new Date().toISOString(),
      }
      receivedFiles.value.unshift(received)

      if (autoAcceptAll.value) {
        setTimeout(() => {
          downloadReceived(received)
        }, 0)
      }
    } else {
      receivedFiles.value.unshift({
        transferId: transfer.transferId,
        senderName: transfer.fileMeta.senderName,
        fileName: transfer.fileMeta.fileName,
        fileSize: transfer.fileMeta.fileSize,
        mimeType: transfer.fileMeta.mimeType,
        blobUrl: null,
        savedToDisk: true,
        createdAt: new Date().toISOString(),
      })
    }
  }

  transfer.status = 'done'
  clearTransferConnectTimeout(transfer)
  upsertTransferList(transfer)
  if (transfer.isSpeedTest && transfer.speedMbps) {
    notify(`Test tốc độ nhận: ${transfer.speedMbps} MB/s.`, 'success')
  } else {
    notify(`Đã nhận xong ${transfer.fileMeta.fileName}.`, 'success')
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function downloadReceived(file: ReceivedFileItem): void {
  if (!file.blobUrl) {
    notify('File đã lưu trực tiếp vào máy nhận.', 'info')
    return
  }

  const anchor = document.createElement('a')
  anchor.href = file.blobUrl
  anchor.download = file.fileName
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
}

onMounted(async () => {
  await announceDevice()
  await loadDevices()
  await pullSignals()

  announceTimer = setInterval(() => {
    void announceDevice()
  }, 10000)

  deviceTimer = setInterval(() => {
    void loadDevices()
  }, 4000)

  signalTimer = setInterval(() => {
    void pullSignals()
  }, 1500)
})

onBeforeUnmount(() => {
  if (announceTimer) clearInterval(announceTimer)
  if (deviceTimer) clearInterval(deviceTimer)
  if (signalTimer) clearInterval(signalTimer)

  for (const transfer of transferMap.values()) {
    if (transfer.channel) {
      transfer.channel.close()
    }

    for (const ch of transfer.channels) {
      ch.close()
    }

    if (transfer.peer) {
      transfer.peer.close()
    }

    if (transfer.writer) {
      void transfer.writer.close()
    }

    clearTransferConnectTimeout(transfer)
  }

  for (const file of receivedFiles.value) {
    if (file.blobUrl) {
      URL.revokeObjectURL(file.blobUrl)
    }
  }
})
</script>

<template>
  <div class="all-drop-page">
    <LandingHeader />

    <main class="container py-8">
      <section class="hero mb-6">
        <h1 class="text-h4 font-weight-bold mb-2">AllDrop (P2P)</h1>
        <p class="text-body-1 text-medium-emphasis mb-0">
          Truyền file trực tiếp trong local network qua WebRTC, không relay dữ liệu file qua server.
        </p>
      </section>

      <v-card rounded="xl" class="mb-4">
        <v-card-title class="font-weight-bold">Thiết bị của bạn</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field
                v-model="deviceName"
                label="Tên thiết bị"
                variant="outlined"
                density="comfortable"
                @change="saveDeviceName"
              />
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-center ga-2">
              <v-btn color="primary" variant="tonal" @click="announceDevice" :loading="announcing">
                Online now
              </v-btn>
              <v-btn color="secondary" variant="text" @click="regenerateDeviceName">
                Tên mới
              </v-btn>
            </v-col>
          </v-row>
          <div class="text-caption text-medium-emphasis">Device ID: {{ deviceId }}</div>
          <div class="text-caption mt-1">Thiết bị online đang thấy: {{ deviceOptions.length }}</div>
          <v-alert v-if="lastError" type="warning" variant="tonal" density="comfortable" class="mt-3">
            {{ lastError }}
          </v-alert>
        </v-card-text>
      </v-card>

      <v-card rounded="xl" class="mb-4">
        <v-card-title class="font-weight-bold">Gửi file</v-card-title>
        <v-card-text>
          <v-file-input
            v-model="selectedFile"
            label="Chọn file"
            variant="outlined"
            show-size
            prepend-icon="mdi-paperclip"
          />

          <v-select
            v-model="selectedTarget"
            :items="deviceOptions"
            item-title="label"
            item-value="value"
            label="Thiết bị nhận"
            variant="outlined"
            class="mt-3"
            :loading="loadingDevices"
          />

          <v-alert v-if="deviceOptions.length === 0" type="info" variant="tonal" class="mt-3">
            Chưa thấy thiết bị nào khác trong local network.
          </v-alert>

          <div class="d-flex align-center ga-2 mt-3">
            <v-checkbox
              v-model="autoAcceptAll"
              color="primary"
              density="comfortable"
              hide-details
              label="Tự động đồng ý nhận tất cả và tự tải xuống"
              @update:model-value="saveAutoAcceptAll"
            />
          </div>

          <div class="d-flex align-center ga-2 mt-3">
            <v-btn
              variant="outlined"
              color="primary"
              size="small"
              :disabled="!selectedTarget || requesting"
              @click="startSpeedTest(5)"
            >
              Test tốc độ 5MB
            </v-btn>
            <v-btn
              variant="outlined"
              color="primary"
              size="small"
              :disabled="!selectedTarget || requesting"
              @click="startSpeedTest(20)"
            >
              Test tốc độ 20MB
            </v-btn>
          </div>

          <v-alert
            v-if="latestSpeedResult"
            type="success"
            variant="tonal"
            density="comfortable"
            class="mt-3"
          >
            Kết quả test gần nhất: {{ latestSpeedResult.speedMbps }} MB/s
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            size="large"
            :disabled="!selectedFile || !selectedTarget"
            :loading="requesting"
            @click="requestSendFile()"
          >
            <v-icon start>mdi-send</v-icon>
            Gửi yêu cầu truyền file
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card rounded="xl" class="mb-4">
        <v-card-title class="font-weight-bold">Tiến trình truyền file</v-card-title>
        <v-card-text>
          <v-list v-if="transferList.length > 0" lines="two">
            <v-list-item
              v-for="transfer in transferList"
              :key="transfer.transferId"
              :title="transferTitle(transfer)"
              :subtitle="transferSubtitle(transfer)"
            >
              <template #append>
                <div style="min-width: 170px;">
                  <v-progress-linear
                    :model-value="transferProgress(transfer)"
                    color="primary"
                    height="8"
                    rounded
                  />
                  <div class="text-caption text-right mt-1">{{ transferProgress(transfer) }}%</div>
                </div>
              </template>
            </v-list-item>
          </v-list>

          <v-alert v-else type="info" variant="tonal">
            Chưa có phiên truyền file nào.
          </v-alert>
        </v-card-text>
      </v-card>

      <v-card rounded="xl">
        <v-card-title class="font-weight-bold">File đã nhận</v-card-title>
        <v-card-text>
          <v-list v-if="receivedFiles.length > 0" lines="two">
            <v-list-item
              v-for="file in receivedFiles"
              :key="file.transferId"
              :title="file.fileName"
              :subtitle="`${file.senderName} • ${formatFileSize(file.fileSize)}${file.savedToDisk ? ' • đã lưu trực tiếp' : ''}`"
            >
              <template #append>
                <v-btn v-if="file.blobUrl" variant="tonal" color="primary" @click="downloadReceived(file)">
                  Tải xuống
                </v-btn>
                <v-chip v-else size="small" color="success" variant="tonal">Đã lưu</v-chip>
              </template>
            </v-list-item>
          </v-list>

          <v-alert v-else type="info" variant="tonal">
            Chưa có file nhận thành công.
          </v-alert>
        </v-card-text>
      </v-card>
    </main>

    <v-dialog v-model="offerDialog" max-width="520">
      <v-card rounded="xl" v-if="activeOffer">
        <v-card-title class="font-weight-bold">Xác nhận nhận file</v-card-title>
        <v-card-text>
          <v-alert v-if="activeOffer.isSpeedTest" type="info" variant="tonal" class="mb-3">
            Đây là yêu cầu test tốc độ mạng nội bộ.
          </v-alert>
          <p class="mb-2"><strong>Thiết bị gửi:</strong> {{ activeOffer.senderName }}</p>
          <p class="mb-2"><strong>Tên file:</strong> {{ activeOffer.fileName }}</p>
          <p class="mb-0"><strong>Dung lượng:</strong> {{ formatFileSize(activeOffer.fileSize) }}</p>
        </v-card-text>
        <v-card-actions class="px-6 pb-6">
          <v-spacer />
          <v-btn variant="text" @click="rejectIncomingOffer(activeOffer)">Từ chối</v-btn>
          <v-btn color="primary" @click="acceptIncomingOffer(activeOffer)">Đồng ý nhận</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" :timeout="3000" location="top">
      {{ snackbarText }}
    </v-snackbar>

    <LandingFooter />
  </div>
</template>

<style scoped>
.all-drop-page {
  min-height: 100vh;
  background: radial-gradient(circle at top left, rgba(203, 244, 191, 0.45), rgba(255, 255, 255, 1) 42%),
    radial-gradient(circle at bottom right, rgba(190, 227, 255, 0.4), rgba(255, 255, 255, 0.98) 56%);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
}

.hero {
  background: linear-gradient(135deg, rgba(8, 145, 178, 0.1), rgba(34, 197, 94, 0.12));
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 20px;
  padding: 24px;
}

@media (max-width: 768px) {
  .hero {
    padding: 18px;
  }
}
</style>
