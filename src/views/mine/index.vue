<template>
  <div class="mine-page">
    <div class="card">
      <img v-if="renderUserInfo.avatarUrl" :src="renderUserInfo.avatarUrl" />
      <img v-else-if="renderUserInfo.gender === 1" src="~@/assets/images/common/avatar_man.png" />
      <img v-else-if="renderUserInfo.gender === 2" src="~@/assets/images/common/avatar_woman.png" />
      <img v-else src="~@/assets/images/common/avatar_unknown.png" />
      <p>{{ renderUserInfo.trueName || renderUserInfo.nickName }}</p>
    </div>
    <div class="list">
      <van-cell is-link icon="resume" :to="nextRoute" class="resume-item">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-circle
            :value="renderUserInfo.resumeIntegrity"
            :text="'完整度' + (renderUserInfo.resumeIntegrity || 0) + '%'"
            color="#F95616"
            layer-color="#FFDCCF"
            size="12px"
          />
          <span class="custom-title">我的简历</span>
        </template>
      </van-cell>
      <van-cell title="求职记录" icon="apply" is-link to="employmentRecord" />
      <van-cell title="我的推荐" icon="recommend" is-link to="recommendRecord" />
    </div>
  </div>
</template>

<script>
import { getCurrentUserInfo, getDict } from '@/api/commonApi'
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      renderUserInfo: state => state.global.userInfo
    }),
    nextRoute: function() {
      return this.renderUserInfo.resumeIntegrity ? 'resume' : 'baseInfo'
    }
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
        if (res && res.success) {
          this.$store.dispatch('updateUserInfo', res.data)
        }
      })
    }
  }
}
</script>
<style lang="less" >
.mine-page {
  .card {
    height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url('~@/assets/images/mine/banner.png') no-repeat;
    background-size: 100%;
    background-attachment: scroll;
    // background-clip: border-box; // 背景延伸到边框外沿（但是在边框之下）
    // background-clip: padding-box; // 边框下面没有背景，即背景延伸到内边距外沿。
    // background-clip: content-box; // 背景裁剪到内容区 (content-box) 外沿。
    p {
      font-size: 18px;
      margin-top: 12px;
      color: #fff;
      font-weight: 600;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      border: 1px solid #fff;
      transition: all 0.2s ease-in-out 0s;
      object-fit: cover;
    }
  }
  .list {
    .resume-item {
      .van-circle {
        position: absolute;
        right: 75px;
        top: 8px;
        .van-circle__text {
          width: 110px;
        }
      }
    }
    .van-icon {
      &::before {
        content: '';
        width: 20px;
        height: 20px;
        display: inline-block;
      }
      &.van-icon-resume {
        &::before {
          background: url('~@/assets/images/mine/resume.png') no-repeat;
          background-size: 20px;
        }
      }
      &.van-icon-apply {
        &::before {
          background: url('~@/assets/images/mine/apply.png') no-repeat;
          background-size: 20px;
        }
      }
      &.van-icon-recommend {
        &::before {
          background: url('~@/assets/images/mine/recommend.png') no-repeat;
          background-size: 20px;
        }
      }
    }
    .van-cell {
      padding: 20px 16px;
      color: #333;
      font-size: 16px;
      &::after {
        display: none;
      }
      .van-cell__left-icon {
        margin-right: 10px;
      }
      .van-icon-arrow::before {
        content: '';
        width: 12px;
        height: 12px;
        display: inline-block;
        background: url('~@/assets/images/resume/arrow_gray.png') no-repeat;
        background-size: 12px;
      }
      .van-cell__title {
        position: relative;
        &:after {
          position: absolute;
          box-sizing: border-box;
          content: ' ';
          pointer-events: none;
          bottom: 0;
          left: 0;
          border-bottom: 1px solid #e6e6e6;
          -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
          bottom: -20px;
          width: 306px;
        }
      }
      &:last-child {
        .van-cell__title {
          &:after {
            border-bottom: none;
          }
        }
      }
      &:first-child {
        padding-top: 28px;
      }
    }
  }
}
</style>
