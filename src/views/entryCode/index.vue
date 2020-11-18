<template>
  <div class="entry-code-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="content">
        <img src="" alt="">
        <p>「上海市浦东新区陆家嘴店」</p>
        <p>欢迎您的加入</p>
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
.entry-code-page {
  .content{
      padding-top: 100px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      img{
          width: 255px;
          height: 255px;
          background: brown;
          margin-bottom: 40px;
      }
      p{
        font-size: 16px;
        color: #080F1A;
        line-height: 22px;
      }
  }
}
</style>

