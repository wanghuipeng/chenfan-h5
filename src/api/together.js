import http from '@/utils/http'

// 获取企业推荐须知信息
export function getCompanyRecommendDetail(params) {
    return http.requestGet(`/company/getCompanyDetail`, params)
}