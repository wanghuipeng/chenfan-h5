<template>
  <div class="work-exp">
    <div class="main">
      <div class="form mb-6">
        <div class="item arrow required">
          <label>获取时间</label>
          <van-field
            @click="showPickerReceivingDate = true"
            readonly
            clickable
            :value="receivingDateText"
            placeholder="请选择"
          />
          <van-popup
            v-model="showPickerReceivingDate"
            position="bottom"
            @click="showPickerReceivingDate = false"
          >
            <van-picker
              show-toolbar
              :default-index="receivingDateIndex"
              :columns="receivingDateArr"
              :value-key="'label'"
              @cancel="showPickerReceivingDate = false"
              @confirm="onConfirmStartDate"
            />
          </van-popup>
        </div>
        <div class="item required">
          <label>证书名称</label>
          <input
            type="text"
            v-model="skillDetail.nameOfCertificate"
            class="input-item"
            placeholder="请输入"
          />
        </div>
      </div>
      <p class="save-btn" @click="saveIt">保存</p>
      <p class="del-btn" @click="delIt" v-if="type === 'edit'">删除</p>
    </div>
  </div>
</template>

<script>
import {
  addResumeCerInfo,
  editResumeCerInfo,
  deleteResumeCerInfo
} from '@/api/resumeApi'
import { Toast } from 'vant'

export default {
  data() {
    return {
      showPickerReceivingDate: false,
      receivingDateText: null,
      receivingDateIndex: null,
      receivingDateArr: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ],
      type: null,
      title: null,
      skillDetail: {}
    }
  },
  activated() {
    let options = this.$route.params
    if (options.type) {
      this.type = options.type
    }
    if (options.detail) {
      // 技能证书
      this.skillDetail = JSON.parse(options.detail)
      this.$set(this.skillDetail, 'resumeId', this.skillDetail.resumeId)
    }
    if (this.type === 'add') {
      document.title = '添加技能证书'
    } else if (this.type === 'edit') {
      document.title = '编辑技能证书'
      // 获取时间
      this.receivingDateText = this.skillDetail.receivingDate || null
    }
  },
  mounted() {
    // 获取时间
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
      this.receivingDateArr[0].values.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      if (i === 10 || i === 11 || i === 12) {
        this.receivingDateArr[1].values.push(i)
      } else {
        this.receivingDateArr[1].values.push('0' + i)
      }
    }
    this.receivingDateArr[0].values = this.receivingDateArr[0].values.reverse()
  },
  methods: {
    // 获取时间
    onConfirmStartDate(e) {
      console.log(e)
      let label = e
      this.receivingDateText = label && label.join('-')
      this.$set(this.skillDetail, 'receivingDate', this.receivingDateText)
    },
    // 添加技能证书
    addResumeCerInfo() {
      Toast.loading({ forbidClick: true })
      let params = this.skillDetail
      console.log('params', params)
      addResumeCerInfo(params).then(res => {
        Toast.clear()
        console.log(res)
        if (res) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.goBack()
          }, 1500)
        }
      })
    },
    // 编辑技能证书
    editResumeCerInfo() {
      Toast.loading({ forbidClick: true })
      let params = this.skillDetail
      editResumeCerInfo(params).then(res => {
        Toast.clear()
        console.log(res)
        if (res) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.goBack()
          }, 1500)
        }
      })
    },
    // 删除技能证书
    deleteResumeCerInfo() {
      Toast.loading({ forbidClick: true })
      let { resumeId, id } = this.skillDetail
      let params = {
        resumeId,
        resumeCerInfoId: id
      }
      deleteResumeCerInfo(params).then(res => {
        Toast.clear()
        console.log(res)
        if (res) {
          this.$toast.success('删除成功')
          setTimeout(() => {
            this.goBack()
          }, 1500)
        }
      })
    },
    goBack() {
      this.$router.go(-1)
      this.skillDetail = {
        resumeId: this.skillDetail.resumeId
      }
      this.$set(this.skillDetail, 'resumeId', this.skillDetail.resumeId)
      this.receivingDateText = null
      this.receivingDateIndex = null
      this.receivingDateArr = [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ]
      this.$store.dispatch('updateTextarea', {})
    },
    // 保存
    saveIt() {
      let params = this.skillDetail
      console.log(params, this.type)
      if (!this.receivingDateText) {
        this.$toast('请输入获取时间')
      } else if (!params.nameOfCertificate) {
        this.$toast('请输入证书名称')
      } else {
        if (this.type === 'add') {
          console.log('新建')
          this.addResumeCerInfo()
        } else if (this.type === 'edit') {
          console.log('编辑')
          this.editResumeCerInfo()
        }
      }
    },
    // 删除
    delIt() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除技能证书？',
          asyncClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.deleteResumeCerInfo()
        })
        .catch(() => {
          console.log('取消')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.mb-6 {
  margin-bottom: 6px;
}
.work-exp {
  background: #f7f8f9;
  box-sizing: border-box;
  padding-bottom: 20px;
  position: fixed;
  width: 100%;
  height: 100%;
  .main {
    background: #f7f8f9;
    box-sizing: border-box;
    padding-bottom: 20px;
    .save-btn {
      color: #fff;
      margin: 40px auto 0 auto;
      text-align: center;
      background-color: #1678f9;
      height: 40px;
      line-height: 40px;
      width: 335px;
      font-size: 16px;
      border-radius: 20px;
    }
    .del-btn {
      line-height: 38px;
      font-size: 16px;
      width: 335px;
      height: 38px;
      border-radius: 20px;
      color: #1678f9;
      border: 1px solid #1678f9;
      background: #fff;
      margin: 16px auto 0 auto;
      text-align: center;
    }
    .form {
      background: #fff;
      padding: 0 16px;
      /deep/ .van-cell {
        padding: 0;
        line-height: 40px;
        width: 250px;
        &:after {
          display: none;
        }
        .van-field__input {
          height: 40px;
          font-size: 14px;
        }
      }
      .item {
        min-height: 40px;
        line-height: 40px;
        position: relative;
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
          border-bottom-width: 1px;
        }
        &:last-child {
          &::before {
            display: none;
          }
        }
        &.required {
          label {
            position: relative;
            &::after {
              content: '*';
              padding-left: 2px;
              font-size: 12px;
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
        .or {
          span {
            width: 47px;
            font-size: 14px;
            display: inline-block;
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
        label {
          color: #333;
          width: 95px;
          height: 40px;
          line-height: 40px;
          display: inline-block;
          font-size: 14px;
          text-align: left;
          padding: 2px 0;
        }
        .input-item {
          color: #333;
          font-size: 14px;
          height: 44px;
          line-height: 44px;
          display: inline-block;
          min-height: 44px;
          width: 280px;
          margin-left: 10px;
          position: relative;
          border: none;
          background-color: transparent;
        }
        .placeholder {
          font-size: 14px;
          display: inline-block;
          color: #333;
          display: flex;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 19px;
          padding-bottom: 10px;
          padding-right: 10px;
          span {
            align-self: center;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            white-space: pre-line;
          }
          .default-text {
            color: #999;
          }
        }
      }
    }
  }
}
.textarea {
  display: block !important;
  &:after {
    top: 62%;
  }
}
</style>
