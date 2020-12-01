<template>
  <div class="login-page">
    <header>
      <p>辰帆员工自助平台</p>
    </header>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        center
        clearable
        type="tel"
        placeholder="手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="imgSms"
        center
        clearable
        placeholder="图形验证码"
        :rules="[{ required: true, message: '请输入右侧图形验证码' }]"
      >
        <template #button>
          <p class="code-img">
            <img :src="srcName" @click="getImageCode" />
          </p>
        </template>
      </van-field>
      <van-field
        v-model="sms"
        center
        clearable
        placeholder="短信验证码"
        :rules="[{ required: true, message: '请输入短信验证码' }]"
      >
        <template #button>
          <van-button
            v-show="sendAuthCode"
            size="small"
            type="primary"
            class="default-btn ghost send-btn"
            @click="sendVeriCode"
            >{{ flag ? "发送验证码" : "重新获取" }}</van-button
          >
          <van-button
            v-show="!sendAuthCode"
            size="small"
            type="primary"
            class="default-btn ghost send-btn"
            disabled
            ><span>{{ authTime }}</span
            >秒后重新获取</van-button
          >
        </template>
      </van-field>
      <div class="btn-footer">
        <van-button
          class="default-btn"
          block
          native-type="submit"
          :loading="btnLoading"
          loading-text="注册账号"
          >注册账号</van-button
        >
      </div>
    </van-form>
    <van-loading size="34" v-if="vanLoading" class="fixed-loading" />
  </div>
</template>

<script>
import { sendVeriCode } from "@/api/loginApi";

export default {
  components: {},
  data() {
    return {
      vanLoading: false,
      btnLoading: false,
      phone: "",
      imgSms: "",
      sms: "",
      srcName: "",
      sendAuthCode: true,
      flag: 1,
      authTime: 0,
    };
  },
  created() {
    this.getImageCode();
  },
  methods: {
    // 注册
    onSubmit(values) {
      setTimeout(() => {
        this.btnLoading = false;
        console.log("submit", values);
      }, 500);
    },
    // 获取图形验证码
    getImageCode() {
      let t = new Date().getTime();
      this.srcName =
        "http://c.hhd.dalie.zpstar.com" + `/api/basic/imageVeriCode?t=${t}`;
    },
    // 获取验证码
    sendVeriCode() {
      let { phone: mobile, imgSms: imageVeriCode } = this;
      let params = {
        mobile,
        imageVeriCode,
        pageCode: "businessRegister",
      };
      this.flag = 0;
      this.sendAuthCode = false;
      this.authTime = 60;
      let authTimetimer = setInterval(() => {
        this.authTime--;
        if (this.authTime <= 0) {
          this.sendAuthCode = true;
          clearInterval(authTimetimer);
        }
      }, 1000);
      this.$toast("验证码发送成功");
      sendVeriCode(params).then((res) => {
        const { success, data } = res;
        if (success) {
          this.flag = 0;
          this.sendAuthCode = false;
          this.authTime = 30;
          let authTimetimer = setInterval(() => {
            this.authTime--;
            if (this.authTime <= 0) {
              this.sendAuthCode = true;
              clearInterval(authTimetimer);
            }
          }, 1000);
          this.$toast("验证码发送成功");
        } else {
          this.$toast(res.message);
        }
      });
    },
  },
};
</script>
<style lang="less">
@import "~@/assets/less/login.less";
</style>

