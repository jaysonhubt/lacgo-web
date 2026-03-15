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

const WEEKDAYS = ['Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'CN']
const today = new Date()
const viewMonth = ref(today.getMonth())
const viewYear = ref(today.getFullYear())

const SOLAR_HOLIDAYS: Record<string, string> = {
  '1-1': 'Tết Dương lịch',
  '30-4': 'Ngày Giải phóng miền Nam (30/04)',
  '1-5': 'Quốc tế Lao động (01/05)',
  '2-9': 'Quốc khánh (02/09)',
}

const LUNAR_HOLIDAYS: Record<string, string> = {
  '10-3': 'Giỗ Tổ Hùng Vương (10/03 ÂL)',
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
    lunarLabel: lunar.day === 1 ? `1/${lunar.month}` : `${lunar.day}`,
    isLunarFirst: lunar.day === 1,
    isLunarFullMoon: lunar.day === 15,
    holidays: [solarHoliday, lunarHoliday].filter((v): v is string => Boolean(v)),
  }
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
                :class="{
                  'is-outside': !cell.isCurrentMonth,
                  'is-today': cell.isToday,
                  'is-holiday': cell.holidays.length > 0,
                  'is-lunar-first': cell.isLunarFirst,
                  'is-lunar-fullmoon': cell.isLunarFullMoon,
                }"
                role="gridcell"
              >
                <div class="day-top">
                  <span class="solar-day">{{ cell.date.getDate() }}</span>
                  <span class="lunar-day">{{ cell.lunarLabel }}</span>
                </div>

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
.legend-panel {
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e9edf3;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
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
  border-radius: 12px;
  border: 1px solid #edf1f6;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.day-top {
  display: flex;
  justify-content: center;
  justify-content: space-between;
  align-items: flex-start;
}

.solar-day {
  font-size: 1.2rem;
  font-weight: 700;
}

.lunar-day {
  font-size: 0.78rem;
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
  font-size: 0.72rem;
  line-height: 1.35;
  color: #c62828;
  font-weight: 600;
  background: #ffebee;
  border-radius: 8px;
  padding: 0.16rem 0.28rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.day-cell.is-outside {
  background: #f8fafc;
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

@media (max-width: 968px) {
  .calendar-container {
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
  .hero-container,
  .calendar-container {
    padding: 0 1rem;
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
    font-size: 0.86rem;
  }

  .lunar-day {
    font-size: 0.6rem;
  }

  .holiday-text {
    font-size: 0.54rem;
    padding: 0.12rem 0.2rem;
    -webkit-line-clamp: 2;
  }

  .legend-panel {
    padding: 0.9rem;
  }

  .legend-panel li {
    font-size: 0.84rem;
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
