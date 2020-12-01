import store from '@/store';
import router from '@/router'
import axios from 'axios'
import { Toast } from 'vant';
import Vue from 'vue'
axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'

let messageBoxAlertLock = false; // 登录超时弹窗锁

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    const token = Vue && Vue.ls && Vue.ls.get('x-client-token')
    if (token) {
        config.headers['x-client-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    }
    return config
}, (err) => {
    // 对请求错误做些什么
    return Promise.reject(err)
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    if (response && response.config.url.indexOf('.js') !== -1) { // 访问js文件
        return Promise.resolve(response);
    } else if (response && response.config.url.indexOf('/common/geetest/register') !== -1) { // 极验
        return Promise.resolve(response);
    } else {
        // 登录模块按钮loading统一管理，为了解决后台响应错误码无法进入成功回调的问题
        // store.dispatch('dispatchUpdateNextLoading', false);
        if (response.data.code === '000000') {
            if (response.data.data && response.data.data.accessToken) {
                Vue.ls.set('x-client-token', response.data.data.accessToken)
            }
            // 统一解决后台无法返回标准格式情况下，前端正确读取到data这一级别数据的问题
            if (!response.data.data) {
                response.data.data = {};
            }
            return Promise.resolve(response);
        } else {
            if (response.data.code === '000004') {
                // 登录超时
                if (!messageBoxAlertLock) {
                    messageBoxAlertLock = true;
                    // MessageBox.alert('登录超时，请重新登录', '提示', {
                    //     showClose: false
                    // }).then(() => {
                    //     messageBoxAlertLock = false;
                    //     // 判断缓存中是否有登录信息，如果有的话重新缓存一下
                    //     const loginInfo = localStorage.getItem('loginInfo');
                    //     localStorage.clear()
                    //     if (loginInfo && loginInfo !== 'null') {
                    //         localStorage.setItem('loginInfo', loginInfo)
                    //     }
                    //     sessionStorage.clear()
                    //     store.dispatch('dispatchUpdateUserInfo', {});
                    //     router.replace({
                    //         path: '/login',
                    //         query: {
                    //             redirect: router.currentRoute.fullPath
                    //         }
                    //     });
                    // });
                }
            } else if (response.data.code === '100612') {
                return Promise.resolve(response);
            } else {
                Toast({
                    message: response.data.message || '哎呀， 网络异常~',
                    closeOnClick: true,
                    position: 'bottom'
                });
            }
            return Promise.reject(response);
        }
    }
}, (err) => {
    console.log(err)
        // 对响应错误做点什么
    switch (err.response.status) {
        case 404:
            Toast({
                message: '请求资源不存在：#' + err.response.status,
                closeOnClick: true,
                position: 'bottom'
            });
            break;
        case 400:
            Toast({
                message: '请求参数有误：#' + err.response.status,
                closeOnClick: true,
                position: 'bottom'
            });
            break;
        case 500:
            Toast({
                message: '服务器异常：#' + err.response.status,
                closeOnClick: true,
                position: 'bottom'
            });
            break;
        case 504:
            Toast({
                message: '请求超时：#' + err.response.status,
                closeOnClick: true,
                position: 'bottom'
            });
            break;
        default:
            Toast({
                message: '未知故障：#' + err.response.status,
                closeOnClick: true,
                position: 'bottom'
            });
            break;
    }
    return Promise.reject(err.response);
})

export default {
    // 封装axios
    http: axios,
    // 封装get
    requestGet(url, params = {}) {
        return axios.get(url, { params }).then(res => res.data).catch()
    },
    // 封装post
    requestPost(url, params = {}) {
        return axios.post(url, params).then(res => res.data).catch()
    },
    // 封装put
    requestPut(url, params = {}) {
        return axios.put(url, params).then(res => res.data).catch()
    },
    // 封装delete
    requestDelete(url, params = {}) {
        return axios.delete(url, { params }).then(res => res.data).catch()
    }
}