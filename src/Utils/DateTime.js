import Moment from 'moment'

export const format_ddMMyyyy = 'DD/MM/yyyy'
export const format_dd_mm_yyyy = 'DD-MM-yyyy'
export const format_hhmmDDMM = 'HH:mm, DD/MM'
export const format_DDMMHHmmm = 'DD-MM HH:mm'
export const format_hhMMDDMMYYYY = 'HH:mm, DD/MM/yyyy'
export const format_ddmm = 'DD/MM'
export const format_ddMMyyyy_hhmm = 'DD/MM/yyyy  |  hh:mm'
export const format_yyyyMMddTHHmmssZ = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
export const format_yyyyMMdd_HHmmss = 'YYYY-MM-DD HH-mm-ss'
export const format_yyyyMMdd_HHmmssz = 'YYYY-MM-DD HH:mm:ss'
export const format_yyyyMMdd = 'yyyy-MM-DD'
export const format_HHmmss = 'HH:mm:ss'
export const format_DDMMHHmm = 'DD/MM - HH:mm'
export const format_HHmm = 'HH:mm'
export const format_MMDD = 'MM-DD'
export const format_DDMM = 'DD-MM'

export const formatDate = ({ dateTime, format = 'HH:mm DD/MM/yyyy' }) => {
  return Moment(dateTime).format(format)
}

export const getDiffTime = (dateTime, dateTime2, format = 'seconds') => {
  return Moment(dateTime).diff(Moment(dateTime2), format)
}

export const getDiffTimeFromNow = (dateTime, format = 'seconds') => {
  return Moment(dateTime).diff(Moment(), format)
}

export const getWeekdays = t => {
  return [
    t('date.t2'),
    t('date.t3'),
    t('date.t4'),
    t('date.t5'),
    t('date.t6'),
    t('date.t7'),
    t('date.cn'),
  ]
}

export const getMonths = t => {
  return [
    t('date.thang1'),
    t('date.thang2'),
    t('date.thang3'),
    t('date.thang4'),
    t('date.thang5'),
    t('date.thang6'),
    t('date.thang7'),
    t('date.thang8'),
    t('date.thang9'),
    t('date.thang10'),
    t('date.thang11'),
    t('date.thang12'),
  ]
}
