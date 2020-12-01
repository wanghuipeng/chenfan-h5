import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/plugins'
// 引入路由权限控制
import '@/permission';
// 引入公共样式
import './assets/iconfont/iconfont.css';
import '@/assets/less/common.less'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')