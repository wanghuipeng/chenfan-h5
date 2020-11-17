<template>
  <div class="work-exp">
    <div class="main">
      <div class="form mb-6">
        <div class="item required">
          <label>语种</label>
          <input type="text" v-model="eduDetail.languages" class="input-item" placeholder="请输入" />
        </div>
        <div class="item arrow required">
          <label>口语能力</label>
          <van-field
            @click="showPickerSpeak = true"
            readonly
            clickable
            :value="speakText"
            placeholder="请选择口语能力"
          />
          <van-popup v-model="showPickerSpeak" position="bottom" @click="showPickerSpeak = false">
            <van-picker
              show-toolbar
              :default-index="speakIndex"
              :columns="speakArr"
              :value-key="'label'"
              @cancel="showPickerSpeak = false"
              @confirm="onConfirmSpeak"
            />
          </van-popup>
        </div>
        <div class="item arrow required">
          <label>书写能力</label>
          <van-field
            @click="showPickerWrite = true"
            readonly
            clickable
            :value="writeText"
            placeholder="请选择书写能力"
          />
          <van-popup v-model="showPickerWrite" position="bottom" @click="showPickerWrite = false">
            <van-picker
              show-toolbar
              :default-index="writeIndex"
              :columns="writeArr"
              :value-key="'label'"
              @cancel="showPickerWrite = false"
              @confirm="onConfirmwrite"
            />
          </van-popup>
        </div>
        <div class="item">
          <label>等级</label>
          <input type="text" v-model="eduDetail.level" class="input-item" placeholder="请输入" />
        </div>
      </div>
      <p class="save-btn" @click="saveIt">保存</p>
      <p class="del-btn" @click="delIt" v-if="type === 'edit'">删除</p>
    </div>
  </div>
</template>

<script>
import {
  addResumeLanguages,
  editResumeLanguages,
  deleteResumeLanguages
} from '@/api/resumeApi'
import { Toast } from 'vant'

export default {
  computed: {
    dictData() {
      return this.$store.state.global.dictData
    }
  },
  data() {
    return {
      type: null,
      title: null,
      showPickerSpeak: false,
      speakIndex: null,
      speakText: null,
      speakArr: [],
      showPickerWrite: false,
      writeIndex: null,
      writeText: null,
      writeArr: [],
      eduDetail: {}
    }
  },
  activated() {
    let options = this.$route.params
    if (options.type) {
      this.type = options.type
    }
    if (options.detail) {
      // 技能证书
      this.eduDetail = JSON.parse(options.detail)
      this.$set(this.eduDetail, 'resumeId', this.eduDetail.resumeId)
    }
    if (this.type === 'add') {
      document.title = '添加语言能力'
    } else if (this.type === 'edit') {
      document.title = '编辑语言能力'
      // 语言能力
      console.log('语言能力', options.detail)
      this.eduDetail = JSON.parse(options.detail)

      console.log('语言能力详情', this.eduDetail)
      // 口语能力
      this.speakArr.filter(item => {
        if (item.value === this.eduDetail.listeningSpeakingSkills) {
          this.speakText = item.label
        }
      })
      // 书写能力
      this.speakArr.filter(item => {
        if (item.value === this.eduDetail.readingWritingSkills) {
          this.writeText = item.label
        }
      })
    }
  },
  mounted(options) {
    // 口语能力
    this.speakArr = this.dictData.dicts.readListenSkills
    this.speakArr &&
      this.speakArr.filter(item => {
        delete item.children
      })
    // 书写能力
    this.writeArr = this.dictData.dicts.readListenSkills
    this.writeArr &&
      this.writeArr.filter(item => {
        delete item.children
      })
  },
  onUnload() {
    this.speakIndex = null
    this.speakText = null
    this.writeIndex = null
    this.writeText = null
  },
  methods: {
    // 口语能力
    onConfirmSpeak(e) {
      console.log(e)
      this.speakText = e.label
      this.$set(this.eduDetail, 'listeningSpeakingSkills', e.value)
    },
    // 书写能力
    onConfirmwrite(e) {
      console.log(e)
      this.writeText = e.label
      this.$set(this.eduDetail, 'readingWritingSkills', e.value)
    },
    // 添加语言能力
    addResumeLanguages() {
      Toast.loading({ forbidClick: true })
      let params = this.eduDetail
      console.log('params', params)
      addResumeLanguages(params).then(res => {
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
    // 编辑语言能力
    editResumeLanguages() {
      Toast.loading({ forbidClick: true })
      let params = this.eduDetail
      editResumeLanguages(params).then(res => {
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
    // 删除语言能力
    deleteResumeLanguages() {
      Toast.loading({ forbidClick: true })
      let { resumeId, id } = this.eduDetail
      let params = {
        resumeId,
        resumeLanguagesId: id
      }
      deleteResumeLanguages(params).then(res => {
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
      this.eduDetail = {
        resumeId: this.eduDetail.resumeId
      }
      this.$set(this.eduDetail, 'resumeId', this.eduDetail.resumeId)
      this.speakIndex = null
      this.speakText = null
      this.writeIndex = null
      this.writeText = null
      this.$store.dispatch('updateTextarea', {})
    },
    // 保存
    saveIt() {
      let params = this.eduDetail
      console.log(params, this.type)
      if (!params.languages) {
        this.$toast('请输入语种')
      } else if (!params.listeningSpeakingSkills) {
        this.$toast('请选择口语能力')
      } else if (this.readingWritingSkills) {
        this.$toast('请选择书写能力')
      } else {
        if (this.type === 'add') {
          console.log('新建')
          this.addResumeLanguages()
        } else if (this.type === 'edit') {
          console.log('编辑')
          this.editResumeLanguages()
        }
      }
    },
    // 删除
    delIt() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除语言能力？',
          asyncClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.deleteResumeLanguages()
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
          background: transparent;
          border: none;
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
