<template>
  <div class="delivery-page">
    <div class="part part-resume">
      <p class="title">创建在线简历：</p>
      <div class="card" @click="toResumePage('baseInfo',{type:'add'})">
        <img
          src="https://oss.dalieyingcai.com/static/dalie-ai-wechat-mini-app/img/delivery/logo_online.png"
        />
        <div class="cont">
          <p>30S快速填写简历</p>
          <p>填写基本信息，快速投递</p>
          <span class="arrow"></span>
        </div>
      </div>
      <div class="card" @click="toResumePage('baseInfo',{type:'full'})">
        <img
          src="https://oss.dalieyingcai.com/static/dalie-ai-wechat-mini-app/img/delivery/logo_60.png"
        />
        <div class="cont">
          <p>
            填写完整简历
            <span class="tag">推荐</span>
          </p>
          <p>填写完整简历，可以提升被选中面试几率</p>
          <span class="arrow"></span>
        </div>
      </div>
    </div>
    <div class="part">
      <p class="title">快速导入第三方简历：</p>
      <div
        class="card"
        v-for="(item,index) in listData"
        :key="index"
        :class="[item.statusNo === 1 ? '' : 'disabled']"
      >
        <template v-if="item.statusNo === 1">
          <img :src="item.siteLogo" mode="aspectFit" />
          <div class="cont" @click="importResume(item.siteCode,item.siteLogo)">
            <span>{{item.siteName}}</span>
            <span class="arrow">导入</span>
          </div>
        </template>
        <template v-else>
          <img :src="item.siteLogo" mode="aspectFit" />
          <div class="cont">
            <span>{{item.siteName}}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template> 

<script>
import { getCurrentUserInfo, getDict } from '@/api/commonApi'
import {
  getResumeAccountSiteList,
  getResumeInfoByUserId
} from '@/api/resumeApi'

export default {
  data() {
    return {
      listData: null,
      detail: {} // 简历详情
    }
  },
  mounted() {
    this.getDict()
    this.getCurrentUserInfo()
    this.getResumeInfoByUserId()
    this.getResumeAccountSiteList()
  },
  methods: {
    // 获取字典
    getDict() {
      getDict().then(res => {
        this.$store.dispatch('updateDictData', res)
      })
    },
    // 获取用户信息
    getCurrentUserInfo() {
      getCurrentUserInfo().then(res => {
        if (res.success) {
          this.$store.dispatch('updateUserInfo', res.data)
        }
      })
    },
    toResumePage(name, params) {
      this.editBaseInfo(name, params)
    },
    importResume(siteCode, siteLogo) {
      this.$router.push({
        name: 'resumePlatform',
        params: { siteCode, siteLogo }
      })
    },
    getResumeAccountSiteList() {
      getResumeAccountSiteList().then(res => {
        const { success, data } = res
        if (success) {
          this.listData = data
        }
      })
    },
    // 获取简历详情
    getResumeInfoByUserId() {
      getResumeInfoByUserId().then(res => {
        const { success, data } = res
        if (success) {
          this.resumeEmpty = false
          this.detail = data.detail && JSON.parse(JSON.stringify(data.detail)) // 基本信息&求职意向
        }
      })
    },
    // 基本信息
    editBaseInfo(name, params) {
      let paramsTemp = {}
      localStorage.setItem('avatar', this.detail.avatar)
      localStorage.setItem('avatarImg', this.detail.avatarImg)
      paramsTemp.id = this.detail.id
      paramsTemp.name = this.detail.name
      paramsTemp.mobile = this.detail.mobile // 手机号
      paramsTemp.gender = this.detail.gender
      paramsTemp.birthday = this.detail.birthday
      paramsTemp.startWorkMonth = this.detail.startWorkMonth
      paramsTemp.liveProvince = this.detail.liveProvince // 省
      paramsTemp.liveCity = this.detail.liveCity // 市
      paramsTemp.degreeCode = this.detail.degreeCode // 学历
      paramsTemp.currentCompanyName = this.detail.currentCompanyName
      paramsTemp.currentPosition = this.detail.currentPosition
      paramsTemp.currentSalary = this.detail.currentSalary
      paramsTemp.currentSalaryMonth = this.detail.currentSalaryMonth
      paramsTemp.currentSalaryTax = this.detail.currentSalaryTax
      paramsTemp.graduateSchool = this.detail.graduateSchool
      paramsTemp.email = this.detail.email // 邮箱
      paramsTemp.webChat = this.detail.webChat
      paramsTemp = Object.assign(paramsTemp, params)
      paramsTemp = JSON.stringify(paramsTemp)
      this.$router.push({
        name,
        params: { baseInfo: paramsTemp }
      })
      console.log(paramsTemp)
    }
  }
}
</script>

<style lang="less" scoped>
.delivery-page {
  padding: 29px 20px;
  .part {
    margin-bottom: 28px;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      font-size: 14px;
      color: #15181b;
    }

    .card {
      margin-top: 16px;
      background: #f7f8f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      border-radius: 2px;
      padding: 12px;
      box-sizing: border-box;
      &.disabled {
        opacity: 0.5;
      }
      img {
        width: 36px;
        height: 36px;
        margin-right: 12px;
      }
      .cont {
        display: flex;
        justify-content: space-between;
        flex: 1;
        span {
          color: #15181b;
          font-size: 12px;
          &.arrow {
            color: #999999;
            position: relative;
            &::after {
              content: '';
              width: 12px;
              height: 12px;
              display: inline-block;
              background: url('~@/assets/images/resume/arrow_gray.png')
                no-repeat;
              background-size: 12px;
              margin-left: 4px;
              vertical-align: -2px;
            }
          }
        }
      }
    }
  }
  .part-resume {
    .cont {
      display: block !important;
      position: relative;
      .arrow {
        position: absolute !important;
        right: 0;
        top: 6px;
      }
      .tag {
        background: #ff5d00;
        color: #fff !important;
        font-size: 10px !important;
        display: inline-block;
        text-align: center;
        margin-left: 8px;
        border-radius: 2px;
        width: 28px;
        height: 16px;
        line-height: 16px;
      }
      p {
        font-size: 11px;
        color: #999999;
        &:first-child {
          font-size: 12px;
          color: #15181b;
        }
      }
    }
  }
}
</style>
