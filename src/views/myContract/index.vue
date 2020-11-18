<template>
  <div class="my-contract-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <ul class="list">
        <li v-for="i in 10" :key="i">
            <p>客服岗位保密协议+劳动手册</p>
            <p>2020-02-23至2020-08-27</p>
        </li>
    </ul>
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
.my-contract-page {
  background-color: #F8F9FA;
  min-height: 100vh;
  .list{
      li{
          margin-bottom: 8px;
          background: #fff;
          padding: 20px;
          box-sizing: border-box;
          &:active{
            background: rgba(0,0,0,.1);
          }
          p{
              &:first-child{
                  color: #080F1A;
                  font-size: 16px;
                  margin-bottom: 8px;
              }
              &:nth-child(2){
                  color:#A6AAB3;
                  font-size: 14px;
              }
          }
      }
  }
}
</style>

