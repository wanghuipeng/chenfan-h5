<template>
  <div class="project-exp">
    <div class="main">
      <div class="form mb-6">
        <div class="item required">
          <label>所属公司</label>
          <input
            type="text"
            v-model="projectExpDetail.companyName"
            class="input-item"
            placeholder="请输入"
          />
        </div>
        <div class="item arrow required">
          <label>开始时间</label>
          <van-field
            @click="showPickerStartDate = true"
            readonly
            clickable
            :value="startDateText"
            placeholder="请选择"
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
          <label>结束时间</label>
          <van-field
            @click="showPickerEndDate = true"
            readonly
            clickable
            :value="endDateText"
            placeholder="请选择"
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
          <label>项目名称</label>
          <input
            type="text"
            v-model="projectExpDetail.projectName"
            class="input-item"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="form">
        <div class="item arrow textarea">
          <label>项目描述</label>
          <div
            class="placeholder"
            @click="toTextarea('项目描述',projectExpDetail.projectDescription,'projectDescription')"
          >
            <span
              v-if="projectExpDetail.projectDescription"
              v-html="projectExpDetail.projectDescription"
            ></span>
            <span class="default-text" v-else>请输入</span>
          </div>
        </div>
      </div>
      <p class="save-btn" @click="saveIt">保存</p>
      <p class="del-btn" @click="delIt" v-if="type === 'edit'">删除</p>
    </div>
  </div>
</template>

<script>
import {
  addResumeProject,
  editResumeProject,
  deleteResumeProject
} from '@/api/resumeApi'
import tools from '@/utils/tools'
import { Toast } from 'vant'

export default {
  computed: {
    dictData() {
      return this.$store.state.global.dictData
    },
    textareaParams() {
      return this.$store.state.global.textareaParams
    }
  },
  data() {
    return {
      type: null,
      title: null,
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
      projectExpDetail: {} //项目经历
    }
  },
  activated() {
    console.log('文本', this.textareaParams)
    let options = this.$route.params
    if (options.type) {
      this.type = options.type
    }
    if (options.detail) {
      // 项目经历
      console.log('项目经历', options.detail)
      this.projectExpDetail = JSON.parse(options.detail)
      this.$set(
        this.projectExpDetail,
        'resumeId',
        this.projectExpDetail.resumeId
      )
    }

    if (this.type === 'add') {
      document.title = '添加项目经历'
    } else if (this.type === 'edit') {
      document.title = '编辑项目经历'
      // 开始时间
      this.startDateText = this.projectExpDetail.startDate || null
      // 结束时间
      this.endDateText = this.projectExpDetail.endDate || null
    }

    if (!tools.isEmptyObject(this.textareaParams)) {
      if (this.textareaParams.label === 'projectDescription') {
        this.$set(
          this.projectExpDetail,
          'projectDescription',
          this.textareaParams.value
        )
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
    console.log(this.startDateArr)
    console.log(this.endDateArr)
  },
  onUnload() {
    this.startDateText = null
    this.endDateText = null
  },
  methods: {
    onConfirmStartDate(e) {
      let label = e
      this.startDateText = label && label.join('-')
      this.$set(this.projectExpDetail, 'startDate', this.startDateText)
    },
    onConfirmEndDate(e) {
      let label = e
      this.endDateText = label && label.join('-')
      this.$set(this.projectExpDetail, 'endDate', this.endDateText)
    },
    toTextarea(textareaTitle, message = '', label) {
      this.$router.push({
        name: 'textareaPage',
        params: { textareaTitle, message, label }
      })
    },
    // 添加项目经历
    addResumeProject() {
      let params = this.projectExpDetail
      addResumeProject(params).then(res => {
        console.log(res)
        if (res) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.goBack()
          }, 1500)
        }
      })
    },
    // 编辑项目经历
    editResumeProject() {
      let params = this.projectExpDetail
      editResumeProject(params).then(res => {
        console.log(res)
        if (res) {
          this.$toast.success('保存成功')
          setTimeout(() => {
            this.goBack()
          }, 1500)
        }
      })
    },
    // 删除项目经历
    deleteResumeProject() {
      Toast.loading({ forbidClick: true })
      let { resumeId, id } = this.projectExpDetail
      let params = {
        resumeId,
        resumeProjectId: id
      }
      deleteResumeProject(params).then(res => {
        Toast.clear()
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
      this.projectExpDetail = {
        resumeId: this.projectExpDetail.resumeId
      }
      this.$set(
        this.projectExpDetail,
        'resumeId',
        this.projectExpDetail.resumeId
      )
      this.startDateText = null
      this.endDateText = null
      this.$store.dispatch('updateTextarea', {})
    },
    // 保存
    saveIt() {
      let params = this.projectExpDetail
      console.log(params, this.type)
      if (!params.companyName) {
        this.$toast('请输入所属公司')
      } else if (!params.startDate) {
        this.$toast('请选择开始时间')
      } else if (!params.endDate) {
        this.$toast('请选择结束时间')
      } else if (this.startDateText > this.endDateText) {
        this.$toast('结束时间必须大于开始时间')
      } else if (!params.projectName) {
        this.$toast('请输入项目名称')
      } else {
        if (this.type === 'add') {
          console.log('新建')
          this.addResumeProject()
        } else if (this.type === 'edit') {
          console.log('编辑')
          this.editResumeProject()
        }
      }
    },
    // 删除
    delIt() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除项目经历？',
          asyncClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.deleteResumeProject()
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
.project-exp {
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
