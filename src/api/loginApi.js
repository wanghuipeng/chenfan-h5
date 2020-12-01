import http from '@/utils/http'

// 发送验证码
export function sendVeriCode(params) {
    return http.requestGet(`/basic/sendVeriCode`, params)
}

// 微信授权码登录
export function loginByWechatCode(params) {
    return http.requestPost(`/jobservice/account/loginByWechatCode`, params)
}

// 用户信息
export function getCurrentUserInfo(params) {
    return http.requestGet('/ucenter/account/getCurrentUserInfo', params)
}