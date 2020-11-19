<template>
  <div class="employee-todo-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <header>
      <p class="name"><span>上海市浦东新区陆家嘴店</span><i></i></p>
      <p class="mess">
        <span>门店店长：高书院</span>
        <span>门店状态：已开业</span>
      </p>
      <van-button class="entry-code default-btn" block @click="entryCode">门店入职码</van-button>
    </header>
    
    <transition name="van-slide-up">
      <div class="list" v-show="show">
        <p class="title van-hairline--bottom">{{$route.meta.title}}</p>

        <div class="loading-list" v-if="loading">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <template v-else>
          <van-tree-select
            :items="items"
            height="125vw"
            :main-active-index.sync="activeIndex"
          >
            <template #content>
              <ul class="inner-list" v-if="activeIndex === 0">
                <li v-for="i in 10" :key="i" @click="toDetail">
                  <p><label>高书院</label><span class="job">收银员</span></p>
                  <p>
                    <span>1326608302</span>
                    <span>2020-11-09</span>
                  </p>
                </li>
              </ul>
              <van-image
                v-if="activeIndex === 1"
                src="https://img.yzcdn.cn/vant/apple-2.jpg"
              />
            </template>
          </van-tree-select>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      show:false,
      loading:true,
      items:[
        { text: '待办理入职',id:1}, 
        { text: '待签约',id:2 },
        { text: '待办理入职',id:1}, 
        { text: '待签约',id:2 },
        { text: '待办理入职',id:1}, 
        { text: '待签约',id:2 },
        { text: '待办理入职',id:1}, 
        { text: '待签约',id:2 },
        { text: '待办理入职',id:1}, 
        { text: '待签约',id:2 }
      ],
      activeIndex: 0,
    }
  },
  mounted(){
    this.show = true
    setTimeout(()=>{
      this.loading = false
    },500)
  },
  methods:{
    toDetail(){
      this.$router.push({name:'employeeDetail'})
    },
    entryCode(){
      this.$router.push({name:'entryCode'})
    },
  }
}
</script>
<style lang="less">
@import '~@/assets/less/employeeList.less';
</style>

