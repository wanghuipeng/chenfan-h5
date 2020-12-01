import Vue from 'vue'
import VueRouter from 'vue-router'

const login = r => require.ensure([], () => r(require('@/views/login/index.vue')), 'login')
const home = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'home')
const myRecord = r => require.ensure([], () => r(require('@/views/myRecord/index.vue')), 'myRecord')
const myContract = r => require.ensure([], () => r(require('@/views/myContract/index.vue')), 'myContract')
const employeeList = r => require.ensure([], () => r(require('@/views/employeeList/index.vue')), 'employeeList')
const storeRoster = r => require.ensure([], () => r(require('@/views/storeRoster/index.vue')), 'storeRoster')
const entryCode = r => require.ensure([], () => r(require('@/views/entryCode/index.vue')), 'entryCode')
const employeeDetail = r => require.ensure([], () => r(require('@/views/employeeList/detail.vue')), 'employeeDetail')
const entryProgram = r => require.ensure([], () => r(require('@/views/entryProgram/index.vue')), 'entryProgram')
const entryProgramDetail = r => require.ensure([], () => r(require('@/views/entryProgram/detail.vue')), 'entryProgramDetail')
const cancelEntry = r => require.ensure([], () => r(require('@/views/employeeList/cancelEntry.vue')), 'cancelEntry')
const toEntry = r => require.ensure([], () => r(require('@/views/employeeList/toEntry.vue')), 'toEntry')
const entryInfo = r => require.ensure([], () => r(require('@/views/employeeList/entryInfo.vue')), 'entryInfo')

Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path: '/',
        name: 'home',
        component: home,
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: home
    },
    // 登录注册
    {
        path: '/login',
        name: 'login',
        component: login
    },
    // 我的档案
    {
        path: '/myRecord',
        name: 'myRecord',
        component: myRecord,
        meta: {
            title: '我的档案'
        }
    },
    // 我的合同
    {
        path: '/myContract',
        name: 'myContract',
        component: myContract,
        meta: {
            title: '我的合同'
        }
    },
    // 待办理入职/转正/离职名单
    {
        path: '/employeeList',
        name: 'employeeList',
        component: employeeList,
        meta: {
            title: '名单'
        }
    },
    // 门店花名册
    {
        path: '/storeRoster',
        name: 'storeRoster',
        component: storeRoster,
        meta: {
            title: '门店花名册'
        }
    },
    // 门店入职码
    {
        path: '/entryCode',
        name: 'entryCode',
        component: entryCode,
        meta: {
            title: '门店入职码'
        }
    },
    // 店员详情
    {
        path: '/employeeDetail',
        name: 'employeeDetail',
        component: employeeDetail,
        meta: {
            title: '店员详情'
        }
    },
    // 选择入职方案
    {
        path: '/entryProgram',
        name: 'entryProgram',
        component: entryProgram,
        meta: {
            title: '选择入职方案'
        }
    },
    // 方案详情
    {
        path: '/entryProgramDetail',
        name: 'entryProgramDetail',
        component: entryProgramDetail,
        meta: {
            title: '方案详情'
        }
    },
    // 取消入职
    {
        path: '/cancelEntry',
        name: 'cancelEntry',
        component: cancelEntry,
        meta: {
            title: '取消入职'
        }
    },
    // 办理入职
    {
        path: '/toEntry',
        name: 'toEntry',
        component: toEntry,
        meta: {
            title: '办理入职'
        }
    },
    // 提交入职信息
    {
        path: '/entryInfo',
        name: 'entryInfo',
        component: entryInfo,
        meta: {
            title: '提交入职信息'
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router