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

