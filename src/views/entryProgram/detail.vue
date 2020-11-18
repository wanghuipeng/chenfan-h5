<template>
  <div class="my-record-page entry-program-detail-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="form-text">
      <h3>基本信息：</h3>
      <p>
        <label>入职日期</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>考核期止</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>手机号码</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>身份证号码</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>银行卡号</label>
        <span>2020-08-26</span>
      </p>
    </div>

    <div class="divider"></div>

    <div class="form-text">
      <h3>商保信息：</h3>
      <p>
        <label>是否参加商保</label>
        <span>是</span>
      </p>
      <p>
        <label>人身意外险</label>
        <span>考核期开始缴纳</span>
      </p>
      <p>
        <label>财产意外险</label>
        <span>考核期开始缴纳</span>
      </p>
      <p>
        <label>其他保险</label>
        <span>2020-08-26</span>
      </p>
    </div>

    <div class="divider"></div>

    <div class="footer-btns">
        <van-button class="default-btn ghost">取消入职</van-button>
        <van-button class="default-btn">办理入职</van-button>
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
   
  }
}
</script>
<style lang="less">
@import '~@/assets/less/myRecord.less';
.entry-program-detail-page{
   h3{
       
   }
}
</style>

