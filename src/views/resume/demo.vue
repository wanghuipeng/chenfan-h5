<template>
  <div class="demo">
    <button @click="toMyResume">我的简历</button>
  </div>
</template>

<script>
import { getCurrentUserInfo, getDict } from '@/api/commonApi'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      renderUserInfo: state => state.global.userInfo
    })
  },
  mounted() {
    this.getDict()
    this.getCurrentUserInfo()
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
    toMyResume() {
      if (this.renderUserInfo.resumeIntegrity) {
        this.$router.push({ name: 'resume' })
      } else {
        this.$router.push({ name: 'baseInfo', params: { type: 'add' } })
      }
    }
  }
}
</script>
