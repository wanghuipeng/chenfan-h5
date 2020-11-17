<template>
  <div class="wrap">
    <!-- 顶部边栏 -->
    <div class="top-bar">
      <img src="https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/img/common/logo/zhaopin.png" class="bar-logo" />
      <span class="bar-user" @click="toUser"><i class="icon iconfont icon-bianzu21"></i></span>
    </div>
    <!-- 企业信息 -->
    <div class="company-info">
      <div class="content">
        <div class="main">
          <p class="main-name ellipsis">{{ renderInfo.shortName }}</p>
          <p
            class="main-sub ellipsis"
          >{{ renderInfo.industrys1 | filterCommonDict(dictData.industry) }} | {{ renderInfo.style | filterCommonDict(dictData.dicts.enterpriseProperty) }} | {{ renderInfo.scale | filterCommonDict(dictData.dicts.enterpriseScale) }}</p>
          <p v-if="renderInfo.developmentAdvantage" class="main-des ellipsis">{{ renderInfo.developmentAdvantage }}</p>
        </div>
        <img v-if="renderInfo.logoImg" :src="renderInfo.logoImg" class="logo" />
        <img v-else src="@/assets/images/common/default-logo.png" class="logo" />
      </div>
      <img
        src="https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/dalie-wechat-mini-app/img/position/company_bg.png"
        class="background"
      />
    </div>
    <!-- 主体内容 -->
    <div class="main-content">
      <div v-show="tabBarActive === 'companyDescription'" class="content-item">
        <company-description :dict-data="dictData" :company-info="companyInfo" />
      </div>
      <div v-show="tabBarActive === 'onMovePosition'" class="content-item">
        <!-- <on-move-position :dict-data="dictData" :company-info="companyInfo" /> -->
      </div>
      <div v-show="tabBarActive === 'recruitmentArea'" class="content-item">
        <recruitment-area :dict-data="dictData" :company-info="companyInfo" />
      </div>
      <div v-show="tabBarActive === 'companyStory'" class="content-item">
        <company-story :dict-data="dictData" :company-info="companyInfo" />
      </div>
    </div>
    <!-- 底部版权 -->
    <div class="footer-copyright">
      <p class="copyright-text">Powered By 大猎英才</p>
      <p class="copyright-link">
        <img src="@/assets/images/together/black-point-right.png" />
        企业微信招聘首选解决方案
        <img src="@/assets/images/together/black-point-left.png" />
      </p>
    </div>
    <!-- 底部导航 -->
    <van-tabbar v-model="tabBarActive" :z-index="999">
      <van-tabbar-item name="companyDescription">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.tabBar1Hover : icon.tabBar1" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="onMovePosition">
        <span>全部职位</span>
        <template #icon="props">
          <img :src="props.active ? icon.tabBar2Hover : icon.tabBar2" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="recruitmentArea">
        <span>招聘专区</span>
        <template #icon="props">
          <img :src="props.active ? icon.tabBar3Hover : icon.tabBar3" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="companyStory">
        <span>企业故事</span>
        <template #icon="props">
          <img :src="props.active ? icon.tabBar4Hover : icon.tabBar4" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import companyDescription from './tabBar/companyDescription'
// import onMovePosition from './tabBar/onMovePosition'
import recruitmentArea from './tabBar/recruitmentArea'
import companyStory from './tabBar/companyStory'
import { getDict } from '@/api/commonApi'
import { getCompanyRecommendDetail } from '@/api/together'
export default {
  components: {
    companyDescription,
    // onMovePosition
    recruitmentArea,
    companyStory
  },
  data() {
    return {
      // 当前底部导肮索引
      tabBarActive: 'companyDescription',
      // 底部导航图表
      icon: {
        tabBar1: require('@/assets/images/together/tab-bar-1.png'),
        tabBar1Hover: require('@/assets/images/together/tab-bar-1-hover.png'),
        tabBar2: require('@/assets/images/together/tab-bar-2.png'),
        tabBar2Hover: require('@/assets/images/together/tab-bar-2-hover.png'),
        tabBar3: require('@/assets/images/together/tab-bar-3.png'),
        tabBar3Hover: require('@/assets/images/together/tab-bar-3-hover.png'),
        tabBar4: require('@/assets/images/together/tab-bar-4.png'),
        tabBar4Hover: require('@/assets/images/together/tab-bar-4-hover.png')
      },
      // 字典数据源
      dictData: {
        areas: [],
        dicts: {},
        functions: [],
        industry: []
      },
      // 企业信息
      companyInfo: {
        id: this.$route.query.id
      }
    }
  },
  computed: {
    // 渲染的企业信息
    renderInfo() {
      const data = Object.assign({}, this.companyInfo)
      return data
    }
  },
  mounted() {
    // 查询字典数据
    getDict().then(res => {
      this.dictData = res
      // 查询企业信息
      this.queryCompanyInfo()
    })
  },
  methods: {
    // 查询企业信息
    queryCompanyInfo() {
      const para = {}
      para.companyId = this.companyInfo.id
      getCompanyRecommendDetail(para).then(res => {
        // 后台共用了一个推荐须知接口，因此这里的数据需要前台包装一下
        res.data.company.logoImg = res.data.logoImg
        res.data.company.companyPictureImgs = res.data.companyPictureImgs
        res.data.company.introduce = res.data.introduce
        res.data.company.developmentAdvantage = res.data.developmentAdvantage
        res.data.company.companyVideoUrl = res.data.companyVideoUrl
        res.data.company.welfareHighlights = res.data.welfareHighlights
        res.data.company.companyWxMp = res.data.companyWxMp
        this.companyInfo = res.data.company
      })
    },
    // 跳转个人中心页
    toUser() {
      this.$router.push({
        path: '/mine'
      });
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/less/together/index.less';
.wrap {
  padding: 0 0 50px;
  .top-bar{
    display: flex;
    height: 44px;
    padding: 0 16px;
    justify-content: space-between;
    align-items: center;
    .bar-logo{
      display: block;
      width: 80px;
      height: 20px;
    }
    .bar-user{
      color: #666666;
      .icon{
        font-size: 24px;
      }
    }
  }
  .company-info {
    height: 213px;
    position: relative;
    .content {
      display: flex;
      box-sizing: border-box;
      width: 100%;
      padding: 60px 16px;
      justify-content: space-between;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      .main {
        flex: auto;
        max-width: 250px;
        .main-name {
          font-size: 28px;
          color: #FFFFFF;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .main-sub {
          font-size: 12px;
          color: #FFFFFF;
          margin-bottom: 16px;
        }
        .main-des{
          font-size: 12px;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
      .logo {
        flex: none;
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 4px;
        margin-left: 20px;
      }
    }
    .background {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .footer-copyright {
    margin: 16px 0 20px;
    text-align: center;
    color: #999999;
    .copyright-text {
      font-size: 14px;
      margin-bottom: 7px;
    }
    .copyright-link {
      font-size: 12px;
      img {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin: 0 8px;
      }
    }
  }
}
</style>
