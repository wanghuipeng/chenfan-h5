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
@import '~@/assets/less/myContract.less';
</style>

