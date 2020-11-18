<template>
  <van-dialog v-model="show" class="entry-record" :showConfirmButton="false" closeOnClickOverlay @close="close">
      <div class="list">
        <p class="title van-hairline--bottom">请选择您的入职记录</p>
        <ul>
          <li v-for="i in 3" :key="i" @click="checkIt">
            <div class="left">
              <p><label>王大锤</label>收银员</p>
              <p>入职日期：2020-11-23</p>
            </div>
            <span class="right current">待办理入职</span>
          </li>
        </ul>
      </div>
  </van-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  mounted() {
  },
  methods: {
    close(){
      this.$emit('closeDialog')
    },
    checkIt(){
      setTimeout(() => {
        this.close()
        this.$router.push({name:'myRecord'})
      }, 100)
    }
  }
}
</script>

<style lang="less" >
.entry-record {
  width: 335px;
  border-radius: 8px;
  .list{
    max-height: 80vh;
    overflow-y: auto;
    .title{
      color: #080F1A;
      font-size: 16px;
      padding:15px  20px;
      border-bottom-color:#F5F7FA;
      font-weight: 600;
    }
    ul{
      padding: 15px 20px 20px 20px;
      li{
        padding: 15px;
        position: relative;
        background: #F8F8FA;
        border-radius: 8px;
        margin-bottom: 20px;
        &:active{
          background: rgba(0,0,0,.1);
        }
        &:last-child{
          margin-bottom: 0;
        }
        .left{
          p{
            &:first-child{
              color: #C2C5CC;
              font-size: 12px;
              margin-bottom: 8px;
              label{
                color: #080F1A;
                font-size: 16px;
                margin-right: 8px;
              }
            }
            &:nth-child(2){
              color: #8B8F99;
              font-size: 12px;
            }
          }
        }
        .right{
          position: absolute;
          right: 15px;
          top: 50%;
          margin-top: -9px;
          color: #8B8F99;
          font-size: 12px;
          &.current{
            color: #F17C62;
          }
        }
      }
    }
  }
}
</style>
