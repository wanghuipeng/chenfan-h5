import http from '@/utils/http'

// 微信授权码登录
export function loginByWechatCode(params) {
  return http.requestPost(`/jobservice/account/loginByWechatCode`, params)
}

// 极验
export function geetest(params) {
  return http.requestGet(`/common/geetest/register`, params)
}

// 验证码
export function sendSmsVerificationMessage(params) {
  return http.requestGet(`/message/sms/sendSmsVerificationMessage`, params)
}

// 短信登录&绑定 应用用户
export function smsLoginBind(params) {
  return http.requestPost(`/jobservice/account/smsLoginBind`, params)
}
