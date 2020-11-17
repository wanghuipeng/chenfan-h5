<template>
  <div class="wrap-box">
    <!-- 标签页 -->
    <van-tabs sticky animated swipeable color="#1678F9" line-height="2px">
      <van-tab title="企业文化">
        <div class="main-content">
          企业文化
        </div>
      </van-tab>
      <van-tab title="团队形象">
        <div class="main-content">
          团队形象
        </div>
      </van-tab>
      <van-tab title="员工福利">
        <div class="main-content">
          员工福利
        </div>
      </van-tab>
      <van-tab title="获得荣誉">
        <div class="main-content">
          获得荣誉
        </div>
      </van-tab>
    </van-tabs>
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
  .main-content{
    padding: 16px 16px 0;
  }
}
</style>
