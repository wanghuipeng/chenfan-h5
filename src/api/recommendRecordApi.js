import http from '@/utils/http'

// 获取推荐记录
export function getInformantClueList(params) {
    return http.requestPost('/share/browse/getInformantClueList', params)
}