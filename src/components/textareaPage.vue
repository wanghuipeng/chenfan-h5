<template>
  <div class="textarea-page">
    <div class="main">
      <div class="title">
        <h1>{{ label }}</h1>
        <p>简要说明{{ label }}或其他信息</p>
      </div>
      <van-field
        v-model="message"
        autosize
        type="textarea"
        maxlength="2000"
        :border="false"
        placeholder="请输入内容"
        show-word-limit
        @input="changeIt"
      />
    </div>
    <div class="footer-fixed">
      <span @click="saveIt">保存</span>
    </div>
    <van-loading v-if="showLoading" size="24" />
  </div>
</template>

<script>
import { editResumePerson } from '@/api/resumeApi'

export default {
  data() {
    return {
      showLoading: false,
      message: null,
      label: null, // 标题
      objLabel: null, // flag
      resumeId: null
    }
  },
  mounted() {
    const options = this.$route.params
    this.label = options.textareaTitle
    document.title = '填写' + options.textareaTitle
    this.message = options.message === 'null' ? '' : options.message // 文本内容
    this.objLabel = options.label // 标题名
    if (options.label === 'personal' && options.resumeId) {
      this.resumeId = options.resumeId
    }
    console.log(options.baseInfo)
  },
  methods: {
    changeIt(e) {
      this.message = e
    },
    saveIt() {
      if (this.objLabel === 'personal') {
        if (!this.message) {
          this.$toast('请输入自我介绍')
        } else {
          this.editResumePerson()
        }
      } else {
        this.$router.go(-1)
        this.$store.dispatch('updateTextarea', {
          value: this.message, // 文本内容
          label: this.objLabel // 字段名
        })
      }
    },
    // 编辑基本信息
    editResumePerson() {
      this.showLoading = true
      const params = {
        id: this.resumeId,
        personal: this.message
      }
      console.log('params', params)
      editResumePerson(params).then(res => {
        this.showLoading = false
        console.log(res)
        if (res) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.textarea-page {
  /deep/ .van-field__input--textarea {
    min-height: 200px;
    padding: 5px 0;
  }
  /deep/ .van-cell {
    display: block;
    font-size: 14px;
  }
  /deep/ .van-cell__title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  /deep/ .van-field__input--textarea {
    max-height: 240px;
    line-height: 20px;
    font-size: 14px;
    color: #333;
  }
  .main {
    position: relative;
    .title {
      padding: 20px 20px 10px 20px;
      h1 {
        font-size: 18px;
        color: #14171a;
        font-weight: bold;
        margin-bottom: 4px;
      }
      p {
        color: #666666;
        font-size: 11px;
      }
    }
  }
  .footer-fixed {
    z-index: 10;
    background: #fff;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    span {
      width: 335px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #1678f9;
      font-size: 16px;
      border-radius: 20px;
      display: inline-block;
      margin: 0 auto;
    }
  }
}
</style>
