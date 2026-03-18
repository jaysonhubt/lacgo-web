<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import LandingHeader from '@/components/LandingHeader.vue'
import LandingFooter from '@/components/LandingFooter.vue'

const siteUrl = 'https://lacgo.vn'

type LunarDate = {
  day: number
  month: number
  year: number
  leap: number
}

type CalendarCell = {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  lunar: LunarDate
  lunarLabel: string
  isLunarFirst: boolean
  isLunarFullMoon: boolean
  holidays: string[]
}

type DayDetail = {
  solarText: string
  lunarText: string
  weekdayText: string
  canChiDay: string
  canChiMonth: string
  canChiYear: string
  auspiciousHours: string[]
  khongMinhDay: string
  khongMinhAdvice: string
}

const WEEKDAYS = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN']
const HEAVENLY_STEMS = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý']
const EARTHLY_BRANCHES = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi']
const HOUR_BRANCHES = [
  'Tý (23:00-01:00)',
  'Sửu (01:00-03:00)',
  'Dần (03:00-05:00)',
  'Mão (05:00-07:00)',
  'Thìn (07:00-09:00)',
  'Tỵ (09:00-11:00)',
  'Ngọ (11:00-13:00)',
  'Mùi (13:00-15:00)',
  'Thân (15:00-17:00)',
  'Dậu (17:00-19:00)',
  'Tuất (19:00-21:00)',
  'Hợi (21:00-23:00)',
]
const GOOD_HOUR_PATTERN = ['110100101100', '001101001011', '110011010010', '101100110100', '001011001101', '010010110011']

const today = new Date()
const viewMonth = ref(today.getMonth())
const viewYear = ref(today.getFullYear())
const detailDialog = ref(false)
const selectedCell = ref<CalendarCell | null>(null)

const SOLAR_HOLIDAYS: Record<string, string> = {
  '1-1': 'Tết Dương lịch',
  '30-4': 'Ngày Giải phóng miền Nam',
  '1-5': 'Quốc tế Lao động',
  '2-9': 'Quốc khánh',
}

const LUNAR_HOLIDAYS: Record<string, string> = {
  '10-3': 'Giỗ Tổ Hùng Vương',
}

const monthTitle = computed(() => {
  const d = new Date(viewYear.value, viewMonth.value, 1)
  return d.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
})

const monthCells = computed<CalendarCell[]>(() => {
  const firstDay = new Date(viewYear.value, viewMonth.value, 1)
  const lastDay = new Date(viewYear.value, viewMonth.value + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startOffset = (firstDay.getDay() + 6) % 7

  const cells: CalendarCell[] = []

  const prevMonthLast = new Date(viewYear.value, viewMonth.value, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i -= 1) {
    const day = prevMonthLast - i
    const date = new Date(viewYear.value, viewMonth.value - 1, day)
    cells.push(buildCell(date, false))
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(viewYear.value, viewMonth.value, day)
    cells.push(buildCell(date, true))
  }

  const weeks = Math.ceil(cells.length / 7)
  const totalCells = weeks * 7
  for (let day = 1; cells.length < totalCells; day += 1) {
    const date = new Date(viewYear.value, viewMonth.value + 1, day)
    cells.push(buildCell(date, false))
  }

  return cells
})

const selectedDetail = computed<DayDetail | null>(() => {
  if (!selectedCell.value) {
    return null
  }

  return buildDayDetail(selectedCell.value)
})

const todayCell = computed<CalendarCell>(() => buildCell(today, true))
const todayDetail = computed<DayDetail>(() => buildDayDetail(todayCell.value))
const todayHolidayText = computed(() => getHolidayText(todayCell.value))

function buildCell(date: Date, isCurrentMonth: boolean): CalendarCell {
  const solarDay = date.getDate()
  const solarMonth = date.getMonth() + 1
  const solarYear = date.getFullYear()
  const lunar = getLunarDate(solarDay, solarMonth, solarYear, 7)
  const isToday =
    solarDay === today.getDate()
    && date.getMonth() === today.getMonth()
    && solarYear === today.getFullYear()
  const solarHoliday = SOLAR_HOLIDAYS[`${solarDay}-${solarMonth}`]
  const lunarHoliday = getLunarHolidayLabel(date, lunar)

  return {
    date,
    isCurrentMonth,
    isToday,
    lunar,
    lunarLabel: `${lunar.day}/${lunar.month}`,
    isLunarFirst: lunar.day === 1,
    isLunarFullMoon: lunar.day === 15,
    holidays: [solarHoliday, lunarHoliday].filter((v): v is string => Boolean(v)),
  }
}

function openDayDetail(cell: CalendarCell) {
  selectedCell.value = cell
  detailDialog.value = true
}

function shiftDayDetail(step: number) {
  if (!selectedCell.value) {
    return
  }

  const nextDate = new Date(selectedCell.value.date)
  nextDate.setDate(nextDate.getDate() + step)

  viewMonth.value = nextDate.getMonth()
  viewYear.value = nextDate.getFullYear()

  selectedCell.value = buildCell(nextDate, true)
}

function buildDayDetail(cell: CalendarCell): DayDetail {
  const date = cell.date
  const lunar = cell.lunar
  const canChiDay = getCanChiDay(date)
  const canChiMonth = getCanChiMonth(lunar)
  const canChiYear = getCanChiYear(lunar.year)
  const khongMinh = getKhongMinhXuatHanh(lunar)

  return {
    solarText: formatSolarDate(date),
    lunarText: `${lunar.day}/${lunar.month}/${lunar.year}${lunar.leap ? ' (tháng nhuận)' : ''}`,
    weekdayText: date.toLocaleDateString('vi-VN', { weekday: 'long' }),
    canChiDay,
    canChiMonth,
    canChiYear,
    auspiciousHours: getAuspiciousHours(date),
    khongMinhDay: khongMinh.name,
    khongMinhAdvice: khongMinh.advice,
  }
}

function getKhongMinhXuatHanh(lunar: LunarDate) {
  const cycle6_14710 = [
    { name: 'Đường Phong', advice: 'Rất tốt, xuất hành thuận lợi, cầu tài được như ý muốn, gặp quý nhân phù trợ.' },
    { name: 'Kim Thổ', advice: 'Ra đi nhỡ tàu, nhỡ xe, cầu tài không được, trên đường đi mất của, bất lợi.' },
    { name: 'Kim Dương', advice: 'Xuất hành tốt, có quý nhân phù trợ, tài lộc thông suốt, kiện có nhiều lý phải.' },
    { name: 'Thuần Dương', advice: 'Xuất hành tốt, lúc về cũng tốt, nhiều thuận lợi, được người tốt giúp đỡ, cầu tài được như ý muốn, tranh luận thường thắng lợi.' },
    { name: 'Đạo Tặc', advice: 'Rất xấu. Xuất hành bị hại, mất của.' },
    { name: 'Hảo Thương', advice: 'Xuất hành thuận lợi, gặp người lớn vừa lòng, làm việc việc như ý muốn, áo phẩm vinh quy.' },
  ]

  const cycle8_25811 = [
    { name: 'Thiên Đạo', advice: 'Xuất hành cầu tài nên tránh, dù được cũng rất tốn kém, thất lý mà thua.' },
    { name: 'Thiên Môn', advice: 'Xuất hành làm mọi việc đều vừa ý, cầu được ước thấy mọi việc đều thành đạt.' },
    { name: 'Thiên Đường', advice: 'Xuất hành tốt, quý nhân phù trợ, buôn bán may mắn, mọi việc đều như ý.' },
    { name: 'Thiên Tài', advice: 'Nên xuất hành, cầu tài thắng lợi. Được người tốt giúp đỡ. Mọi việc đều thuận.' },
    { name: 'Thiên Tặc', advice: 'Xuất hành xấu, cầu tài không được. Đi đường dễ mất cắp. Mọi việc đều rất xấu.' },
    { name: 'Thiên Dương', advice: 'Xuất hành tốt, cầu tài được tài. Hỏi vợ được vợ. Mọi việc đều như ý muốn.' },
    { name: 'Thiên Hầu', advice: 'Xuất hành dầu ít hay nhiều cũng cãi cọ, phải tránh xẩy ra tai nạn chảy máu, máu sẽ khó cầm.' },
    { name: 'Thiên Thương', advice: 'Xuất hành để gặp cấp trên thì tuyệt vời, cầu tài thì được tài. Mọi việc đều thuận lợi.' },
  ]

  const cycle8_36912 = [
    { name: 'Chu Tước', advice: 'Xuất hành, cầu tài đều xấu. Hay mất của, kiện cáo thua vì đuối lý.' },
    { name: 'Bạch Hổ Đầu', advice: 'Xuất hành, cầu tài đều được. Đi đâu đều thông đạt cả.' },
    { name: 'Bạch Hổ Kiếp', advice: 'Xuất hành, cầu tài được như ý muốn, đi hướng Nam và Bắc rất thuận lợi.' },
    { name: 'Bạch Hổ Túc', advice: 'Cấm đi xa, làm việc gì cũng không thành công. Rất xấu trong mọi việc.' },
    { name: 'Huyền Vũ', advice: 'Xuất hành thường gặp cãi cọ, gặp việc xấu, không nên đi.' },
    { name: 'Thanh Long Đầu', advice: 'Xuất hành nên đi vào sáng sớm. Cầu tài thắng lợi. Mọi việc như ý.' },
    { name: 'Thanh Long Kiếp', advice: 'Xuất hành 4 phương, 8 hướng đều tốt, trăm sự được như ý.' },
    { name: 'Thanh Long Túc', advice: 'Đi xa không nên, xuất hành xấu, tài lộc không có. Kiện cáo cũng đuối lý.' },
  ]

  const day = lunar.day

  if ([1, 4, 7, 10].includes(lunar.month)) {
    return cycle6_14710[(day - 1) % 6]
  }

  if ([2, 5, 8, 11].includes(lunar.month)) {
    return cycle8_25811[(day - 1) % 8]
  }

  return cycle8_36912[(day - 1) % 8]
}

function formatSolarDate(date: Date) {
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getCanChiDay(date: Date) {
  const jd = jdFromDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
  const can = HEAVENLY_STEMS[(jd + 9) % 10]
  const chi = EARTHLY_BRANCHES[(jd + 1) % 12]
  return `${can} ${chi}`
}

function getCanChiMonth(lunar: LunarDate) {
  const can = HEAVENLY_STEMS[(lunar.year * 12 + lunar.month + 3) % 10]
  const chi = EARTHLY_BRANCHES[(lunar.month + 1) % 12]
  return `${can} ${chi}`
}

function getCanChiYear(lunarYear: number) {
  const can = HEAVENLY_STEMS[(lunarYear + 6) % 10]
  const chi = EARTHLY_BRANCHES[(lunarYear + 8) % 12]
  return `${can} ${chi}`
}

function getAuspiciousHours(date: Date) {
  const jd = jdFromDate(date.getDate(), date.getMonth() + 1, date.getFullYear())
  const dayChiIndex = (jd + 1) % 12
  const pattern = GOOD_HOUR_PATTERN[dayChiIndex % 6]
  const result: string[] = []

  for (let i = 0; i < pattern.length; i += 1) {
    if (pattern[i] === '1') {
      result.push(HOUR_BRANCHES[i])
    }
  }

  return result
}

function getLunarHolidayLabel(date: Date, lunar: LunarDate) {
  if (isTetHoliday(date, lunar)) {
    return 'Tết Nguyên Đán'
  }

  return LUNAR_HOLIDAYS[`${lunar.day}-${lunar.month}`]
}

function isTetHoliday(date: Date, lunar: LunarDate) {
  if (lunar.month === 1 && lunar.day >= 1 && lunar.day <= 5) {
    return true
  }

  if (lunar.month !== 12) {
    return false
  }

  const nextDate = new Date(date)
  nextDate.setDate(date.getDate() + 1)

  const nextLunar = getLunarDate(
    nextDate.getDate(),
    nextDate.getMonth() + 1,
    nextDate.getFullYear(),
    7,
  )

  return nextLunar.month === 1 && nextLunar.day === 1
}

function goPrevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value -= 1
    return
  }
  viewMonth.value -= 1
}

function goNextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value += 1
    return
  }
  viewMonth.value += 1
}

function goToday() {
  viewMonth.value = today.getMonth()
  viewYear.value = today.getFullYear()
}

function getHolidayText(cell: CalendarCell) {
  return cell.holidays.join(' • ')
}

function INT(d: number) {
  return Math.floor(d)
}

function jdFromDate(dd: number, mm: number, yy: number) {
  const a = INT((14 - mm) / 12)
  const y = yy + 4800 - a
  const m = mm + 12 * a - 3
  let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045
  if (jd < 2299161) {
    jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083
  }
  return jd
}

function getNewMoonDay(k: number, timeZone: number) {
  const T = k / 1236.85
  const T2 = T * T
  const T3 = T2 * T
  const dr = Math.PI / 180
  let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3
  jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr)
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M)
  C1 -= 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr)
  C1 -= 0.0004 * Math.sin(dr * 3 * Mpr)
  C1 += 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr))
  C1 -= 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M))
  C1 -= 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr))
  C1 += 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M))
  const deltat = T < -11
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2
  const jdNew = jd1 + C1 - deltat
  return INT(jdNew + 0.5 + timeZone / 24)
}

function getSunLongitude(jdn: number, timeZone: number) {
  const T = (jdn - 2451545.5 - timeZone / 24) / 36525
  const T2 = T * T
  const dr = Math.PI / 180
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M)
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M)
  let L = L0 + DL
  L *= dr
  L -= Math.PI * 2 * INT(L / (Math.PI * 2))
  return INT((L / Math.PI) * 6)
}

function getLunarMonth11(yy: number, timeZone: number) {
  const off = jdFromDate(31, 12, yy) - 2415021
  const k = INT(off / 29.530588853)
  let nm = getNewMoonDay(k, timeZone)
  const sunLong = getSunLongitude(nm, timeZone)
  if (sunLong >= 9) {
    nm = getNewMoonDay(k - 1, timeZone)
  }
  return nm
}

function getLeapMonthOffset(a11: number, timeZone: number) {
  const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853)
  let last = 0
  let i = 1
  let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone)
  do {
    last = arc
    i += 1
    arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone)
  } while (arc !== last && i < 14)
  return i - 1
}

function getLunarDate(dd: number, mm: number, yy: number, timeZone: number): LunarDate {
  const dayNumber = jdFromDate(dd, mm, yy)
  const k = INT((dayNumber - 2415021.076998695) / 29.530588853)
  let monthStart = getNewMoonDay(k + 1, timeZone)
  if (monthStart > dayNumber) {
    monthStart = getNewMoonDay(k, timeZone)
  }
  let a11 = getLunarMonth11(yy, timeZone)
  let b11 = a11
  let lunarYear: number
  if (a11 >= monthStart) {
    lunarYear = yy
    a11 = getLunarMonth11(yy - 1, timeZone)
  }
  else {
    lunarYear = yy + 1
    b11 = getLunarMonth11(yy + 1, timeZone)
  }
  const lunarDay = dayNumber - monthStart + 1
  const diff = INT((monthStart - a11) / 29)
  let lunarLeap = 0
  let lunarMonth = diff + 11
  if (b11 - a11 > 365) {
    const leapMonthDiff = getLeapMonthOffset(a11, timeZone)
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10
      if (diff === leapMonthDiff) {
        lunarLeap = 1
      }
    }
  }
  if (lunarMonth > 12) {
    lunarMonth -= 12
  }
  if (lunarMonth >= 11 && diff < 4) {
    lunarYear -= 1
  }
  return {
    day: lunarDay,
    month: lunarMonth,
    year: lunarYear,
    leap: lunarLeap,
  }
}

useHead({
  title: 'LạcGO - Âm Lịch',
  meta: [
    { name: 'description', content: 'Tra cứu lịch dương âm theo tháng, hiển thị ngày hiện tại, ngày mùng 1 và rằm âm lịch, cùng các ngày lễ quan trọng của Việt Nam.' },
    { name: 'keywords', content: 'âm lịch, lịch dương âm, lịch Việt Nam, ngày lễ Việt Nam, tết âm lịch, giỗ tổ hùng vương' },
    { name: 'robots', content: 'index, follow' },

    // Open Graph
    { property: 'og:title', content: 'Âm Lịch LạcGO - Lịch Dương + Âm Và Ngày Lễ Việt Nam' },
    { property: 'og:description', content: 'Xem lịch dương âm theo tháng, đánh dấu mùng 1, rằm và các ngày lễ âm - dương quan trọng của Việt Nam.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/am-lich` },
    { property: 'og:image', content: `${siteUrl}/dashboard_bg1_small.png` },
    { property: 'og:locale', content: 'vi_VN' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Âm Lịch LạcGO' },
    { name: 'twitter:description', content: 'Lịch dương âm theo tháng, đánh dấu ngày lễ Việt Nam và các mốc âm lịch quan trọng.' },
  ],
  link: [
    { rel: 'canonical', href: `${siteUrl}/am-lich` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Âm lịch LạcGO',
        description: 'Trang tra cứu lịch dương âm và các ngày lễ Việt Nam',
        mainEntity: {
          '@type': 'Dataset',
          name: 'Lịch dương âm và ngày lễ Việt Nam',
          inLanguage: 'vi-VN'
        }
      })
    }
  ]
})
</script>

<template>
  <section class="calendar-page">
    <LandingHeader />

    <div class="page-hero">
      <div class="hero-container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">Trang chủ</router-link>
          <v-icon size="16" aria-hidden="true">mdi-chevron-right</v-icon>
          <span aria-current="page">Âm lịch</span>
        </nav>
        <h1 class="page-title">Lịch Âm</h1>
        <p class="page-subtitle">Lịch âm và các ngày lễ Việt Nam</p>
      </div>
    </div>

    <div class="page-content">
      <div class="calendar-container">
        <section class="today-panel" aria-label="Thông tin ngày hiện tại">
          <div class="today-panel-head">
            <div>
              <h3 class="today-panel-title">Hôm nay</h3>
              <p class="today-panel-subtitle">
                {{ todayDetail.weekdayText }} {{ todayDetail.solarText }}
              </p>
            </div>
            <p v-if="todayCell.holidays.length" class="today-holiday">
              Ngày lễ: <strong>{{ todayHolidayText }}</strong>
            </p>
          </div>

          <div class="today-panel-body">
            <div class="today-main">
              <div class="date-hero-row">
                <div class="date-hero-box solar">
                  <span class="date-hero-label">Dương lịch</span>
                  <p class="date-hero-number">{{ todayCell.date.getDate() }}</p>
                  <p class="date-hero-meta">Tháng {{ todayCell.date.getMonth() + 1 }}/{{ todayCell.date.getFullYear() }}</p>
                </div>
                <div class="date-hero-box lunar">
                  <span class="date-hero-label">Âm lịch</span>
                  <p class="date-hero-number">{{ todayCell.lunar.day }}</p>
                  <p class="date-hero-meta">
                    Tháng {{ todayCell.lunar.month }}/{{ todayCell.lunar.year }}
                    <span v-if="todayCell.lunar.leap">(nhuận)</span>
                  </p>
                </div>
              </div>

              <p class="detail-canchi-line today-canchi-line">
                Ngày <strong>{{ todayDetail.canChiDay }}</strong>
                tháng <strong>{{ todayDetail.canChiMonth }}</strong>
                năm <strong>{{ todayDetail.canChiYear }}</strong>
              </p>
            </div>

            <div class="today-extra">
              <div class="detail-section">
                <h4>Giờ hoàng đạo</h4>
                <div class="hour-tags">
                  <span v-for="h in todayDetail.auspiciousHours" :key="`today-${h}`" class="hour-tag">{{ h }}</span>
                </div>
              </div>
              <div class="detail-section">
                <p class="khong-minh-name"><strong>{{ todayDetail.khongMinhDay }}</strong></p>
                <p class="khong-minh-advice">{{ todayDetail.khongMinhAdvice }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="calendar-panel" aria-label="Lịch dương âm theo tháng">
          <div class="calendar-toolbar">
            <h2 class="month-title">{{ monthTitle }}</h2>
            <div class="toolbar-actions">
              <button class="toolbar-btn" type="button" @click="goPrevMonth">
                <v-icon size="18">mdi-chevron-left</v-icon>
                Tháng trước
              </button>
              <button class="toolbar-btn light" type="button" @click="goToday">
                Hôm nay
              </button>
              <button class="toolbar-btn" type="button" @click="goNextMonth">
                Tháng sau
                <v-icon size="18">mdi-chevron-right</v-icon>
              </button>
            </div>
          </div>

          <div class="calendar-scroll" aria-label="Kéo ngang để xem đầy đủ lịch trên màn hình nhỏ">
            <div class="weekday-row" role="row">
              <div v-for="weekday in WEEKDAYS" :key="weekday" class="weekday-cell" role="columnheader">
                {{ weekday }}
              </div>
            </div>

            <div class="calendar-grid" role="grid">
              <article
                v-for="cell in monthCells"
                :key="cell.date.toISOString()"
                class="day-cell"
                tabindex="0"
                :class="{
                  'is-outside': !cell.isCurrentMonth,
                  'is-today': cell.isToday,
                  'is-holiday': cell.holidays.length > 0,
                  'is-lunar-first': cell.isLunarFirst,
                  'is-lunar-fullmoon': cell.isLunarFullMoon,
                }"
                role="gridcell"
                @click="openDayDetail(cell)"
                @keydown.enter="openDayDetail(cell)"
              >
                <div class="day-top">
                  <span class="solar-day">{{ cell.date.getDate() }}</span>
                </div>

                <span class="lunar-day">{{ cell.lunarLabel }}</span>

                <p v-if="cell.holidays.length" class="holiday-text" :title="getHolidayText(cell)">
                  {{ getHolidayText(cell) }}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section class="legend-panel" aria-label="Chú thích">
          <h3>Chú thích</h3>
          <ul>
            <li><span class="dot today"></span>Ngày hiện tại</li>
            <li><span class="dot first"></span>Mùng 1 âm lịch</li>
            <li><span class="dot full"></span>Rằm âm lịch (15)</li>
            <li><span class="dot holiday"></span>Ngày lễ Việt Nam (âm + dương)</li>
          </ul>

          <h3 class="mt-24">Ngày lễ đang đánh dấu</h3>
          <ul class="holiday-list">
            <li>Dương lịch: 01/01, 30/04, 01/05, 02/09</li>
            <li>Âm lịch: Tết Nguyên Đán (29 hoặc 30 tháng Chạp đến mùng 5), Giỗ Tổ Hùng Vương (10/3)</li>
          </ul>
        </section>
      </div>
    </div>

    <v-dialog v-model="detailDialog" max-width="640">
      <v-card v-if="selectedDetail" class="day-detail-card">
        <v-card-title class="day-detail-title">
          {{ selectedDetail.weekdayText }}  {{ selectedDetail.solarText }}
        </v-card-title>
        <v-card-text class="day-detail-content">
          <div class="detail-grid">
            <p>Âm lịch: <strong>{{ selectedDetail.lunarText }}</strong></p>
            <p class="detail-canchi-line">
              Ngày <strong>{{ selectedDetail.canChiDay }}</strong>
              tháng <strong>{{ selectedDetail.canChiMonth }}</strong>
              năm <strong>{{ selectedDetail.canChiYear }}</strong>
            </p>
          </div>

          <div class="detail-sections-row">
            <div class="detail-section">
              <h4>Giờ hoàng đạo</h4>
              <div class="hour-tags">
                <span v-for="h in selectedDetail.auspiciousHours" :key="h" class="hour-tag">{{ h }}</span>
              </div>
            </div>
            <div class="detail-section">
              <p class="khong-minh-name">Ngày <strong>{{ selectedDetail.khongMinhDay }}</strong></p>
              <p class="khong-minh-advice">{{ selectedDetail.khongMinhAdvice }}</p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" prepend-icon="mdi-chevron-left" @click="shiftDayDetail(-1)">
            Ngày trước
          </v-btn>
          <v-btn variant="text" append-icon="mdi-chevron-right" @click="shiftDayDetail(1)">
            Ngày sau
          </v-btn>
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="detailDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <LandingFooter />
  </section>
</template>

<style scoped>
.calendar-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f6f8fb;
  color: #1a1a1a;
}

.page-hero {
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  padding: 3rem 0 2.5rem;
}

.hero-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #757575;
}

.breadcrumb a {
  color: #66BB6A;
  text-decoration: none;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.05rem;
  color: #616161;
}

.page-content {
  padding: 2rem 0 4rem;
}

.calendar-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.5rem;
}

.calendar-panel,
.legend-panel,
.today-panel {
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e9edf3;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
}

.today-panel {
  grid-column: 1 / -1;
  padding: 1.15rem;
  background: #fff;
  border-top: 4px solid #66bb6a;
}

.today-panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 0.9rem;
}

.today-panel-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 800;
  color: #1f2937;
}

.today-panel-subtitle {
  margin: 0.3rem 0 0;
  color: #4b5563;
  font-weight: 600;
  font-size: 0.92rem;
}

.today-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 1rem;
}

.today-main {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.today-main .date-hero-row {
  margin-bottom: 0;
}

.today-extra {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.today-canchi-line {
  background: #f8fafc;
  border: 1px solid #e5ebf2;
  border-radius: 12px;
  padding: 0.75rem 0.85rem;
  font-size: 0.92rem;
}

.date-hero-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
}

.date-hero-box {
  background: #f8fafc;
  border: 1px solid #e7edf4;
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
}

.date-hero-box.solar {
  border-left: 5px solid #2e7d32;
}

.date-hero-box.lunar {
  border-left: 5px solid #f59e0b;
}

.date-hero-label {
  display: inline-block;
  font-size: 0.76rem;
  font-weight: 700;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.date-hero-number {
  margin: 0.2rem 0;
  font-size: 2.6rem;
  line-height: 1;
  font-weight: 800;
  color: #0f172a;
}

.date-hero-meta {
  margin: 0;
  font-size: 0.84rem;
  color: #4b5563;
  font-weight: 600;
}

.today-holiday {
  margin: 0;
  padding: 0.5rem 0.62rem;
  background: #fff3e0;
  border-radius: 999px;
  color: #8a3d06;
  font-size: 0.82rem;
  line-height: 1.35;
  border: 1px solid #ffe0b2;
}

.today-extra .detail-section {
  border: 1px solid #e7edf4;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.03);
}

.today-extra .detail-section h4 {
  color: #1f2937;
  font-weight: 700;
}

.calendar-panel {
  padding: 1rem;
}

.calendar-scroll {
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.2rem;
}

.calendar-toolbar {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.month-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: capitalize;
  text-align: left;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
}

.toolbar-btn {
  border: none;
  background: #2e7d32;
  color: #fff;
  border-radius: 10px;
  padding: 0.55rem 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  font-weight: 600;
  white-space: nowrap;
}

.toolbar-btn.light {
  background: #eef5ef;
  color: #1b5e20;
}

.weekday-row {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  border: 1px solid #edf1f6;
  border-radius: 12px;
  overflow: hidden;
}

.weekday-cell {
  padding: 0.75rem 0.25rem;
  text-align: center;
  font-weight: 700;
  font-size: 0.9rem;
  background: #f8fafc;
  color: #4b5563;
  border-right: 1px solid #edf1f6;
}

.weekday-cell:last-child {
  border-right: none;
}

.calendar-grid {
  margin-top: 0.8rem;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.6rem;
}

.day-cell {
  min-height: 112px;
  padding: 0.55rem;
  position: relative;
  border-radius: 12px;
  border: 1px solid #edf1f6;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.day-cell:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
}

.day-cell:focus-visible {
  outline: 2px solid #66bb6a;
  outline-offset: 1px;
}

.day-top {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.solar-day {
  font-size: 1.32rem;
  font-weight: 700;
}

.lunar-day {
  margin-top: 0.15rem;
  align-self: flex-end;
  font-size: 0.88rem;
  color: #6b7280;
  font-weight: 600;
}

.day-cell.is-lunar-first .lunar-day,
.day-cell.is-lunar-fullmoon .lunar-day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  padding: 0.1rem 0.3rem;
  border-radius: 999px;
}

.day-cell.is-lunar-first .lunar-day {
  background: #e8f5e9;
  color: #2e7d32;
}

.day-cell.is-lunar-fullmoon .lunar-day {
  background: #fff8e1;
  color: #f57f17;
}

.holiday-text {
  margin: 0;
  width: 100%;
  text-align: center;
  font-size: 0.72rem;
  line-height: 1.35;
  color: #c62828;
  font-weight: 600;
  background: #ffebee;
  border-radius: 8px;
  padding: 0.16rem 0.28rem;
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
  word-break: break-word;
}

.day-cell.is-outside {
  background: #d4d8db;
  opacity: 0.7;
}

.day-cell.is-today {
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.2) inset;
}

.day-cell.is-holiday {
  background: #fffafa;
}

.legend-panel {
  padding: 1.1rem 1rem;
  height: fit-content;
}

.legend-panel h3 {
  margin: 0 0 0.7rem;
  font-size: 1rem;
}

.legend-panel ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.legend-panel li {
  font-size: 0.9rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot.today {
  background: #2e7d32;
}

.dot.first {
  background: #43a047;
}

.dot.full {
  background: #f59e0b;
}

.dot.holiday {
  background: #d32f2f;
}

.mt-24 {
  margin-top: 1.5rem !important;
}

.holiday-list li {
  align-items: flex-start;
  line-height: 1.45;
}

.day-detail-title {
  font-weight: 700;
}

.day-detail-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.45rem 1rem;
}

.detail-grid p {
  margin: 0;
}

.detail-sections-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.detail-section {
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.75rem;
}

.detail-section h4 {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
}

.detail-section p {
  margin: 0;
}

.hour-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.hour-tag {
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 6px;
  padding: 0.18rem 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
}

.khong-minh-name {
  font-size: 1rem;
  margin-bottom: 0.25rem !important;
}

.khong-minh-advice {
  font-size: 0.85rem;
  color: #4b5563;
  line-height: 1.5;
}

@media (max-width: 968px) {
  .calendar-container {
    grid-template-columns: 1fr;
  }

  .today-panel-body {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 2.25rem;
  }

  .calendar-toolbar {
    padding: 0.25rem;
  }

  .month-title {
    margin-bottom: 0;
  }

  .toolbar-btn {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .day-cell {
    min-height: 100px;
  }

}

@media (max-width: 640px) {
  .page-hero {
    padding: 1rem 0.5rem 1rem;
  }
  .hero-container {
    gap: 0.5rem;
  }
  .breadcrumb {
    margin-bottom: 0.5rem;
  }
  .hero-container,
  .calendar-container {
    padding: 0 0.3rem;
  }

  .today-panel {
    padding: 0.85rem;
  }

  .today-panel-head {
    flex-direction: column;
    align-items: stretch;
    gap: 0.55rem;
    margin-bottom: 0.75rem;
  }

  .today-panel-title {
    font-size: 1.03rem;
  }

  .today-panel-subtitle {
    font-size: 0.84rem;
  }

  .today-holiday {
    font-size: 0.78rem;
    padding: 0.42rem 0.52rem;
    border-radius: 10px;
  }

  .today-canchi-line {
    font-size: 0.84rem;
    padding: 0.62rem 0.68rem;
  }

  .calendar-panel {
    padding: 1rem 0.3rem;
  }

  .calendar-grid {
    gap: 0.2rem;
  }

  .weekday-cell {
    padding: 0.4rem 0.1rem;
    font-size: 0.68rem;
  }

  .calendar-toolbar {
    gap: 0.5rem;
    padding: 0;
  }

  .month-title {
    text-align: center;
  }

  .toolbar-btn {
    padding: 0.4rem 0.45rem;
    font-size: 0.72rem;
    border-radius: 8px;
  }

  .toolbar-actions {
    justify-content: center;
    flex-wrap: nowrap;
    gap: 0.35rem;
  }

  .toolbar-actions .toolbar-btn {
    justify-content: center;
  }

  .day-cell {
    min-height: 66px;
    padding: 0.28rem;
    gap: 0.2rem;
  }

  .solar-day {
    font-size: 1rem;
  }

  .lunar-day {
    font-size: 0.72rem;
  }

  .date-hero-row {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }

  .date-hero-box {
    padding: 0.58rem 0.68rem;
  }

  .date-hero-number {
    font-size: 2.1rem;
  }

  .date-hero-meta {
    font-size: 0.74rem;
  }

  .holiday-text {
    font-size: 0.54rem;
    padding: 0.12rem 0.2rem;
    line-height: 1.25;
  }

  .legend-panel {
    padding: 0.9rem;
  }

  .legend-panel li {
    font-size: 0.84rem;
  }

  .detail-sections-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 420px) {
  .day-cell.is-lunar-first .lunar-day,
  .day-cell.is-lunar-fullmoon .lunar-day {
    min-width: 1.65rem;
    padding: 0.08rem 0.22rem;
  }

}
</style>
