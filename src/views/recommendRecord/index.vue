<template>
  <div class="recommend-record">
    <div class="main">
      <div v-if="isLoading">
        <ul v-if="listData.length > 0" class="list">
          <li v-for="(item,index) in listData" :key="index">
            <img v-if="item.avatarUrlImg" :src="item.avatarUrlImg" />
            <img v-else-if="item.gender === 1" src="~@/assets/images/common/avatar_man.png" />
            <img v-else-if="item.gender === 2" src="~@/assets/images/common/avatar_woman.png" />
            <img v-else src="~@/assets/images/common/avatar_unknown.png" />
            <div class="right">
              <p>
                <span class="name">{{ item.name }}</span>
                <span class="label">招聘官: {{ item.hhUserName }}</span>
              </p>
              <p v-if="item.applyUserType === 1">
                <span
                  class="time"
                >{{ item.applyTime }} 投递了你分享的职位「{{ item.positionTitle }}-{{ item.companyName }}」</span>
              </p>
              <p v-if="item.applyUserType === 2">
                <span
                  class="time"
                >{{ item.applyTime }} 被你推荐到职位「{{ item.positionTitle }}-{{ item.companyName }}」</span>
              </p>
            </div>
          </li>
        </ul>
        <!-- 加载中 -->
        <div v-if="noMore" class="list-loading-text">
          <img src="~@/assets/images/common/loading_detail.gif" />加载中...
        </div>
        <!-- 空列表 -->
        <div v-if="listData.length === 0" class="empty">
          <img src="~@/assets/images/employmentRecord/empty.png" />
          <p>你还没有任何推荐记录</p>
        </div>
        <div v-if="listData.length > 0" class="divider">共{{ total }}条推荐记录</div>
      </div>
      <!-- 骨架屏 -->
      <div v-else>
        <ul v-for="i in 5" :key="i" class="skeleton skeleton-animate">
          <li>
            <p class="title">
              <span></span>
              <span class="salary"></span>
            </p>
            <p class="company"></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getInformantClueList } from '@/api/recommendRecordApi'
import { filterDates } from '@/utils/common'

export default {
  data() {
    return {
      isLoading: false,
      pageNumber: 1,
      total: 0,
      pageSize: 10,
      listData: null,
      noMore: false
    }
  },
  mounted() {
    this.getInformantClueList()
  },
  onUnload() {
    this.listData = []
  },
  methods: {
    getInformantClueList() {
      this.noMore = true
      const { pageNumber, pageSize } = this
      const params = {
        pageNumber,
        pageSize
      }
      getInformantClueList(params).then(res => {
        this.isLoading = true
        this.noMore = false
        const { data, success, message } = res
        if (success) {
          console.log(res)
          this.listData = Array.isArray(this.listData)
            ? this.listData.concat(data.records)
            : data.records
          this.listData.length > 0 &&
            this.listData.filter(item => {
              if (item.applyTime && item.applyTime.split(' ').length === 2) {
                item.applyTime =
                  item.applyTime &&
                  item.applyTime.split(' ').length === 2 &&
                  item.applyTime &&
                  filterDates(item.applyTime)
              }
            })
          console.log(1111, this.listData, Array.isArray(this.listData))
          this.total = data.total
        } else {
          this.$toast(message)
        }
      })
    }
  },
  // 上拉加载，拉到底部触发
  onReachBottom() {
    console.log('到达底部', this.total, this.listData.length)
    if (this.total !== this.listData.length) {
      this.pageNumber++
      this.getInformantClueList()
    }
  }
}
</script>

<style lang="less" scoped>
.skeleton {
  padding: 20px 16px 12px;
  margin-bottom: 6px;
  background: #ffffff;
  .title {
    width: 200px;
    height: 22px;
    background: #f2f3f5;
    padding-top: 5px;
  }
  .company {
    height: 17px;
    background: #f2f3f5;
    margin: 8px 0 20px;
  }
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      border-radius: 14px;
      margin: 16px 0;
    }
    p {
      width: 100px;
      height: 12px;
      background: #f2f3f5;
      margin-left: 12px;
    }
    .date {
      height: 11px;
      background: #f2f3f5;
      margin-left: auto;
    }
  }
}
.empty {
  font-size: 12px;
  color: #333333;
  line-height: 17px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 134px;
    height: 90px;
    margin-bottom: 60px;
  }
}
.main {
  .divider {
    padding-top: 12px;
    padding-bottom: 15px;
    color: #999999;
    font-size: 14px;
    position: relative;
    width: 100%;
    text-align: center;
    &::before {
      content: '';
      width: 48px;
      height: 1px;
      display: inline-block;
      background: #999999;
      vertical-align: 4px;
      margin-right: 8px;
    }
    &::after {
      content: '';
      width: 48px;
      height: 1px;
      display: inline-block;
      background: #999999;
      vertical-align: 4px;
      margin-left: 8px;
    }
  }
  .list {
    padding: 14px 20px;
    li {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 14px 0;
      &:last-child {
        padding-bottom: 0;
      }
    }
    img {
      width: 40px;
      height: 40px;
      margin-right: 16px;
      border-radius: 100%;
    }
    .right {
      width: 280px;
      p:first-child {
        display: flex;
        justify-content: space-between;
        .name {
          color: #14171a;
          font-size: 14px;
          font-weight: 600;
          max-width: 120px;
          white-space: nowrap;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
        .label {
          color: #1678f9;
          border: 1px solid #1678f9;
          border-radius: 1px;
          padding: 0px 4px;
          box-sizing: border-box;
          text-align: center;
          max-width: 140px;
          white-space: nowrap;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          vertical-align: middle;
          font-size: 11px;
        }
      }
      p:last-child {
        .time {
          color: #999999;
          font-size: 12px;
        }
        .name {
          color: #333333;
          font-size: 12px;
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
