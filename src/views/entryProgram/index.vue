<template>
  <div class="my-contract-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <ul class="list arrow">
        <li v-for="i in 10" :key="i" @click="toDetail">
            <p>前台岗位入职初期培训方案</p>
            <p>考核周期：15天</p>
        </li>
    </ul>
     
    <!-- 空 -->
    <!-- <div class="empty-list">
      <img src="@/assets/images/common/empty.png">
      <p>TA还没有可选的入职方案<br />请联系客服帮您添加哦</p>
    </div> -->
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
    toDetail(){
        this.$router.push({name:'entryProgramDetail'})
    }
  }
}
</script>
<style lang="less">
@import '~@/assets/less/myContract.less';
</style>

