import { createJsapiSignature } from '@/api/common/index'
export const wxMixin = {
  data() {
    return {
    }
  },
  methods: {
    // 微信分享
    getShareInfo(title, desc, url, imgUrl) {
      console.log(title, desc, url, imgUrl)
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') { // 微信环境调用
        const params = {
          url: url
        }
        createJsapiSignature(params).then(res => {
          const data = res.data
          this.$wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
          });
          this.$wx.ready(() => {
            // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
            this.$wx.updateAppMessageShareData({
              title: title, // 分享时的标题
              desc: desc, // 分享描述
              link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享时的图标
              success: () => {
                console.log('分享成功');
              },
              cancel: () => {
                console.log('取消分享');
              }
            });
            // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
            this.$wx.updateTimelineShareData({
              title: title,
              link: url,
              imgUrl: imgUrl,
              success: () => {
                console.log('分享成功');
              },
              cancel: () => {
                console.log('取消分享');
              }
            });
          })
        })
      }
    }
  }
};
