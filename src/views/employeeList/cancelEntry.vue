<template>
  <div class="cancel-entry-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <van-form>
        <van-field
        v-model="reason"
        rows="4"
        autosize
        type="textarea"
        placeholder="请输入取消入职的原因"
        show-word-limit
        />
    </van-form>

    <div class="footer-btns">
        <van-button class="default-btn ghost" @click="onClickLeft">取消</van-button>
        <van-button class="default-btn" @click="submit" :loading="btnLoading" loading-text="提交">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      btnLoading:false,
      reason:''
    }
  },
  methods:{
    submit(){
      this.btnLoading = true  
      setTimeout(()=>{
        this.btnLoading = false
        let { reason } = this
        let params = { reason }
        console.log(params)
      },500)
    }
  }
}
</script>
<style lang="less">
.cancel-entry-page{
    .van-form{
      padding: 20px;
      box-sizing: border-box;
      .van-field{
          padding: 12px;
          box-sizing: border-box;
          position: relative;
          &::before{
            content: ' ';
            position: absolute;
            box-sizing: border-box;
            pointer-events: none;
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            border: 1px solid #E5E5E5;
            border-radius: 8px;
            -webkit-transform: scale(.5);
            transform: scale(.5);
          }
      }
    }
}
</style>

