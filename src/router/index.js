import Vue from 'vue'
import VueRouter from 'vue-router'

// 雇主
const home = r => require.ensure([], () => r(require('@/views/home/index.vue')), 'home')

Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path: '/home',
        name: 'home',
        component: home
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router