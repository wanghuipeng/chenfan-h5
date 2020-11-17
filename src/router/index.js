import Vue from 'vue'
import VueRouter from 'vue-router'

// 雇主
const company = r => require.ensure([], () => r(require('@/views/company')), 'company')

const home = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'home')
const demo = r => require.ensure([], () => r(require('@/views/resume/demo.vue')), 'demo') // demo页，后期会删除
const resume = r => require.ensure([], () => r(require('@/views/resume/index.vue')), 'resume') // 我的简历
const baseInfo = r => require.ensure([], () => r(require('@/views/resume/children/baseInfo.vue')), 'baseInfo') // 简历基本信息
const jobIntent = r => require.ensure([], () => r(require('@/views/resume/children/jobIntent.vue')), 'jobIntent') // 求职意向
const industryPage = r => require.ensure([], () => r(require('@/views/resume/children/industryPage.vue')), 'industryPage') // 期望行业
const workExp = r => require.ensure([], () => r(require('@/views/resume/children/workExp.vue')), 'workExp') // 添加工作/实习经历
const eduExp = r => require.ensure([], () => r(require('@/views/resume/children/eduExp.vue')), 'eduExp') // 添加教育经历
const projectExp = r => require.ensure([], () => r(require('@/views/resume/children/projectExp.vue')), 'projectExp') // 添加项目经历
const skill = r => require.ensure([], () => r(require('@/views/resume/children/skill.vue')), 'skill') // 添加技能证书
const langPower = r => require.ensure([], () => r(require('@/views/resume/children/langPower.vue')), 'langPower') // 添加语言能力
const delivery = r => require.ensure([], () => r(require('@/views/resume/children/delivery.vue')), 'delivery') // 投递简历
const resumePlatform = r => require.ensure([], () => r(require('@/views/resume/children/resumePlatform.vue')), 'resumePlatform') // 第三方简历平台
const mine = r => require.ensure([], () => r(require('@/views/mine')), 'mine') // 我的
const recommendRecord = r => require.ensure([], () => r(require('@/views/recommendRecord')), 'recommendRecord') // 我的推荐
const textareaPage = r => require.ensure([], () => r(require('@/components/textareaPage.vue')), 'textareaPage') // textarea
const employmentRecord = r => require.ensure([], () => r(require('@/views/employmentRecord/index.vue')), 'employmentRecord') // 求职记录

const login = r => require.ensure([], () => r(require('@/views/login')), 'login')

Vue.use(VueRouter)

const routes = [
    // 雇主
    {
        path: '/company',
        name: 'company',
        component: company
    },
    // 首页
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/demo',
        name: 'demo',
        component: demo
    },
    {
        path: '/mine',
        name: 'mine',
        component: mine,
        meta: {
            title: '我的'
        }
    },
    {
        path: '/resume',
        name: 'resume',
        component: resume,
        meta: {
            title: '我的简历'
        }
    },
    {
        path: '/baseInfo',
        name: 'baseInfo',
        component: baseInfo,
        meta: {
            title: '填写基本信息'
        }
    },
    {
        path: '/jobIntent',
        name: 'jobIntent',
        component: jobIntent,
        meta: {
            title: '编辑求职意向',
            keepAlive: true
        }
    },
    {
        path: '/workExp',
        name: 'workExp',
        component: workExp,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/eduExp',
        name: 'eduExp',
        component: eduExp,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/projectExp',
        name: 'projectExp',
        component: projectExp,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/skill',
        name: 'skill',
        component: skill,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/langPower',
        name: 'langPower',
        component: langPower,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/delivery',
        name: 'delivery',
        component: delivery
    },
    {
        path: '/resumePlatform',
        name: 'resumePlatform',
        component: resumePlatform
    },
    {
        path: '/industryPage',
        name: 'industryPage',
        component: industryPage,
        meta: {
            title: '选择期望行业'
        }
    },
    {
        path: '/textareaPage',
        name: 'textareaPage',
        component: textareaPage,
        meta: {
            title: ''
        }
    },
    {
        path: '/employmentRecord',
        name: 'employmentRecord',
        component: employmentRecord,
        meta: {
            title: '求职记录'
        }
    },
    {
        path: '/recommendRecord',
        name: 'recommendRecord',
        component: recommendRecord,
        meta: {
            title: '我的推荐'
        }
    },
    // 登录
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    },
    // 默认首页
    {
        path: '/',
        name: 'index',
        redirect: '/home'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router