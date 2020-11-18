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
    <van-button class="entry-code" block>门店入职码</van-button>
  </header>
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
.employee-todo-page {
  header{
    padding: 20px;
    .name{
      position: relative;
      span{
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 200px;
        color: #080F1A;
        font-size: 16px;
        margin-bottom: 8px;
        font-weight: bold;
      }
      i{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('~@/assets/images/home/location.png') no-repeat;
        background-size: 16px;
        vertical-align: 10px;
        margin-left: 7px;
      }
    }
    .mess{
      color: #8B8F99;
      font-size: 12px;
      margin-bottom: 20px;
      span{
        margin-right: 28px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
    .entry-code{
      background-color: #F17C62;
      border-radius: 8px;
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>

