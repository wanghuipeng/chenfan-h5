<template>
  <div class="home-page">
    <div class="banner">
      <img src="@/assets/images/home/banner.png">
    </div>
    <div class="menu" v-for="(item,index) in menuData" :key="index">
      <p class="title">{{item.title}}</p>
      <div class="list">
        <div class="item" v-for="(e,i) in item.list" :key="i" @click="operate(e.value)">
          <img :src="e.img" @load="loadImage" v-show="showImage">
          <div class="img-div" v-show="!showImage"></div>
          <p>{{e.name}}</p>
        </div>
      </div>
    </div>
    
    <transition name="van-fade">
      <entry-record v-if="show" @closeDialog="closeDialog" />
    </transition>
  </div>
</template>

<script>
import entryRecord from '@/components/home/entryRecord'

export default {
  components: {
    entryRecord
  },
  data() {
    return {
      menuData:[{
        title:'员工自助',
        list:[{
          value:'myRecord',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon1.png',
          link:'',
          name:'我的档案'
        },{
          value:'myContract',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon2.png',
          link:'',
          name:'我的合同'
        },{
          value:'payroll',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon3.png',
          link:'',
          name:'工资单'
        },{
          value:'applyDimiss',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon4.png',
          link:'',
          name:'申请离职'
        }]
      },
      {
        title:'门店管理',
        list:[{
          value:'storeRoster',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon5.png',
          link:'',
          name:'门店花名册'
        },{
          value:'applyEntry',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon6.png',
          link:'',
          name:'入职办理'
        },{
          value:'beWorker',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon7.png',
          link:'',
          name:'转正办理'
        },{
          value:'beDimiss',
          img:'https://dalieyingcai-static-1259513053.cos.ap-beijing.myqcloud.com/chenfan-h5/images/home/icon8.png',
          link:'',
          name:'离职办理'
        }]
      }],
      show:false,
      showImage:false
    }
  },
  mounted(){
    console.log('图片加载')
  },
  methods:{
    loadImage(e){
      console.log(e)
      this.showImage = true
    },
    operate(value){
      if(value === 'applyEntry'){ // 入职办理
        this.show = true
      } else if(value === 'beWorker' || value === 'beDimiss'){
        this.$router.push({name:'employeeList'})
      } else { 
        this.$router.push({name:value})
      }
    },
    closeDialog(){
      this.show = false
    }
  }
}
</script>
<style lang="less">
.home-page {
  padding-bottom: 16px;
  box-sizing: border-box;
  .banner{
    margin-bottom: 16px;
    img{
      height: 180px;
      width: 100%;
      object-fit: contain;
    }
  }
  .menu{
    padding: 16px 20px;
    .title{
      font-size: 16px;
      color: #080F1A;
      &::before{
        content: "";
        vertical-align: -2px;
        width: 5px;
        height: 15px;
        display: inline-block;
        background: #F17C62;
        border-radius: 2.5px;
        margin-right: 4px;
      }
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .item{
        margin-top: 20px;
        width: 33.33%;
        text-align: center;
        img,.img-div{
          width: 52px;
          height: 52px;
          margin-bottom: 2px;
        }
        .img-div{
          display: inline-block;
          border-radius: 8px;
          background: #f5f5f5;
          opacity: .5;
        }
      }
    }
  }
}
</style>

