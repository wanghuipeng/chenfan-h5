<template>
  <div class="wrap-box">
    <!-- 列表数据 -->
    <div class="list">
      <div class="list-item">
        <van-image
          fit="cover"
          src="https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/dalie-wechat-mini-app/img/position/invite_cover.png"
          class="item-cover"
        />
        <div class="item-main">
          <p class="main-title ellipsis">软件研发专场招聘</p>
          <p class="main-sub ellipsis">35个职位正在招聘</p>
        </div>
        <i class="item-icon icon iconfont icon-zhiweishouye1"></i>
      </div>
      <div class="list-item">
        <van-image
          fit="cover"
          src="https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/dalie-wechat-mini-app/img/position/invite_cover.png"
          class="item-cover"
        />
        <div class="item-main">
          <p class="main-title ellipsis">软件研发专场招聘</p>
          <p class="main-sub ellipsis">35个职位正在招聘</p>
        </div>
        <i class="item-icon icon iconfont icon-zhiweishouye1"></i>
      </div>
      <div class="list-item">
        <van-image
          fit="cover"
          src="https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/dalie-wechat-mini-app/img/position/invite_cover.png"
          class="item-cover"
        />
        <div class="item-main">
          <p class="main-title ellipsis">软件研发专场招聘</p>
          <p class="main-sub ellipsis">35个职位正在招聘</p>
        </div>
        <i class="item-icon icon iconfont icon-zhiweishouye1"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    // 字典
    dictData: {
      type: Object,
      required: true
    },
    // 公司信息
    companyInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    // 渲染的企业信息
    renderInfo() {
      const data = Object.assign({}, this.companyInfo)
      return data
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="less">
@import '~@/assets/less/together/index.less';
.wrap-box {
  padding: 16px 16px 0;
  .list{
    .list-item{
      display: flex;
      align-items: center;
      box-shadow:0px 1px 16px 0px rgba(6,28,57,0.06);
      border-radius:4px;
      overflow: hidden;
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
      .item-cover{
        flex: none;
        display: block;
        width: 80px;
        height: 80px;
        margin-right: 16px;
      }
      .item-main{
        flex: auto;
        .main-title{
          font-size: 15px;
          font-weight: bold;
          color: #15181B;
          margin-bottom: 10px;
          max-width: 200px;
        }
        .main-sub{
          font-size: 14px;
          color: #666666;
          max-width: 200px;
        }
      }
      .item-icon{
        flex: none;
        font-size: 16px;
        color: #666666;
        margin: 0 12px;
      }
    }
  }
}
</style>
