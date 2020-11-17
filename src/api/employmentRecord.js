import http from '@/utils/http'

// 求职记录
export function getShareApplyList (params) {
  return http.requestPost('/share/apply/getShareApplyList', params)
}
