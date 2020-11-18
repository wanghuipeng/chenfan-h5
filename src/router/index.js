import Vue from 'vue'
import VueRouter from 'vue-router'

const home = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'home')
const myRecord = r => require.ensure([], () => r(require('@/views/myRecord/index.vue')), 'myRecord')
const myContract = r => require.ensure([], () => r(require('@/views/myContract/index.vue')), 'myContract')
const employeeList = r => require.ensure([], () => r(require('@/views/employeeList/index.vue')), 'employeeList')

Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path: '/home',
        name: 'home',
        component: home
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
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router