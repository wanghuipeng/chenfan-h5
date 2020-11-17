<template>
  <div class="login">
    <p class="tips">为了确保您的服务质量，下单前需要确认您的联系信息</p>
    <p class="field van-hairline--surround">
      <input
        v-model="username"
        placeholder="您的姓名"
      />
    </p>
    <p class="field van-hairline--surround">
      <input
        v-model="phone"
        placeholder="您的手机号"
        maxlength="11"
      />
    </p>
    <p class="field code van-hairline--surround">
      <input
        v-model="code"
        placeholder="请输入验证码"
      />
      <span @click="!disabled && initGeet()">{{ text }}</span>
    </p>
    <p class="btn" @click="login">完成</p>
  </div>
</template>

<script>
import { sendSmsVerificationMessage, smsLoginBind } from '@/api/loginApi'
import geetestMixin from '@/mixins/geetest'
export default {
  mixins: [geetestMixin],
  data() {
    return {
      username: '',
      phone: '',
      code: '',
      text: '获取验证码',
      disabled: false
    }
  },
  methods: {
    // 极验初始化
    initGeet() {
      if (!this.phone) {
        this.$toast({
          message: '请输入手机号',
          closeOnClick: true,
          position: 'bottom'
        })
        return
      } else if (!this.$verify.phoneFormat(this.phone)) {
        this.$toast({
          message: '手机号码格式不正确',
          closeOnClick: true,
          position: 'bottom'
        })
        return
      }
      this.init();
      this.disabled = true;
    },
    // 验证码
    getMobileCaptcha(data) {
      const params = {
        mobile: this.phone,
        geetest_challenge: data.geetest_challenge,
        geetest_validate: data.geetest_validate,
        geetest_seccode: data.geetest_seccode
      }
      console.log('极验', params)
      sendSmsVerificationMessage(params).then(res => {
        console.log(res)
        this.text = `60秒`;
        let index = 60;
        this.disabled = true;
        const Timer = setInterval(() => {
          if (index > 0) {
            index--;
            this.text = `${index}秒`;
          } else {
            this.disabled = false;
            this.text = `获取验证码`;
            clearInterval(Timer);
          }
        }, 1000)
      })
    },
    // 登录
    login() {
      if (!this.username) {
        this.$toast({
          message: '请输入姓名',
          closeOnClick: true,
          position: 'bottom'
        })
        return
      } else if (!this.phone) {
        this.$toast({
          message: '请输入手机号',
          closeOnClick: true,
          position: 'bottom'
        })
        return
      } else if (!this.$verify.phoneFormat(this.phone)) {
        this.$toast({
          message: '手机号码格式不正确',
          closeOnClick: true,
          position: 'bottom'
        })
        return
      } else if (!this.code) {
        this.$toast({
          message: '请输入验证码',
          closeOnClick: true,
          position: 'bottom'
        })
        return
      }
      const params = {
        mobile: this.phone,
        name: this.username,
        mobileCaptcha: this.code
      }
      smsLoginBind(params).then(res => {
        if (res.code === '000000') {
          this.$router.replace('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  padding: 8px 16px;
  box-sizing: border-box;
  .tips {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    padding: 20px 0;
  }
  .field {
    padding: 12px;
    margin-bottom: 12px;
    box-sizing: border-box;
    input {
      width: 100%;
      font-size: 14px;
      line-height: 20px;
      border: none;
    }
  }
  .code {
    display: flex;
    flex-direction: row;
    align-items: center;
    input {
      flex: 1;
    }
    span {
      width: 70px;
      font-size: 14px;
      color: #FF5D00;
      text-align: center;
      line-height: 20px;
      padding-left: 11px;
      position: relative;
      &::after {
        content: '';
        width: 1px;
        height: 16px;
        border-left: 1px solid #CDCDCD;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .btn {
    height: 42px;
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    line-height: 42px;
    background: linear-gradient(135deg,rgba(255,115,0,1) 0%,rgba(255,93,0,1) 100%);
    border-radius:21px;
    margin-top: 28px;
  }
}
</style>
