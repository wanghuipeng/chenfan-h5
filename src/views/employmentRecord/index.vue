<template>
  <div class="employmentRecord">
    <van-tabs
      v-model="active"
      sticky
      swipeable
      animated
      title-active-color="#1678F9"
      color="#1678F9"
      @change="changeTab"
    >
      <van-tab v-for="items in tabs" :key="items.value" :title="items.title" :name="items.value">
        <van-pull-refresh v-model="pullLoading" @refresh="onPullRefresh">
          <!-- 列表数据 -->
          <van-list
            v-model="listLoading"
            :finished="listFinished"
            finished-text=""
            @load="searchList"
          >
            <div v-if="dataTableObj.list.length > 0" class="records van-hairline--top">
              <div
                v-for="(item, index) in dataTableObj.list"
                :key="index"
                class="item"
                @tap="toNextPage('position/children/detail',{hhId: item.hhId,positionId: item.positionId})"
              >
                <p class="title">
                  <span>{{ item.positionTitle }}</span>
                  <span v-if="item.statusNo === 4" class="salary" style="color: #666666;">停止招聘</span>
                  <template v-else>
                    <span v-if="item.salaryType === 1" class="salary">
                      <template v-if="item.salaryStart === item.salaryEnd">
                        {{ item.salaryStart/10000 }}万/年
                      </template>
                      <template v-else>
                        {{ item.salaryStart/10000 }}-{{ item.salaryEnd/10000 }}万/年
                      </template>
                    </span>
                    <span v-else-if="item.salaryType === 2" class="salary">
                      <span v-if="item.monthlySalaryRegime">
                        <template v-if="item.salaryStart === item.salaryEnd">
                          {{ item.salaryStart/1000 }}K*{{ item.monthlySalaryRegime }}薪
                        </template>
                        <template v-else>
                          {{ item.salaryStart/1000 }}-{{ item.salaryEnd/1000 }}K*{{ item.monthlySalaryRegime }}薪
                        </template>
                      </span>
                      <span v-else>
                        <template v-if="item.salaryStart === item.salaryEnd">
                          {{ item.salaryStart/1000 }}K/月
                        </template>
                        <template v-else>
                          {{ item.salaryStart/1000 }}-{{ item.salaryEnd/1000 }}K/月
                        </template>
                      </span>
                    </span>
                    <span v-else-if="item.salaryType === 3" class="salary">
                      <span v-if="item.salaryStart === item.salaryEnd">{{ item.salaryStart }}元/天</span>
                      <span v-else>{{ item.salaryStart }}-{{ item.salaryEnd }}元/天</span>
                    </span>
                    <span v-else-if="item.salaryType === 4" class="salary">
                      <span v-if="item.salaryStart === item.salaryEnd">{{ item.salaryStart }}元/时</span>
                      <span v-else>{{ item.salaryStart }}-{{ item.salaryEnd }}元/时</span>
                    </span>
                    <span v-else-if="item.salaryType === 5" class="salary">面议</span>
                  </template>
                </p>
                <p class="company">{{ item.companyName }}</p>
                <div class="info">
                  <img v-if="item.hhAvatarUrlImg" :src="item.hhAvatarUrlImg" />
                  <img v-else src="@/assets/images/common/avatar_unknown.png" />
                  <p v-if="item.hhName">招聘官 · {{ item.hhName }}</p>
                </div>
                <div class="type van-hairline--top">
                  <p class="date">{{ item.applyTime }} 投递</p>
                  <p v-if="statusNo === '10'" class="tag van-hairline--surround">待查看</p>
                  <p v-if="statusNo === '11'" class="tag van-hairline--surround">待反馈</p>
                  <p v-if="statusNo === '12'" class="tag van-hairline--surround">已推荐</p>
                  <p v-if="statusNo === '13'" class="tag van-hairline--surround">不合适</p>
                </div>
              </div>
              <p class="total">共{{ dataTableObj.total }}条投递记录</p>
            </div>
          </van-list>
          <van-empty
            v-if="listFinished && !dataTableObj.list.length"
            :image="empty"
            description="您还没有任何求职记录~"
          />
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getShareApplyList } from '@/api/employmentRecord'
export default {
  data() {
    return {
      active: 0,
      tabs: [
        { title: '待查看', value: 10 },
        { title: '待反馈', value: 11 },
        { title: '已推荐', value: 12 },
        { title: '不合适', value: 13 }
      ],
      // 表格对象
      dataTableObj: {
        currPage: 1,
        pageSize: 10,
        total: 0,
        list: []
      },
      statusNo: 10,
      empty: require('@/assets/images/employmentRecord/empty.png'),
      // 列表滚动loading
      listLoading: false,
      // 列表是否加载完
      listFinished: false,
      // 下拉刷新loading
      pullLoading: false
    }
  },
  methods: {
    // tab切换
    changeTab(e) {
      this.statusNo = e
      this.dataTableObj.currPage = 1
      this.searchList()
    },
    // 查询列表
    searchList() {
      const para = {
        pageNumber: this.dataTableObj.currPage++,
        pageSize: this.dataTableObj.pageSize,
        statusNo: this.statusNo
      }
      getShareApplyList(para).then(res => {
        this.listLoading = false
        if (res.data.records) {
          let list = []
          if (para.pageNumber === 1) {
            list = res.data.records
          } else {
            list = this.dataTableObj.list.concat(res.data.records)
          }
          this.dataTableObj.list = list
          this.dataTableObj.total = res.data.total
        }
        // 数据全部加载完成
        if (this.dataTableObj.total === this.dataTableObj.list.length) {
          this.listFinished = true;
        }
      })
    },
    // 下拉刷新方法
    onPullRefresh() {
      this.dataTableObj.currPage = 1;
      this.searchList()
      // 停止下拉刷新
      this.pullLoading = false;
    }
  }
}
</script>

<style lang="less" scoped>
.employmentRecord {
  height: 100%;
  background: #F4F6F9;
  .records {
    .item {
      padding: 20px 16px 12px;
      margin-bottom: 6px;
      background: #ffffff;
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 600;
        color: #1a1a1a;
        line-height: 22px;
        .salary {
          font-size: 16px;
          color: #ea2b3f;
          line-height: 22px;
        }
      }
      .company {
        font-size: 12px;
        color: #999999;
        line-height: 17px;
        margin-top: 4px;
      }
      .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 12px;
        color: #14171a;
        line-height: 17px;
        margin: 16px 0;
        img {
          width: 24px;
          height: 24px;
          margin-right: 12px;
          border-radius: 14px;
        }
      }
      .type {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 16px;
        .date {
          font-size: 11px;
          color: #999999;
          line-height: 16px;
        }
        .tag {
          font-size: 12px;
          color: #1678F9;
          line-height: 17px;
          border-radius: 3px;
          padding: 1px 3px;
          margin-left: auto;
          &::after {
            border-color: #1678F9;
          }
        }
      }
    }
    .total {
      font-size: 12px;
      color:#999999;
      line-height: 17px;
      text-align: center;
      padding: 20px 0;
    }
  }
  .van-empty {
    padding: 100px 0;
  }
}
</style>
