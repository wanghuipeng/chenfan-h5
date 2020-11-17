<template>
  <div class="job-intent">
    <div class="main">
      <div class="form mb-6">
        <div class="item arrow required">
          <label>求职状态</label>
          <van-field
            readonly
            clickable
            :value="jobStatusText"
            placeholder="请选择状态"
            @click="showPickerJobStatus = true"
          />
          <van-popup
            v-model="showPickerJobStatus"
            position="bottom"
            @click="showPickerJobStatus = false"
          >
            <van-picker
              show-toolbar
              :default-index="jobStatusIndex"
              :columns="jobStatusArr"
              :value-key="'label'"
              @cancel="showPickerJobStatus = false"
              @confirm="onConfirmJobStatus"
            />
          </van-popup>
        </div>
      </div>
      <div class="form">
        <div class="item required">
          <label>期望职位</label>
          <input
            v-model="resumeDetail.intentionPosition"
            type="text"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item arrow required">
          <label>期望地点</label>
          <van-field
            readonly
            clickable
            :value="cityText"
            placeholder="请选择期望地点"
            placeholder-style="color: #999999;"
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
        <div class="item arrow">
          <label>期望薪资</label>
          <van-field
            readonly
            clickable
            :value="salaryText"
            placeholder="请选择期望薪资"
            @click="showPickerSalary = true"
          />
          <van-popup v-model="showPickerSalary" position="bottom" @click="showPickerSalary = false">
            <van-picker
              show-toolbar
              :default-index="salaryIndex"
              :columns="salaryArr"
              :value-key="'label'"
              @cancel="showPickerSalary = false"
              @change="handleChangeSalary"
              @confirm="onConfirmSalary"
            />
          </van-popup>
        </div>
        <div class="item arrow">
          <label>期望行业</label>
          <div class="placeholder" @click="toIndustryPage">
            <span v-if="checkedArr.length > 0">
              <span v-for="(item,index) in checkedArr" :key="index">
                {{ item.label }}
                <template v-if="index < checkedArr.length - 1">，</template>
              </span>
            </span>
            <span v-else class="default-text">请选择</span>
          </div>
        </div>
      </div>
      <p class="save-btn" @click="saveIt">保存</p>
    </div>
  </div>
</template>

<script>
import { editResumeJobIntention } from '@/api/resumeApi'

export default {
  data() {
    return {
      showPickerJobStatus: false,
      jobStatusText: null,
      jobStatusIndex: null,
      jobStatusArr: [],
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
      industryArr: [],
      showPickerSalary: false,
      salaryText: null,
      salaryIndex: null,
      salaryArr: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        },
        {
          values: [],
          className: 'column3',
          defaultIndex: 11
        }
      ],
      checkedArr: [],
      resumeDetail: {} // 求职意向
    }
  },
  computed: {
    dictData() {
      return this.$store.state.global.dictData
    }
  },
  activated() {
    const checkedArr =
      localStorage.getItem('industryArr') &&
      JSON.parse(localStorage.getItem('industryArr'))
    this.checkedArr = checkedArr
    if (checkedArr && checkedArr.length > 0) {
      this.checkedArr = checkedArr
      const intentionIndustryId2 = []
      this.checkedArr.filter(item => {
        intentionIndustryId2.push(item.value)
      })
      this.$set(
        this.resumeDetail,
        'intentionIndustryId2',
        intentionIndustryId2 && intentionIndustryId2.join(',')
      )
    }
  },
  onShow() {
    // 然后在onshow里面
    // const pages = getCurrentPages()
    // const currPage = pages[pages.length - 1] // 当前页
    // console.log('参数', currPage.data)
    // if (currPage.data.query) {
    //   this.checkedArr = currPage.data.query
    //   const intentionIndustryId2 = []
    //   this.checkedArr.filter(item => {
    //     intentionIndustryId2.push(item.value)
    //   })
    //   console.log(
    //     currPage.data.query,
    //     intentionIndustryId2 && intentionIndustryId2.join(',')
    //   )
    //   this.$set(
    //     this.resumeDetail,
    //     'intentionIndustryId2',
    //     intentionIndustryId2 && intentionIndustryId2.join(',')
    //   )
    // }
  },
  mounted() {
    if (
      this.$route.params.checkedArr &&
      this.$route.params.checkedArr.length > 0
    ) {
      this.checkedArr = this.$route.params.checkedArr
      const intentionIndustryId2 = []
      this.checkedArr.filter(item => {
        intentionIndustryId2.push(item.value)
      })
      console.log(
        this.$route.params.checkedArr,
        intentionIndustryId2 && intentionIndustryId2.join(',')
      )
      this.$set(
        this.resumeDetail,
        'intentionIndustryId2',
        intentionIndustryId2 && intentionIndustryId2.join(',')
      )
    }
    // 数据初始化
    // 求职状态
    this.jobStatusArr = this.dictData.dicts.jobStatus
    this.jobStatusArr &&
      this.jobStatusArr.filter(item => {
        delete item.children
      })
    // 期望行业
    this.industryArr = this.dictData.industry
    // 期望地点
    this.areasData = this.dictData.areas
    this.areasArr[0].values = this.dictData.areas
    this.areasArr[1].values = this.dictData.areas[0].children
    // 期望薪资
    this.salaryArr[0].values = []
    const arr1 = []
    for (let i = 1; i <= 30; i++) {
      arr1.push(i)
    }
    const arr2 = []
    for (let i = 1; i <= 14; i++) {
      arr2.push(30 + 5 * i)
    }
    const arr3 = []
    for (let i = 1; i <= 40; i++) {
      arr3.push(100 + 10 * i)
    }
    const arr = this.salaryArr[0].values.concat(arr1, arr2, arr3)
    arr &&
      arr.filter(item => {
        this.salaryArr[0].values.push({
          label: item + 'k',
          value: item
        })
      })
    arr &&
      arr.filter(item => {
        this.salaryArr[1].values.push({
          label: item + 'k',
          value: item
        })
      })
    this.salaryArr[1].values.splice(0, 1)
    for (let i = 1; i < 100; i++) {
      this.salaryArr[2].values.push({
        label: i + '月',
        value: i
      })
    }

    // 求职意向
    this.resumeDetail = JSON.parse(this.$route.params.jobIntent)
    console.log('求职意向', this.resumeDetail)
    // 求职状态
    this.jobStatusArr.filter(item => {
      if (item.value - 0 === this.resumeDetail.jobStatus) {
        this.jobStatusText = item.label
      }
    })
    // 期望地点
    this.areasData.filter(item => {
      item.children &&
        item.children.filter((item1, index) => {
          if (item1.value === this.resumeDetail.intentionCity) {
            this.cityText = item1.label
          }
        })
    })
    // 期望薪资
    if (this.resumeDetail.intentionSalaryMonthStart) {
      this.salaryText =
        this.resumeDetail.intentionSalaryMonthStart +
        'k - ' +
        this.resumeDetail.intentionSalaryMonthEnd +
        'k · ' +
        this.resumeDetail.intentionSalaryMonth +
        '月'
    }

    // 期望行业
    const intentionIndustryId2 = ''
    let intentionIndustryId2Arr = []
    intentionIndustryId2Arr =
      this.resumeDetail.intentionIndustryId2 &&
      this.resumeDetail.intentionIndustryId2.split(',')
    this.industryArr &&
      this.industryArr.filter(item => {
        item.children &&
          item.children.filter((item1, index) => {
            intentionIndustryId2Arr &&
              intentionIndustryId2Arr.filter((itemInner, indexInner) => {
                if (item1.value === itemInner) {
                  this.checkedArr.push({
                    label: item1.label,
                    value: item1.value
                  })
                }
              })
          })
      })
    console.log('求职意向', intentionIndustryId2, this.resumeDetail)
    // 初始化默认项
    if (this.resumeDetail) {
      this.salaryArr[0].values.filter((item, index) => {
        if (item.value === this.resumeDetail.intentionSalaryMonthStart) {
          this.salaryArr[0].defaultIndex = index
        }
      })
      this.salaryArr[1].values.filter((item, index) => {
        if (item.value === this.resumeDetail.intentionSalaryMonthEnd) {
          this.salaryArr[1].defaultIndex = index
        }
      })
      this.salaryArr[2].values.filter((item, index) => {
        if (item.value === this.resumeDetail.intentionSalaryMonth) {
          this.salaryArr[2].defaultIndex = index
        }
      })
    }
  },
  destroyed() {
    localStorage.removeItem('industryArr')
    this.checkedArr = []
    this.salaryArr = [
      {
        values: [],
        className: 'column1',
        children: []
      },
      {
        values: [],
        className: 'column2',
        children: []
      },
      {
        values: [],
        className: 'column3',
        children: []
      }
    ]
    console.log('销毁')
  },
  methods: {
    // 期望薪资
    handleChangeSalary(e) {
      const temp = JSON.parse(JSON.stringify(this.salaryArr[0].values))
      console.log(e[0])
      temp.filter((item, index) => {
        if (Number(item.value) === Number(e[0].value)) {
          temp.splice(0, index + 1)
          this.salaryArr[1].values = temp
          console.log(temp)
        }
      })
    },
    // 编辑求职意向
    editResumeJobIntention() {
      const params = this.resumeDetail
      editResumeJobIntention(params).then(res => {
        console.log(res)
        if (res) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1500)
          // 将参数传回上一页
          //   const pages = getCurrentPages()
          //   const prevPage = pages[pages.length - 2] // 上一页
          //   // 调用上一个页面的setData 方法，将数据存储
          //   prevPage.setData({
          //     query: 'refresh'
          //   })
        }
      })
    },
    onConfirmJobStatus(e) {
      this.jobStatusText = e.label
      this.$set(this.resumeDetail, 'jobStatus', e.value)
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
      this.$set(this.resumeDetail, 'intentionProvince', arr[0].value)
      this.$set(this.resumeDetail, 'intentionCity', arr[1].value)
      this.showPickerCity = false
    },
    onConfirmSalary(e) {
      console.log(e)
      const value = e
      this.salaryText =
        value[0].label + ' - ' + value[1].label + ' · ' + value[2].label
      this.$set(this.resumeDetail, 'intentionSalaryMonthStart', value[0].value)
      this.$set(this.resumeDetail, 'intentionSalaryMonthEnd', value[1].value)
      this.$set(this.resumeDetail, 'intentionSalaryMonth', value[2].value)
    },
    toIndustryPage() {
      const checkedArr = JSON.stringify(this.checkedArr)
      this.$router.push({ name: 'industryPage', params: { checkedArr } })
    },
    // 保存
    saveIt() {
      const params = this.resumeDetail
      console.log(params)
      if (!params.jobStatus) {
        this.$toast('请选择求职状态')
      } else if (!params.intentionPosition) {
        this.$toast('请输入期望职位')
      } else if (!params.intentionProvince) {
        this.$toast('请选择期望地点')
      } else {
        this.editResumeJobIntention()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mb-6 {
  margin-bottom: 6px;
}
.mb-10 {
  margin-bottom: 10px;
}
.job-intent {
  background: #f7f8f9;
  box-sizing: border-box;
  padding-bottom: 20px;
  position: fixed;
  width: 100%;
  height: 100%;
  .main {
    background: #f7f8f9;
    box-sizing: border-box;
    .save-btn {
      color: #fff;
      margin: 0 auto;
      text-align: center;
      background-color: #1678f9;
      height: 40px;
      line-height: 40px;
      width: 335px;
      font-size: 16px;
      border-radius: 20px;
      margin-top: 20px;
    }
    .form {
      background: #fff;
      padding: 0 16px;
      /deep/ .van-cell {
        padding: 0;
        flex: 1;
        &:after {
          display: none;
        }
        .van-field__input {
          font-size: 14px;
        }
      }
      .item {
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
          width: 280px;
          min-height: 36px;
          display: inline-block;
          margin-left: 10px;
          color: #333;
          display: flex;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          padding-right: 10px;
          line-height: 19px;
          span {
            align-self: center;
          }
          .default-text {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
