<template>
  <div class="my-record-page entry-program-detail-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="form-text pb-20">
      <h3>基本信息：</h3>
      <p>
        <label>方案名称</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>考核期长度</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>考核期合同</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>转正后合同</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>薪资组</label>
        <span>2020-08-26</span>
      </p>
    </div>

    <div class="divider"></div>

    <div class="form-text pb-20">
      <h3>商保信息：</h3>
      <p>
        <label>是否参加商保</label>
        <span>是</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>人身意外险</label>
        <span>考核期开始缴纳</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>财产意外险</label>
        <span>考核期开始缴纳</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>其他保险</label>
        <span>2020-08-26</span>
      </p>
    </div>

    <div class="divider"></div>

    <div class="form-text">
      <h3>社保信息：</h3>
      <p>
        <label>是否参加社保</label>
        <span>是</span>
      </p>
      <p>
        <label>参保时间节点</label>
        <span>是</span>
      </p>
      <p>
        <label>社保参保方案</label>
        <span>是</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>养老保险基数</label>
        <span>考核期开始缴纳</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>医疗保险基数</label>
        <span>考核期开始缴纳</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>失业保险基数</label>
        <span>2020-08-26</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>生育保险基数</label>
        <span>2020-08-26</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>大病医疗基数</label>
        <span>2020-08-26</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>残保金基数</label>
        <span>2020-08-26</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>公积金基数</label>
        <span>2020-08-26</span>
      </p>
      <p class="line van-hairline--bottom">
        <label>补充公积金基数</label>
        <span>2020-08-26</span>
      </p>
    </div>

    <div class="footer-btns">
        <van-button class="default-btn" block @click="checkIt">选择该方案</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
     
    }
  },
  methods:{
    checkIt(){
      this.$router.push({name:'entryInfo'})
    }
  }
}
</script>
<style lang="less">
@import '~@/assets/less/myRecord.less';
</style>

