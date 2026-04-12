<template>
  <v-container class="all-drop-page py-6">
    <v-card rounded="xl" class="mb-4">
      <v-card-title class="text-h6 font-weight-bold d-flex align-center">
        <v-icon class="mr-2" color="primary">mdi-access-point-network</v-icon>
        Local Send
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="deviceName"
          label="Tên thiết bị"
          variant="outlined"
          density="comfortable"
          hint="Tên này sẽ hiển thị cho các máy trong cùng mạng"
          persistent-hint
          @change="saveDeviceName"
        />
        <div class="text-caption text-medium-emphasis mt-1">
          Device ID: {{ deviceId }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" variant="tonal" @click="announceNow" :loading="announcing">
          Cập nhật trạng thái online
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card rounded="xl" class="mb-4">
      <v-card-title class="text-h6 font-weight-bold">Gửi file</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="selectedFile"
          label="Chọn file để gửi"
          variant="outlined"
          prepend-icon="mdi-paperclip"
          show-size
        />

        <v-select
          v-model="selectedReceiver"
          :items="deviceOptions"
          item-title="label"
          item-value="value"
          label="Chọn thiết bị nhận"
          variant="outlined"
          :disabled="deviceOptions.length === 0"
          class="mt-3"
        />

        <v-alert
          v-if="deviceOptions.length === 0"
          type="info"
          variant="tonal"
          density="comfortable"
          class="mt-3"
        >
          Chưa phát hiện thiết bị nào khác trong local network.
        </v-alert>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          size="large"
          :loading="sending"
          :disabled="!selectedFile || !selectedReceiver"
          @click="sendFile"
        >
          <v-icon start>mdi-send</v-icon>
          Gửi file
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-card rounded="xl">
      <v-card-title class="text-h6 font-weight-bold d-flex align-center justify-space-between">
        <span>Hộp thư file đến</span>
        <v-btn variant="text" size="small" @click="loadInbox" :loading="loadingInbox">Làm mới</v-btn>
      </v-card-title>
      <v-card-text>
        <v-list v-if="incomingTransfers.length > 0" lines="two">
          <v-list-item
            v-for="transfer in incomingTransfers"
            :key="transfer.transfer_id"
            :title="transfer.file_name"
            :subtitle="`${transfer.sender_name} • ${formatFileSize(transfer.file_size)}`"
          >
            <template #append>
              <v-btn
                color="primary"
                size="small"
                variant="tonal"
                @click="downloadTransfer(transfer)"
                :loading="downloadingId === transfer.transfer_id"
              >
                Tải
              </v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-alert v-else type="info" variant="tonal" density="comfortable">
          Chưa có file nào được gửi đến thiết bị này.
        </v-alert>
      </v-card-text>
    </v-card>

    <v-snackbar v-model="showSnackbar" :color="snackbarColor" :timeout="3000" location="top">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import api from '@/utils/api'

interface DeviceItem {
  device_id: string
  device_name: string
  ip: string
  last_seen_at: string
}

interface TransferItem {
  transfer_id: string
  sender_name: string
  sender_device_id: string
  file_name: string
  file_size: number
  mime_type: string
  status: string
  created_at: string
}

const DEVICE_ID_KEY = 'local_send_device_id'
const DEVICE_NAME_KEY = 'local_send_device_name'

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
const selectedReceiver = ref<string | null>(null)

const discoveredDevices = ref<DeviceItem[]>([])
const incomingTransfers = ref<TransferItem[]>([])

const announcing = ref(false)
const sending = ref(false)
const loadingInbox = ref(false)
const downloadingId = ref<string | null>(null)

const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref<'success' | 'error' | 'info'>('success')

let announceInterval: ReturnType<typeof setInterval> | null = null
let refreshInterval: ReturnType<typeof setInterval> | null = null

const deviceOptions = computed(() =>
  discoveredDevices.value.map((device) => ({
    label: `${device.device_name} (${device.ip})`,
    value: device.device_id,
  }))
)

function getOrCreateDeviceId(): string {
  const existed = localStorage.getItem(DEVICE_ID_KEY)
  if (existed) {
    return existed
  }

  const created = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

  localStorage.setItem(DEVICE_ID_KEY, created)
  return created
}

function getOrCreateDeviceName(): string {
  const existed = localStorage.getItem(DEVICE_NAME_KEY)
  if (existed) {
    return existed
  }

  const animal = ANIMAL_NAMES[Math.floor(Math.random() * ANIMAL_NAMES.length)]
  const created = `${animal}-${Math.floor(Math.random() * 900 + 100)}`
  localStorage.setItem(DEVICE_NAME_KEY, created)
  return created
}

function saveDeviceName(): void {
  localStorage.setItem(DEVICE_NAME_KEY, deviceName.value)
  void announceNow()
}

function notify(text: string, color: 'success' | 'error' | 'info' = 'info'): void {
  snackbarText.value = text
  snackbarColor.value = color
  showSnackbar.value = true
}

function formatFileSize(size: number): string {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

async function announceNow(): Promise<void> {
  if (!deviceName.value.trim()) {
    notify('Vui lòng nhập tên thiết bị.', 'error')
    return
  }

  announcing.value = true
  try {
    await api.post('/all-drop/devices/announce', {
      device_id: deviceId.value,
      device_name: deviceName.value.trim(),
    })
  } catch (error) {
    console.error(error)
    notify('Không thể announce thiết bị.', 'error')
  } finally {
    announcing.value = false
  }
}

async function loadDevices(): Promise<void> {
  try {
    const response = await api.get('/all-drop/devices', {
      params: {
        exclude_device_id: deviceId.value,
      },
    })

    discoveredDevices.value = response.data.devices ?? []

    if (
      selectedReceiver.value &&
      !discoveredDevices.value.some((d) => d.device_id === selectedReceiver.value)
    ) {
      selectedReceiver.value = null
    }
  } catch (error) {
    console.error(error)
  }
}

async function sendFile(): Promise<void> {
  if (!selectedFile.value || !selectedReceiver.value) {
    notify('Vui lòng chọn file và thiết bị nhận.', 'error')
    return
  }

  sending.value = true
  try {
    const payload = new FormData()
    payload.append('sender_device_id', deviceId.value)
    payload.append('sender_name', deviceName.value.trim())
    payload.append('receiver_device_id', selectedReceiver.value)
    payload.append('file', selectedFile.value)

    await api.post('/all-drop/transfers/send', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    notify('Gửi file thành công.', 'success')
    selectedFile.value = null
    await loadInbox()
  } catch (error) {
    console.error(error)
    notify('Gửi file thất bại.', 'error')
  } finally {
    sending.value = false
  }
}

async function loadInbox(): Promise<void> {
  loadingInbox.value = true
  try {
    const response = await api.get(`/all-drop/transfers/inbox/${encodeURIComponent(deviceId.value)}`)
    incomingTransfers.value = response.data.transfers ?? []
  } catch (error) {
    console.error(error)
    notify('Không tải được danh sách file nhận.', 'error')
  } finally {
    loadingInbox.value = false
  }
}

async function downloadTransfer(transfer: TransferItem): Promise<void> {
  downloadingId.value = transfer.transfer_id
  try {
    const response = await api.get(`/all-drop/transfers/${transfer.transfer_id}/download`, {
      params: {
        device_id: deviceId.value,
      },
      responseType: 'blob',
    })

    const blobUrl = URL.createObjectURL(response.data)
    const anchor = document.createElement('a')
    anchor.href = blobUrl
    anchor.download = transfer.file_name
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(blobUrl)

    notify('Đang tải file...', 'success')
    await loadInbox()
  } catch (error) {
    console.error(error)
    notify('Tải file thất bại.', 'error')
  } finally {
    downloadingId.value = null
  }
}

onMounted(async () => {
  await announceNow()
  await Promise.all([loadDevices(), loadInbox()])

  announceInterval = setInterval(() => {
    void announceNow()
  }, 15000)

  refreshInterval = setInterval(() => {
    void loadDevices()
    void loadInbox()
  }, 5000)
})

onBeforeUnmount(() => {
  if (announceInterval) {
    clearInterval(announceInterval)
  }

  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<style scoped>
.all-drop-page {
  max-width: 920px;
}
</style>
