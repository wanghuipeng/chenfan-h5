<template>
  <div class="my-record-page employee-detail-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />

    <header>
      <span class="left">高淑媛</span>
      <div class="right">
        <p>
          <span>收银员</span>
          <span>上海市浦东新区上海市浦东新区</span>
        </p>
        <p class="current">待办理入职</p>
      </div>
    </header>
    
    <div class="divider"></div>

    <div class="form-text">
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
      <p>
        <label>开户银行</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>户籍地址</label>
        <span>上海市浦东新区陆家嘴花园石桥路66号东亚银行大厦</span>
      </p>
      <p>
        <label>联系地址</label>
        <span>上海市浦东新区陆家嘴花园石桥路66号东亚银行大厦</span>
      </p>
      <p>
        <label>紧急联系人</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>紧急联系号码</label>
        <span>2020-08-26</span>
      </p>
      <p>
        <label>紧急联系号码</label>
        <span>2020-08-26</span>
      </p>
    </div>

    <div class="footer-btns">
        <van-button class="default-btn ghost" @click="cancelEntry">取消入职</van-button>
        <van-button class="default-btn" @click="toEntry" :loading="btnLoading" loading-text="办理入职">办理入职</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      btnLoading:false
    }
  },
  mounted(){
    
  },
  methods:{
    cancelEntry(){
      this.$router.push({name:"cancelEntry"})
    },
    toEntry(){
      this.btnLoading = true
      setTimeout(()=>{
        this.btnLoading = false
        this.$router.push({name:"toEntry"})
      },500)
    },
  }
}
</script>
<style lang="less">
@import '~@/assets/less/myRecord.less';
</style>

