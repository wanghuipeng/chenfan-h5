import http from '@/utils/http'

// 发送验证码
export function sendVeriCode(params) {
    return http.requestGet(`/basic/sendVeriCode`, params)
}