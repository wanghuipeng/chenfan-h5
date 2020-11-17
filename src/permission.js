import router from '@/router'
import store from '@/store';
import http from '@/utils/http'
import { getQueryString } from '@/utils/common'
import { getCurrentUserInfo } from '@/api/commonApi'
import { loginByWechatCode } from '@/api/loginApi'
/**
 * 路由白名单(进入路由前不进行页面权限校验的路由)
 */
const routerWhiteList = [
    '/login' // 登录页
];

/**
 * 微信环境路由白名单(进入路由前只授权头像信息不进行页面权限校验的路由)
 */
const wxRouterWhiteList = [
    '/home' // 首页
];

/**
 * 路由权限拦截
 */
router.beforeEach(function(to, from, next) {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '大猎英才'
    }
    // 查询字典数据
    http.requestGet(`/code/dict.js`).then(data => {
        data.areas && data.areas.forEach(firstItem => {
            if (firstItem.children.length) {
                firstItem.children.forEach(secondItem => {
                    if (secondItem.children.length) {
                        secondItem.children.forEach(thirdItem => {
                            delete thirdItem.children;
                        });
                    } else {
                        delete secondItem.children;
                    }
                });
            } else {
                delete firstItem.children;
            }
        });
        store.dispatch('updateDictData', data);
    });
    getCurrentUserInfo().then(res => {
        store.dispatch('updateUserInfo', res.data);
        if (routerWhiteList.indexOf(to.path) !== -1) { // 白名单不做拦截
            next()
        } else {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') { // 微信环境
                var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
                // XXX: 修复iOS版微信HTML5 History兼容性问题
                if (isiOS && to.path !== location.pathname) {
                    // 此处不可使用location.replace
                    location.assign(to.fullPath)
                }
                if (!res.data.appUserId) { // 未授权
                    const url = window.location.href.split('?')[0]
                    const code = getQueryString('code')
                    console.log('code', code)
                    if (code) { // 使用code登录
                        const params = {
                            code: code
                        }
                        loginByWechatCode(params).then(res => {
                            console.log('微信登录', res)
                            if (res.data.userId || wxRouterWhiteList.indexOf(to.path) !== -1) { // 已登录 | 不需要登录页面
                                next()
                            } else {
                                next('/login')
                            }
                        })
                    } else {
                        // 重定向获取code
                        const base = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                        const appid = process.env.NODE_ENV === 'production' ? 'wx9ff96dc297572bd1' : 'wx9ff96dc297572bd1' // 目前正式测试环境appid相同
                        const redirectUrl = encodeURIComponent(url)
                        const scope = 'snsapi_userinfo'
                        const authUrl = `${base}${appid}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}#wechat_redirect`
                        window.location.href = authUrl
                    }
                } else if (res.data.userId || wxRouterWhiteList.indexOf(to.path) !== -1) { // 已登录 | 不需要登录页面
                    next()
                } else {
                    next('/login')
                }
            } else { // 非微信环境
                if (res.data.userId || wxRouterWhiteList.indexOf(to.path) !== -1) { // 已登录 | 不需要登录页面
                    next()
                } else {
                    next('/login')
                }
            }
        }
    })
}); // eslint-disable-line
