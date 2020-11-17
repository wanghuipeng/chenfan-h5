import http from '@/utils/http'
// 字典
export function getDict() {
    return http.requestGet('/code/dict.js')
}

// 用户信息
export function getCurrentUserInfo(params) {
    return http.requestGet('/ucenter/account/getCurrentUserInfo', params)
}

// 上传文件
export function upload(params) {
    return http.requestPost('/common/upload', params)
}

// 微信签名
export function createJsapiSignature(params) {
    return http.requestGet(`/wechat/createJsapiSignature`, params)
}
