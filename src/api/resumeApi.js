import http from '@/utils/http'

// 获取我的简历
export function getResumeInfoByUserId(params) {
    return http.requestGet('/candidate/resumeBase/getResumeInfoByUserId',
        params)
}

// 新建简历-基本信息
export function addResumeDetail(params) {
    return http.requestPost(
        '/candidate/resumeBase/addResumeDetail',
        params
    )
}

// 添加简历-工作经历
export function addResumeExperience(params) {
    return http.requestPost(
        '/candidate/resumeBase/addResumeExperience',
        params
    )
}

// 添加简历-项目经历
export function addResumeProject(params) {
    return http.requestPost(
        '/candidate/resumeBase/addResumeProject',
        params
    )
}

// 添加简历-教育经验(学历)
export function addResumeEducation(params) {
    return http.requestPost(
        '/candidate/resumeBase/addResumeEducation',
        params
    )
}

// 添加简历-语言能力
export function addResumeLanguages(params) {
    return http.requestPost(
        '/candidate/resumeBase/addResumeLanguages',
        params
    )
}

// 添加简历-证书信息
export function addResumeCerInfo(params) {
    return http.requestPost(
        '/candidate/resumeBase/addResumeCerInfo',
        params
    )
}

// 编辑简历-基本信息
export function editResumeDetail(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeDetail',
        params
    )
}

// 编辑简历-求职意向
export function editResumeJobIntention(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeJobIntention',
        params
    )
}

// 编辑简历-工作经历
export function editResumeExperience(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeExperience',
        params
    )
}

// 编辑简历-项目经历
export function editResumeProject(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeProject',
        params
    )
}

// 编辑简历-教育经验(学历)
export function editResumeEducation(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeEducation',
        params
    )
}

// 编辑简历-语言能力
export function editResumeLanguages(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeLanguages',
        params
    )
}

// 编辑简历-证书信息
export function editResumeCerInfo(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumeCerInfo',
        params
    )
}

// 编辑简历-自我介绍
export function editResumePerson(params) {
    return http.requestPost(
        '/candidate/resumeBase/editResumePerson',
        params
    )
}

// 删除简历-工作经历
export function deleteResumeExperience(params) {
    return http.requestDelete('/candidate/resumeBase/deleteResumeExperience',
        params
    )
}

// 删除简历-项目经历
export function deleteResumeProject(params) {
    return http.requestDelete('/candidate/resumeBase/deleteResumeProject',
        params
    )
}

// 删除简历-教育经验(学历)
export function deleteResumeEducationById(params) {
    return http.requestDelete('/candidate/resumeBase/deleteResumeEducationById',
        params
    )
}

// 删除简历-语言能力
export function deleteResumeLanguages(params) {
    return http.requestDelete('/candidate/resumeBase/deleteResumeLanguages',
        params
    )
}

// 删除简历-证书信息
export function deleteResumeCerInfo(params) {
    return http.requestDelete('/candidate/resumeBase/deleteResumeCerInfo',
        params
    )
}

// 获取可对接简历的渠道
export function getResumeAccountSiteList(params) {
    return http.requestGet('/candidate/resumeBase/getResumeAccountSiteList',
        params)
}

// 获取个人账号下的简历
export function spiderPersonalAccountResume(params) {
    return http.requestPost('/candidate/resumeBase/spiderPersonalAccountResume',
        params)
}