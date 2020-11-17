<template>
  <div class="work-exp">
    <div class="main">
      <div class="form mb-6">
        <div class="item arrow required">
          <label>入学时间</label>
          <van-field
            readonly
            clickable
            :value="startDateText"
            placeholder="请选择"
            placeholder-style="color: #999999"
            @click="showPickerStartDate = true"
          />
          <van-popup
            v-model="showPickerStartDate"
            position="bottom"
            @click="showPickerStartDate = false"
          >
            <van-picker
              show-toolbar
              :default-index="startDateIndex"
              :columns="startDateArr"
              :value-key="'label'"
              @cancel="showPickerStartDate = false"
              @confirm="onConfirmStartDate"
            />
          </van-popup>
        </div>
        <div class="item arrow required">
          <label>毕业时间</label>
          <van-field
            readonly
            clickable
            :value="endDateText"
            placeholder="请选择"
            placeholder-style="color: #999999"
            @click="showPickerEndDate = true"
          />
          <van-popup
            v-model="showPickerEndDate"
            position="bottom"
            @click="showPickerEndDate = false"
          >
            <van-picker
              show-toolbar
              :default-index="endDateIndex"
              :columns="endDateArr"
              :value-key="'label'"
              @cancel="showPickerEndDate = false"
              @confirm="onConfirmEndDate"
            />
          </van-popup>
        </div>
        <div class="item required">
          <label>学校</label>
          <input
            v-model="eduDetail.school"
            type="text"
            placeholder-style="color:#999999;"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item required">
          <label>专业</label>
          <input
            v-model="eduDetail.speciality"
            type="text"
            placeholder-style="color:#999999;"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item arrow">
          <label>学历</label>
          <van-field
            readonly
            clickable
            :value="degreeText"
            placeholder="请选择学历"
            placeholder-style="color: #999999"
            @click="showPickerDegree = true"
          />
          <van-popup v-model="showPickerDegree" position="bottom" @click="showPickerDegree = false">
            <van-picker
              show-toolbar
              :default-index="degreeIndex"
              :columns="degreeArr"
              :value-key="'label'"
              @cancel="showPickerDegree = false"
              @confirm="onConfirmDegree"
            />
          </van-popup>
        </div>
        <div class="item">
          <label>是否统招</label>
          <div class="input-item or">
            <span
              v-for="(item,index) in strategyArr"
              :key="index"
              :class="[item.active ? 'active' : '']"
              @click="radioStrategy(item.value)"
            >{{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="form">
        <div class="item arrow textarea">
          <label>专业备注</label>
          <div class="placeholder" @click="toTextarea('专业备注',eduDetail.summary,'summary')">
            <span v-if="eduDetail.summary" v-html="eduDetail.summary"></span>
            <span v-else class="default-text">请输入</span>
          </div>
        </div>
      </div>
      <p class="save-btn" @click="saveIt">保存</p>
      <p v-if="type === 'edit'" class="del-btn" @click="delIt">删除</p>
    </div>
  </div>
</template>

<script>
import {
  addResumeEducation,
  editResumeEducation,
  deleteResumeEducationById
} from '@/api/resumeApi'
import tools from '@/utils/tools'
import { Toast } from 'vant'

export default {
  data() {
    return {
      type: null,
      showPickerStartDate: false,
      startDateText: null,
      startDateIndex: null,
      startDateArr: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ],
      showPickerEndDate: false,
      endDateText: null,
      endDateIndex: null,
      endDateArr: [
        {
          values: [],
          className: 'column1'
        },
        {
          values: [],
          className: 'column2'
        }
      ],
      showPickerDegree: false,
      degreeIndex: null,
      degreeText: null,
      degreeArr: [
        {
          value: '95',
          label: '大专'
        },
        {
          value: '96',
          label: '本科'
        },
        {
          value: '97',
          label: '硕士'
        },
        {
          value: '98',
          label: '博士'
        },
        {
          value: '99',
          label: '博士后'
        },
        {
          value: '911',
          label: 'MBA'
        }
      ],
      strategyArr: [
        {
          value: '1',
          label: '是',
          active: false
        },
        {
          value: '0',
          label: '否',
          active: false
        }
      ],
      eduDetail: {}
    }
  },
  computed: {
    dictData() {
      return this.$store.state.global.dictData
    },
    textareaParams() {
      return this.$store.state.global.textareaParams
    }
  },
  activated() {
    let options = this.$route.params
    if (options.type) {
      this.type = options.type
    }
    if (options.detail) {
      // 教育经验
      this.eduDetail = JSON.parse(options.detail)
      this.$set(this.eduDetail, 'resumeId', this.eduDetail.resumeId)
    }

    if (this.type === 'add') {
      document.title = '添加教育经历'
    } else if (this.type === 'edit') {
      document.title = '编辑教育经历'

      // 入学时间
      this.startDateText = this.eduDetail.startDate || null
      // 毕业时间
      this.endDateText = this.eduDetail.endDate || null
      // 学历
      this.degreeArr.filter(item => {
        if (item.value - 0 === this.eduDetail.degreeCode) {
          this.degreeText = item.label
        }
      })
      // 是否统招
      this.strategyArr.filter(item => {
        if (item.value - 0 === this.eduDetail.isUnifiedStrategy) {
          item.active = true
        }
      })
    }

    if (!tools.isEmptyObject(this.textareaParams)) {
      if (this.textareaParams.label === 'summary') {
        this.$set(this.eduDetail, 'summary', this.textareaParams.value)
      }
    }
  },
  mounted() {
    // 入职时间/离职时间
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
      this.startDateArr[0].values.push(i)
      this.endDateArr[0].values.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      if (i === 10 || i === 11 || i === 12) {
        this.startDateArr[1].values.push(i)
        this.endDateArr[1].values.push(i)
      } else {
        this.startDateArr[1].values.push('0' + i)
        this.endDateArr[1].values.push('0' + i)
      }
    }
    this.startDateArr[0].values = this.startDateArr[0].values.reverse()
    this.endDateArr[0].values = this.endDateArr[0].values.reverse()
  },
  destroyed() {
    this.startDateText = null
    this.endDateText = null
    this.degreeText = null
    this.strategyArr = [
      {
        value: '1',
        label: '是',
        active: false
      },
      {
        value: '0',
        label: '否',
        active: false
      }
    ]
  },
  methods: {
    // 是否统招
    radioStrategy(value) {
      this.$set(this.eduDetail, 'isUnifiedStrategy', value)
      this.strategyArr.filter(item => {
        if (item.value === value) {
          item.active = true
        } else {
          item.active = false
        }
      })
    },
    onConfirmStartDate(e) {
      const label = e
      this.startDateText = label && label.join('-')
      this.$set(this.eduDetail, 'startDate', this.startDateText)
    },
    onConfirmEndDate(e) {
      const label = e
      this.endDateText = label && label.join('-')
      this.$set(this.eduDetail, 'endDate', this.endDateText)
    },
    toTextarea(textareaTitle, message = '', label) {
      this.$router.push({
        name: 'textareaPage',
        params: { textareaTitle, message, label }
      })
    },
    onConfirmDegree(e) {
      this.degreeText = e.label
      this.$set(this.eduDetail, 'degreeCode', e.value)
    },
    // 添加教育经验
    addResumeEducation() {
      Toast.loading({ forbidClick: true })
      const params = this.eduDetail
      addResumeEducation(params).then(res => {
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
    // 编辑教育经验
    editResumeEducation() {
      Toast.loading({ forbidClick: true })
      const params = this.eduDetail
      editResumeEducation(params).then(res => {
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
    // 删除教育经验
    deleteResumeEducationById() {
      Toast.loading({ forbidClick: true })
      const { resumeId, id } = this.eduDetail
      const params = {
        resumeId,
        resumeEducationId: id
      }
      deleteResumeEducationById(params).then(res => {
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
      this.startDateText = null
      this.endDateText = null
      this.degreeText = null
      this.strategyArr = [
        {
          value: '1',
          label: '是',
          active: false
        },
        {
          value: '0',
          label: '否',
          active: false
        }
      ]
      this.$store.dispatch('updateTextarea', {})
    },
    // 保存
    saveIt() {
      const params = this.eduDetail
      console.log(params, this.type)
      if (!params.startDate) {
        this.$toast('请选择入学时间')
      } else if (!params.endDate) {
        this.$toast('请选择毕业时间')
      } else if (this.startDateText > this.endDateText) {
        this.$toast('毕业时间必须大于入学时间')
      } else if (!params.school) {
        this.$toast('请输入学校')
      } else if (!params.speciality) {
        this.$toast('请输入专业')
      } else {
        if (this.type === 'add') {
          console.log('新建')
          this.addResumeEducation()
        } else if (this.type === 'edit') {
          console.log('编辑')
          this.editResumeEducation()
        }
      }
    },
    // 删除
    delIt() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除教育经历？',
          asyncClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.deleteResumeEducationById()
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
            width: 94px;
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
