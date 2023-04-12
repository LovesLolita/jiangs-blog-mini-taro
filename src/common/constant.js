
import dayjs from 'dayjs'

export const ERR_MES = "网络开了小差，请稍后重试～"

// 日历最小日期
export const MIN_DATE = dayjs().format('YYYY-MM-DD')
// 最大日期
export const MAX_DATE = dayjs().add(60, 'day').format('YYYY-MM-DD')

// 用户登录有效期10天
export const USER_VALID_TIME = 10 * 24 * 60 * 60