<template>
  <div class="base-info">
    <div class="main">
      <div class="avatar">
        <img
          v-if="userInfo.avatarUrl && !userInfo.avatarImg"
          mode="aspectFill"
          :src="userInfo.avatarUrl"
        />
        <img v-else-if="userInfo.gender === 1" src="~@/assets/images/common/avatar_man.png" />
        <img v-else-if="userInfo.gender === 2" src="~@/assets/images/common/avatar_woman.png" />
        <img v-else src="~@/assets/images/common/avatar_unknown.png" />
        <p>更换头像</p>
        <van-uploader :after-read="uploadAvatar" :detail="{ossFileType: 'resumeInformation'}" />
      </div>
      <div class="form">
        <div class="item required">
          <label>真实姓名</label>
          <input v-model="resumeDetail.name" type="text" class="input-item" placeholder="请输入" />
        </div>
        <div class="item required disabled">
          <label>手机号码</label>
          <input
            v-model="resumeDetail.mobile"
            type="number"
            disabled
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item arrow required">
          <label>性别</label>
          <van-field
            readonly
            clickables
            :value="genderText"
            placeholder="请选择性别"
            @click="showPickerGender = true"
          />
          <van-popup v-model="showPickerGender" position="bottom" @click="showPickerGender = false">
            <van-picker
              show-toolbar
              :default-index="genderIndex"
              :columns="genderArr"
              :value-key="'label'"
              :value-value="'value'"
              @cancel="showPickerGender = false"
              @confirm="onConfirmGender"
            />
          </van-popup>
        </div>
        <div class="item arrow required">
          <label>出生年月</label>
          <van-field
            readonly
            clickable
            :value="birthDayText"
            placeholder="请选择出生年月"
            @click="showPickerBirthDay = true"
          />
          <van-popup
            v-model="showPickerBirthDay"
            position="bottom"
            @click="showPickerBirthDay = false"
          >
            <van-picker
              show-toolbar
              :default-index="birthDayIndex"
              :columns="birthDayArr"
              :value-key="'label'"
              @cancel="showPickerBirthDay = false"
              @confirm="onConfirmBirthDay"
            />
          </van-popup>
        </div>
        <div class="item arrow required">
          <label>开始工作</label>
          <van-field
            readonly
            clickable
            :value="workYearText"
            placeholder="请选择工作年份"
            @click="showPickerWorkYear = true"
          />
          <van-popup
            v-model="showPickerWorkYear"
            position="bottom"
            @click="showPickerWorkYear = false"
          >
            <van-picker
              show-toolbar
              :default-index="workYearIndex"
              :columns="workYearArr"
              :value-key="'label'"
              @cancel="showPickerWorkYear = false"
              @confirm="onConfirmWorkYear"
            />
          </van-popup>
        </div>
        <div class="item arrow required">
          <label>居住地</label>
          <van-field
            readonly
            clickable
            :value="cityText"
            placeholder="请选择所在城市"
            @click="showPickerCity = true"
          />
          <van-popup v-model="showPickerCity" position="bottom" @click="showPickerCity = false">
            <van-picker
              show-toolbar
              :columns="areasArr"
              :value-key="'label'"
              :value-value="'value'"
              @cancel="showPickerCity = false"
              @confirm="onConfirmCity"
              @change="handleChangeCity"
            />
          </van-popup>
        </div>
        <div class="item arrow required">
          <label>最高学历</label>
          <van-field
            readonly
            clickable
            :value="degreeText"
            placeholder="请选择最高学历"
            @click="showPickerDegree = true"
          />
          <van-popup v-model="showPickerDegree" position="bottom" @click="showPickerDegree = false">
            <van-picker
              show-toolbar
              :default-index="degreeIndex"
              :columns="degreeArr"
              :value-key="'label'"
              @cancel="showPickerDegree = false"
              @confirm="onConfirmDegree"
            />
          </van-popup>
        </div>
        <div class="item">
          <label>最近公司</label>
          <input
            v-model="resumeDetail.currentCompanyName"
            type="text"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item">
          <label>最近职位</label>
          <input
            v-model="resumeDetail.currentPosition"
            type="text"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item salary">
          <label>目前收入</label>
          <div class="input-group">
            <span>
              <input v-model="resumeDetail.currentSalary" type="number" class="input-item" />元
            </span>
            <span class="cheng">x</span>
            <span>
              <input v-model="resumeDetail.currentSalaryMonth" type="number" class="input-item" />个月
            </span>
          </div>
        </div>
        <div class="item radioTax">
          <span
            v-for="(item,index) in radioTaxArr"
            :key="index"
            :class="[item.active ? 'active' : '']"
            @click="radioTax(item.value)"
          >{{ item.label }}</span>
        </div>
        <div class="item">
          <label>毕业院校</label>
          <input
            v-model="resumeDetail.graduateSchool"
            type="text"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item">
          <label>邮箱</label>
          <input v-model="resumeDetail.email" type="text" class="input-item" placeholder="请输入" />
        </div>
        <div class="item">
          <label>微信号</label>
          <input v-model="resumeDetail.webChat" type="text" class="input-item" placeholder="请输入" />
        </div>
      </div>
      <p v-if="type === 'full'" class="save-btn" @click="saveIt">下一步</p>
      <p v-else class="save-btn" @click="saveIt">保存</p>
    </div>
  </div>
</template>

<script>
import { addResumeDetail, editResumeDetail } from '@/api/resumeApi'
import { getCurrentUserInfo, upload } from '@/api/commonApi'
import regExp from '@/utils/regExp'
import axios from 'axios'
import { Toast } from 'vant'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      avatarImg: null,
      avatar: null,
      type: null,
      showPickerGender: false,
      genderText: null,
      genderIndex: null,
      genderArr: [],
      showPickerBirthDay: false,
      birthDayText: null,
      birthDayIndex: null,
      birthDayArr: [
        // 第一列
        {
          values: []
        },
        // 第二列
        {
          values: []
        }
      ],
      showPickerCity: false,
      cityText: null,
      areasArr: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ],
      areasData: [], // 省市字典
      showPickerWorkYear: false,
      workYearText: null,
      workYearIndex: null,
      workYearArr: [],
      showPickerDegree: false,
      degreeIndex: null,
      degreeText: null,
      degreeArr: [
        {
          value: '95',
          label: '大专'
        },
        {
          value: '96',
          label: '本科'
        },
        {
          value: '97',
          label: '硕士'
        },
        {
          value: '98',
          label: '博士'
        },
        {
          value: '99',
          label: '博士后'
        },
        {
          value: '911',
          label: 'MBA'
        }
      ],
      radioTaxArr: [
        {
          value: '1',
          label: '税前',
          active: false
        },
        {
          value: '2',
          label: '税后',
          active: false
        }
      ],
      userInfo: {},
      resumeDetail: {}, // 基本信息
      delta: null
    }
  },
  computed: {
    ...mapState({
      renderUserInfo: state => state.global.userInfo,
      dictData: state => state.global.dictData
    })
  },
  mounted() {
    this.userInfo = this.renderUserInfo
    console.log(111111111111111, this.userInfo)
    // 数据初始化
    // 性别
    this.genderArr = this.dictData.dicts.gender
    this.genderArr &&
      this.genderArr.filter(item => {
        delete item.children
      })
    // 出生年月
    for (let i = 1900; i <= new Date().getFullYear(); i++) {
      this.birthDayArr[0].values.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      if (i === 10 || i === 11 || i === 12) {
        this.birthDayArr[1].values.push(i)
      } else {
        this.birthDayArr[1].values.push('0' + i)
      }
    }
    this.birthDayArr[0].values = this.birthDayArr[0].values.reverse()

    // 开始工作
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
      this.workYearArr.push(i)
    }
    this.workYearArr = this.workYearArr.reverse()
    // 居住地
    this.areasData = this.dictData.areas
    this.areasArr[0].values = this.dictData.areas
    this.areasArr[1].values = this.dictData.areas[0].children
    this.type = this.$route.params.type || 'add'
    console.log('type', this.type)
    if (this.type === 'add') {
      console.log('新建')
    } else if (this.type === 'edit') {
      console.log('编辑')
    } else if (this.type === 'full') {
      console.log('引导填写完整简历')
    }
    // 真实姓名
    this.$set(this.resumeDetail, 'name', this.userInfo.trueName)
    // 手机号
    this.$set(this.resumeDetail, 'mobile', this.userInfo.mobile)
    // 性别
    this.$set(this.resumeDetail, 'gender', this.userInfo.gender)
    this.genderIndex =
      this.userInfo.gender === 1 ? 0 : this.userInfo.gender === 2 ? 1 : 0
    const gender = Number(this.userInfo.gender)
    this.genderText = gender === 1 ? '男' : gender === 2 ? '女' : ''
    console.log('接受', this.$route.params)
    if (this.$route.params.baseInfo) {
      // 基本信息
      this.resumeDetail = JSON.parse(this.$route.params.baseInfo)
      this.type = this.resumeDetail.type
      console.log(this.type)
      localStorage.getItem('avatar')

      this.$set(this.resumeDetail, 'avatar', localStorage.getItem('avatar'))
      this.$set(
        this.resumeDetail,
        'avatarImg',
        localStorage.getItem('avatarImg')
      )
      this.avatar = localStorage.getItem('avatar')
      this.avatarImg = localStorage.getItem('avatarImg')

      if (this.resumeDetail) {
        // 默认值
        // 性别
        this.genderIndex =
          this.resumeDetail.gender === 1
            ? 1
            : this.resumeDetail.gender === 2
            ? 2
            : 0
      }

      this.genderText =
        this.genderIndex === 1 ? '男' : this.genderIndex === 2 ? '女' : ''
      // 出生年月
      this.birthDayText = this.resumeDetail.birthday
      // 开始工作
      this.workYearText =
        this.resumeDetail.startWorkMonth &&
        this.resumeDetail.startWorkMonth.split('-')[0]
      // 居住地
      this.areasData.filter(item => {
        item.children &&
          item.children.filter((item1, index) => {
            if (item1.value === this.resumeDetail.liveCity) {
              this.cityText = item1.label
            }
          })
      })
      // 最高学历
      this.degreeArr.filter(item => {
        if (item.value - 0 === this.resumeDetail.degreeCode) {
          this.degreeText = item.label
        }
      })
      // 税前，税后
      this.radioTaxArr.filter(item => {
        if (item.value - 0 === this.resumeDetail.currentSalaryTax) {
          item.active = true
        }
      })
    }
  },
  destroyed() {
    this.showPickerGender = false
    this.showPickerBirthDay = false
    this.showPickerWorkYear = false
    this.showPickerCity = false
    this.showPickerDegree = false
  },
  methods: {
    // 获取用户信息
    getCurrentUserInfo() {
      getCurrentUserInfo().then(res => {
        if (res) {
          this.$store.dispatch('updateUserInfo', res)
        }
      })
    },
    // 税前税后
    radioTax(value) {
      this.$set(this.resumeDetail, 'currentSalaryTax', value)
      this.radioTaxArr.filter(item => {
        if (item.value === value) {
          item.active = true
        } else {
          item.active = false
        }
      })
    },
    onConfirmGender(picker, value, index) {
      console.log(picker, value, index)
      const gender = Number(value) + 1
      this.genderText = gender === 1 ? '男' : gender === 2 ? '女' : ''
      this.$set(this.resumeDetail, 'gender', gender)
    },
    onConfirmBirthDay(e) {
      const label = e
      this.birthDayText = label && label.join('-')
      this.$set(this.resumeDetail, 'birthday', this.birthDayText)
    },
    onConfirmWorkYear(e) {
      const label = e
      this.workYearText = label
      this.$set(this.resumeDetail, 'startWorkMonth', label + '-01')
    },
    handleChangeCity(picker, value, index) {
      this.areasData.filter((item, index) => {
        if (item.value === value[0].value) {
          this.areasArr[1].values = item.children
        }
      })
    },
    onConfirmCity(e) {
      const arr = e
      this.areasData.filter(item => {
        item.children &&
          item.children.filter((item1, index) => {
            if (item1.value === e[1].value) {
              this.areasArr[1].defaultIndex = index
              this.cityText = item1.label
            }
          })
      })
      this.cityText = arr[1].label
      this.$set(this.resumeDetail, 'liveProvince', arr[0].value)
      this.$set(this.resumeDetail, 'liveCity', arr[1].value)
      this.showPickerCity = false
    },
    onConfirmDegree(e) {
      console.log(e)
      this.degreeText = e.label
      this.$set(this.resumeDetail, 'degreeCode', e.value)
    },
    // 上传头像
    uploadAvatar(e, detail) {
      Toast.loading({
        message: '上传中...',
        forbidClick: true
      })
      let params = new FormData() // 创建form对象
      params.append('file', e.file) // 通过append向form对象添加数据
      params.append('ossFileType', 'resumeInformation') // 添加form表单中其他数据
      upload(params)
        .then(response => {
          let { data, success, message } = response
          console.log(response)
          if (success) {
            this.avatarImg = data && data.webPath
            this.avatar = data && data.dbPath
            this.$set(this.resumeDetail, 'avatar', data && data.dbPath)
            this.$set(this.resumeDetail, 'avatarImg', data && data.webPath)
          } else {
            this.$toast(message)
          }
        })
        .catch(err => {
          this.$toast('图片上传失败')
          console.log(err)
        })
        .finally(() => {
          Toast.clear()
        })
    },
    //  新建简历/新建基本信息
    addResumeDetail() {
      Toast.loading({ forbidClick: true })
      const params = this.resumeDetail
      addResumeDetail(params).then(res => {
        Toast.clear()
        this.getCurrentUserInfo()
        if (res.success) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      })
    },
    // 编辑基本信息
    editResumeDetail() {
      Toast.loading({
        forbidClick: true
      })
      const params = this.resumeDetail
      editResumeDetail(params).then(res => {
        Toast.clear()
        this.getCurrentUserInfo()
        if (res.success) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      })
    },
    // 保存
    saveIt() {
      const params = this.resumeDetail

      if (!params.name) {
        this.$toast('请输入真实姓名')
      } else if (!params.mobile) {
        this.$toast('请输入手机号码')
      } else if (!params.gender) {
        this.$toast('请选择性别')
      } else if (!params.birthday) {
        this.$toast('请选择出生年月')
      } else if (!params.startWorkMonth) {
        this.$toast('请选择开始工作年份')
      } else if (!params.liveProvince) {
        this.$toast('请选择居住地')
      } else if (!params.degreeCode) {
        this.$toast('请选择最高学历')
      } else if (params.email) {
        if (!regExp.checkEmail(params.email)) {
          this.$toast('请输入正确的邮箱')
        } else {
          if (this.type === 'add' || this.type === 'full') {
            console.log('新建')
            this.addResumeDetail()
          } else if (this.type === 'edit') {
            console.log('编辑')
            this.editResumeDetail()
          }
        }
      } else {
        if (this.type === 'add' || this.type === 'full') {
          console.log('新建')
          this.addResumeDetail()
        } else if (this.type === 'edit') {
          console.log('编辑')
          this.editResumeDetail()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.base-info {
  background: #f7f8f9;
  box-sizing: border-box;
  /deep/ .van-uploader {
    position: absolute;
    opacity: 0;
  }
  .main {
    .save-btn {
      color: #fff;
      margin: 20px auto;
      text-align: center;
      background-color: #1678f9;
      height: 40px;
      line-height: 42px;
      width: 335px;
      font-size: 16px;
      border-radius: 20px;
    }
    .avatar {
      background: #fff;
      height: 120px;
      margin-bottom: 6px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;
      input {
        width: 60px;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -30px;
        margin-top: -40px;
        opacity: 0;
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        object-fit: cover;
      }
      p {
        font-size: #14171a;
        margin-top: 8px;
        font-size: 14px;
      }
    }
    .form {
      background: #fff;
      padding: 0 16px 12px 16px;
      /deep/ .van-cell {
        flex: 1;
        padding: 0;
        margin-left: -8px;
        &:after {
          display: none;
        }
        .van-field__control {
          font-size: 14px;
        }
      }
      .item {
        position: relative;
        padding: 20px 0 8px 0;
        display: flex;
        align-items: center;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          transform: scale(0.5);
          transform-origin: 0 0;
          pointer-events: none;
          box-sizing: border-box;
          border: 0 solid #e6e6e6;
          opacity: 0.6;
          border-bottom-width: 1px;
        }
        &:last-child {
          &::before {
            display: none;
          }
        }
        &.disabled {
          label,
          input {
            color: #999;
          }
        }
        &.required {
          label {
            position: relative;
            &::after {
              content: '*';
              padding-left: 2px;
              font-size: 16px;
              color: red;
            }
          }
        }
        &.arrow {
          &::after {
            content: '';
            width: 12px;
            height: 12px;
            display: inline-block;
            background: url('~@/assets/images/resume/arrow_gray.png') no-repeat;
            position: absolute;
            background-size: 12px;
            right: 0;
          }
        }
        label {
          color: #333;
          width: 92px;
          display: inline-block;
          font-size: 14px;
          text-align: left;
        }
        .input-item {
          color: #333;
          font-size: 14px;
          display: inline-block;
          width: 280px;
          position: relative;
          border: none;
          background: transparent;
        }
        &.salary {
          &::before {
            display: none;
          }
          .input-group {
            flex: 1;
            margin-left: -8px;
            justify-content: space-between;
            align-items: center;
            span {
              font-size: 14px;
              color: #333;
              width: 140px;
              line-height: 36px;
              input {
                width: 80px;
                line-height: 25px;
                height: 25px;
                min-height: 25px;
                border-radius: 4px;
                padding: 0 5px;
                box-sizing: border-box;
                margin-left: 0;
                vertical-align: middle;
                background: #f4f6f9;
                margin-right: 6px;
              }
              &.cheng {
                margin: 0 8px 0 4px;
              }
            }
          }
        }
        &.radioTax {
          margin-top: -20px;
          padding-left: 85px;
          span {
            width: 94px;
            font-size: 14px;
            &::before {
              content: '';
              width: 16px;
              height: 16px;
              display: inline-block;
              vertical-align: -3px;
              margin-right: 6px;
              background: url('~@/assets/images/resume/unselected.png')
                no-repeat;
              background-size: 16px;
            }
            &.active {
              &::before {
                content: '';
                background: url('~@/assets/images/resume/selected.png')
                  no-repeat;
                background-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
