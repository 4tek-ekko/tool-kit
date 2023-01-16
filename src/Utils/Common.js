import { ResponsiveWidth } from '@/Theme'
import moment from 'moment'

export const caculatePageWidthForPagination = (
  sliderWidth,
  itemWidth,
  itemLength,
  marginHorizontal,
) => {
  return itemLength <= 1
    ? 0
    : (itemWidth * itemLength -
        sliderWidth +
        ResponsiveWidth(marginHorizontal) * 2) /
        (itemLength - 1)
}

export const isEmptyObj = obj => {
  if (obj) {
    return Object.keys(obj).length === 0
  }
  return true
}

export const getCountDownTime = () => {
  const time = moment(new Date())
  const time7Day = moment(new Date(time.year(), time.month() + 1, -6))
  const diff = moment(time7Day).diff(time)
  if (diff <= 0) {
    return null
  }
  const countDown = moment.duration(diff).asSeconds()
  return countDown
}

export const filterBankSchedules = bankSchedules => {
  const banks = []
  for (let bank of bankSchedules) {
    const timeSchedules = bank.timeSchedule
    if (timeSchedules.length > 0) {
      const isSchedule = timeSchedules.some(x => x.status)
      if (isSchedule) {
        bank.start_time = timeSchedules[0].start_time
        bank.end_time = timeSchedules[timeSchedules.length - 1].end_time
        banks.push(bank)
      }
    }
  }
  return banks
}
