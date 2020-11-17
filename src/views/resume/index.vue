<template>
  <div class="my-resume">
    <div v-if="resumeEmpty" class="loading-text loading-text-fixed">
      <img src="~@/assets/images/common/loading_detail.gif" />
    </div>
    <div class="main">
      <!-- 简历完整度 -->
      <div class="title-bar">
        <span class="text">简历完整度</span>
        <span v-if="resumeEmpty" class="num">0%</span>
        <span v-else class="num">{{ detail.integrity }}%</span>
        <div class="progress">
          <p class="active" :style="{ width: detail.integrity*3.5/2 + 'px'}"></p>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="card base-info" @click="editBaseInfo">
        <div class="title edit">基本信息</div>
        <div class="base-info-cont">
          <img v-if="detail.avatarImg" mode="aspectFill" :src="detail.avatarImg" />
          <img v-else-if="detail.avatarUrl" :src="detail.avatarUrl" />
          <img v-else-if="detail.gender === 1" src="~@/assets/images/common/avatar_man.png" />
          <img v-else-if="detail.gender === 2" src="~@/assets/images/common/avatar_woman.png" />
          <img v-else src="~@/assets/images/common/avatar_unknown.png" />
          <div class="right">
            <p class="name">
              {{ detail.name }}
              <i v-if="detail.gender === 2"></i>
              <i v-if="detail.gender === 1" class="active"></i>
            </p>
            <p class="mess">
              <span v-if="detail.liveCity">{{ detail.liveCity }}</span>
              <span v-if="detail.age">{{ detail.age }}岁</span>
              <span v-if="detail.degreeCode">{{ detail.degreeCode }}</span>
              <span v-if="detail.workMonth">工作{{ detail.workMonth }}</span>
            </p>
            <p v-if="detail.mobile" class="tel">{{ detail.mobile }}</p>
            <p v-if="detail.email" class="email">{{ detail.email }}</p>
          </div>
        </div>
      </div>
      <!-- 求职意向 -->
      <div class="card job-intent" @click="editJobIntent">
        <div class="title edit">求职意向</div>
        <div v-if="detail" class="cont">
          <div class="item">
            <label>求职状态</label>
            <span v-if="detail.jobStatus">{{ detail.jobStatus }}</span>
            <span v-else>-</span>
          </div>
          <div class="item">
            <label>期望职位</label>
            <span v-if="detail.intentionPosition">{{ detail.intentionPosition }}</span>
            <span v-else>-</span>
          </div>
          <div class="item">
            <label>期望地点</label>
            <span v-if="detail.intentionCity">{{ detail.intentionCity }}</span>
            <span v-else>-</span>
          </div>
          <div class="item">
            <label>期望薪资</label>
            <span
              v-if="detail.intentionSalaryMonth"
            >{{ detail.intentionSalaryMonthStart }}k - {{ detail.intentionSalaryMonthEnd }}k · {{ detail.intentionSalaryMonth }}月</span>
            <span v-else>-</span>
          </div>
          <div class="item">
            <label>期望行业</label>
            <span
              v-if="detail.intentionIndustryId2 && detail.intentionIndustryId2.length > 0"
              class="overflow-ellips-230"
            >
              <span v-for="(item,index) in detail.intentionIndustryId2" :key="index">
                {{ item.label }}
                <template v-if="index < detail.intentionIndustryId2.length - 1">，</template>
              </span>
            </span>
            <span v-else>-</span>
          </div>
        </div>
      </div>
      <!-- 工作/实习经历 -->
      <div class="card work-exp">
        <div class="title">工作/实习经历</div>
        <div v-if="experiences && experiences.length > 0" class="cont process">
          <ul>
            <li v-for="(item,index) in experiences" :key="index" @click="editWorkExp(item,'edit')">
              <p class="time">
                <i></i>
                {{ item.startDate }}-{{ item.endDate }}
              </p>
              <p class="comp-name">{{ item.companyName }}</p>
              <p class="mess">
                <span>{{ item.title }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="add-btn" @click="editWorkExp(null,'add')">+ 添加工作/实习经历</div>
      </div>
      <!-- 教育经历 -->
      <div class="card edu-exp">
        <div class="title">教育经历</div>
        <div v-if="educations && educations.length > 0" class="cont process">
          <ul>
            <li v-for="(item,index) in educations" :key="index" @click="editEduExp(item,'edit')">
              <p class="time">
                <i></i>
                {{ item.startDate }}-{{ item.endDate }}
              </p>
              <p class="school-name">{{ item.school }}</p>
              <p class="mess">
                <span v-if="item.degreeCodeText">{{ item.degreeCodeText }} ·</span>
                <span>
                  {{ item.speciality }}
                  <label v-if="item.isUnifiedStrategy == 1" class="label">统招</label>
                  <label v-if="item.isUnifiedStrategy == 0" class="label">非统招</label>
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div class="add-btn" @click="editEduExp(null,'add')">+ 添加教育经历</div>
      </div>
      <!-- 项目经历/校园活动 -->
      <div class="card project-exp">
        <div class="title">项目经历/校园活动</div>
        <div v-if="projects && projects.length > 0" class="cont process">
          <ul>
            <li v-for="(item,index) in projects" :key="index" @click="editProjectExp(item,'edit')">
              <p class="time">
                <i></i>
                {{ item.startDate }}-{{ item.endDate }}
              </p>
              <p class="comp-name">{{ item.projectName }}</p>
              <p class="mess">
                <span>所属公司：{{ item.companyName }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="add-btn" @click="editProjectExp(null,'add')">+ 添加项目经历/校园活动</div>
      </div>
      <!-- 语言能力 -->
      <div class="card lang-power-card">
        <div class="title">语言能力</div>
        <div v-if="langs && langs.length > 0" class="cont process">
          <ul>
            <li v-for="(item,index) in langs" :key="index" @click="editLangPower(item,'edit')">
              <span class="lang-name lang-name-ellipsis">{{ item.languages }}</span>
              <span class="lang-level lang-level-ellipsis">{{ item.level }}</span>
              <span class="line"></span>
              <span class="lang-speak">口语{{ item.listeningSpeakingSkills }}</span>
              <span class="line"></span>
              <span class="lang-write">书写{{ item.readingWritingSkills }}</span>
            </li>
          </ul>
        </div>
        <div class="add-btn" @click="editLangPower(null,'add')">+ 添加语言能力</div>
      </div>
      <!-- 技能证书 -->
      <div class="card lang-power-card">
        <div class="title">技能证书</div>
        <div v-if="skills && skills.length > 0" class="cont process">
          <ul>
            <li v-for="(item,index) in skills" :key="index" @click="editSkill(item,'edit')">
              <span class="lang-name">{{ item.nameOfCertificate }}</span>
              <span class="lang-level">{{ item.receivingDate }}</span>
            </li>
          </ul>
        </div>
        <div class="add-btn" @click="editSkill(null,'add')">+ 添加技能证书</div>
      </div>
      <!-- 自我介绍 -->
      <div class="card base-info my-self" @click="editSelf('自我介绍',detail.personal,'personal')">
        <div class="title edit">自我介绍</div>
        <div v-if="detail.personal" class="base-info-cont">
          <p class="self-desc">{{ detail.personal }}</p>
        </div>
      </div>
      <p v-if="type === 'full'" class="save-btn" @click="saveIt">保存</p>
    </div>
  </div>
</template>

<script>
import { getResumeInfoByUserId } from '@/api/resumeApi'
import { getCurrentUserInfo } from '@/api/commonApi'

export default {
  data() {
    return {
      userInfo: {},
      resumeEmpty: true,
      areasData: [],
      jobStatusArr: [],
      industryArr: [],
      langArr: [],
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
      detailInit: {},
      detail: {}, // 基本信息&求职意向
      experiencesInit: [],
      experiences: [], // 工作/实习经历
      projectsInit: [],
      projects: [], // 项目经历/校园活动
      educationsInit: [],
      educations: [], // 教育经历
      type: null,
      langs: [], // 语言能力
      langsInit: [], // 语言能力
      skills: [], // 技能证书
      skillsInit: [] // 技能证书
    }
  },
  computed: {
    dictData() {
      return this.$store.state.global.dictData
    }
  },
  created() {
    window.addEventListener('beforeunload', () => {
      console.log('刷新')
    })
    this.getCurrentUserInfo()
    this.getResumeInfoByUserId()
  },
  mounted() {
    this.type = this.$route.params.type
    // 省市
    this.areasData = this.dictData && this.dictData.areas
    // 求职状态
    this.jobStatusArr = this.dictData && this.dictData.dicts.jobStatus
    // 期望行业
    this.industryArr = this.dictData && this.dictData.industry
    // 语言能力
    this.langArr = this.dictData && this.dictData.dicts.readListenSkills

    this.userInfo = this.$store.state.global.userInfo
    this.langArr && this.langArr.length > 0 && this.getResumeInfoByUserId()
  },
  methods: {
    // saveIt() {
    //   setTimeout(() => {
    //     wx.navigateBack({
    //       delta: 2
    //     })
    //   }, 1500)
    //   // 将参数传回上一页
    //   const pages = getCurrentPages()
    //   const prevPage = pages[pages.length - 3] // 上一页
    //   // 调用上一个页面的setData 方法，将数据存储
    //   prevPage.setData({
    //     query: 'fullResume'
    //   })
    // },
    // 获取用户信息
    getCurrentUserInfo() {
      getCurrentUserInfo().then(res => {
        if (res && res.success) {
          this.$store.dispatch('updateUserInfo', res.data)
        }
      })
    },
    hideEmailInfo(email) {
      if (String(email).indexOf('@') > 0) {
        let newEmail = ''
        const str = email.split('@')
        let _s = ''

        if (str[0].length > 4) {
          _s = str[0].substr(0, 4)
          for (let i = 0; i < str[0].length - 4; i++) {
            _s += '*'
          }
        } else {
          _s = str[0].substr(0, 1)
          for (let i = 0; i < str[0].length - 1; i++) {
            _s += '*'
          }
        }
        newEmail = _s + '@' + str[1]
        return newEmail
      } else {
        return email
      }
    },
    // 获取简历详情
    getResumeInfoByUserId() {
      getResumeInfoByUserId().then(res => {
        const { success, data } = res
        if (success) {
          this.resumeEmpty = false
          this.detail = data.detail && JSON.parse(JSON.stringify(data.detail)) // 基本信息&求职意向
          console.log('求职意向', this.detail)
          this.detailInit =
            data.detail && JSON.parse(JSON.stringify(data.detail))
          this.experiences =
            data.experiences && JSON.parse(JSON.stringify(data.experiences)) // 工作/实习经历
          this.experiencesInit =
            data.experiences && JSON.parse(JSON.stringify(data.experiences))
          this.projects =
            data.projects && JSON.parse(JSON.stringify(data.projects)) // 项目经历/校园活动
          this.projectsInit =
            data.projects && JSON.parse(JSON.stringify(data.projects))
          this.educations =
            data.educations && JSON.parse(JSON.stringify(data.educations)) // 教育经历
          this.educationsInit =
            data.educations && JSON.parse(JSON.stringify(data.educations))

          this.langs =
            data.languages && JSON.parse(JSON.stringify(data.languages)) // 语言能力
          this.langs &&
            this.langs.filter(item => {
              this.langArr.filter(itemInner => {
                // 口语
                if (item.listeningSpeakingSkills === itemInner.value) {
                  item.listeningSpeakingSkills = itemInner.label
                }
                // 书写
                if (item.readingWritingSkills === itemInner.value) {
                  item.readingWritingSkills = itemInner.label
                }
              })
            })
          this.langsInit =
            data.languages && JSON.parse(JSON.stringify(data.languages))
          this.skills =
            data.cerInfos && JSON.parse(JSON.stringify(data.cerInfos)) // 技能证书
          this.skillsInit =
            data.cerInfos && JSON.parse(JSON.stringify(data.cerInfos))
          // 手机号
          const verfity = /(\d{3})\d*(\d{4})/
          const replaceStr = '$1****$2'
          const mobile =
            this.detail.mobile &&
            this.detail.mobile.replace(verfity, replaceStr)
          this.detail.mobile = mobile
          // 邮箱
          // const verfity2 = /(\d{3})\d*(\d{4})/
          const email = this.detail.email
          this.detail.email = this.hideEmailInfo(email)
          // 所在城市，期望地点
          let liveCity = null
          let intentionCity = null
          this.areasData &&
            this.areasData.filter(item => {
              item.children &&
                item.children.filter((item1, index) => {
                  if (item1.value === data.detail.liveCity) {
                    liveCity = item1.label
                  }
                  if (item1.value === data.detail.intentionCity) {
                    intentionCity = item1.label
                  }
                })
            })
          this.$set(this.detail, 'liveCity', liveCity)
          this.$set(this.detail, 'intentionCity', intentionCity)
          // 学历
          let degreeCode = null
          this.degreeArr &&
            this.degreeArr.filter(item => {
              if (item.value - 0 === data.detail.degreeCode) {
                degreeCode = item.label
              }
            })
          this.$set(this.detail, 'degreeCode', degreeCode)
          // 求职状态
          let jobStatus = null
          this.jobStatusArr &&
            this.jobStatusArr.filter(item => {
              if (item.value - 0 === data.detail.jobStatus) {
                jobStatus = item.label
              }
            })
          this.$set(this.detail, 'jobStatus', jobStatus)
          // 期望行业
          // const intentionIndustryId2 = ''
          let intentionIndustryId2Arr = []
          intentionIndustryId2Arr =
            data.detail.intentionIndustryId2 &&
            data.detail.intentionIndustryId2.split(',')
          const temp = []
          this.industryArr &&
            this.industryArr.filter(item => {
              item.children &&
                item.children.filter((item1, index) => {
                  intentionIndustryId2Arr &&
                    intentionIndustryId2Arr.filter((itemInner, indexInner) => {
                      if (item1.value === itemInner) {
                        temp.push({
                          value: item1.value,
                          label: item1.label
                        })
                      }
                    })
                })
            })
          this.$set(this.detail, 'intentionIndustryId2', temp)
          // 学历
          this.educations &&
            this.educations.filter(item => {
              this.degreeArr &&
                this.degreeArr.filter(itemInner => {
                  if (itemInner.value === item.degreeCode) {
                    item.degreeCodeText = itemInner.label
                  }
                })
            })
        } else {
          this.resumeEmpty = true
        }
      })
    },
    // 基本信息
    editBaseInfo() {
      let baseInfo = {}
      localStorage.setItem('avatar', this.detail.avatar)
      localStorage.setItem('avatarImg', this.detail.avatarImg)
      baseInfo.id = this.detail.id
      baseInfo.name = this.detail.name
      baseInfo.mobile = this.detailInit.mobile // 手机号
      baseInfo.gender = this.detail.gender
      baseInfo.birthday = this.detail.birthday
      baseInfo.startWorkMonth = this.detail.startWorkMonth
      baseInfo.liveProvince = this.detailInit.liveProvince // 省
      baseInfo.liveCity = this.detailInit.liveCity // 市
      baseInfo.degreeCode = this.detailInit.degreeCode // 学历
      baseInfo.currentCompanyName = this.detail.currentCompanyName
      baseInfo.currentPosition = this.detail.currentPosition
      baseInfo.currentSalary = this.detail.currentSalary
      baseInfo.currentSalaryMonth = this.detail.currentSalaryMonth
      baseInfo.currentSalaryTax = this.detail.currentSalaryTax
      baseInfo.graduateSchool = this.detail.graduateSchool
      baseInfo.email = this.detailInit.email // 邮箱
      baseInfo.webChat = this.detail.webChat
      baseInfo = JSON.stringify(baseInfo)
      this.$router.push({
        name: 'baseInfo',
        params: { type: 'edit', baseInfo }
      })
    },
    // 求职意向
    editJobIntent() {
      let jobIntent = {}
      jobIntent.id = this.detail.id
      jobIntent.jobStatus = this.detailInit.jobStatus // 求职状态
      jobIntent.intentionPosition = this.detail.intentionPosition
      jobIntent.intentionProvince = this.detailInit.intentionProvince // 省
      jobIntent.intentionCity = this.detailInit.intentionCity // 市
      jobIntent.intentionSalaryMonthStart = this.detail.intentionSalaryMonthStart
      jobIntent.intentionSalaryMonthEnd = this.detail.intentionSalaryMonthEnd
      jobIntent.intentionSalaryMonth = this.detailInit.intentionSalaryMonth // 月
      jobIntent.intentionIndustryId2 = this.detailInit.intentionIndustryId2
      jobIntent = JSON.stringify(jobIntent)
      this.$router.push({
        name: 'jobIntent',
        params: { jobIntent }
      })
    },
    // 工作/实习经历
    editWorkExp(item = {}, type = 'add') {
      let detail = {}
      detail.resumeId = this.detail.id
      if (item) {
        detail.id = item.id
        detail.startDate = item.startDate
        detail.endDate = item.endDate
        detail.companyName = item.companyName
        detail.title = item.title
        detail.summary = item.summary
        detail.achievement = item.achievement
      }
      detail = JSON.stringify(detail)
      this.$router.push({
        name: 'workExp',
        params: {
          type,
          detail
        }
      })
    },
    // 项目经历/校园活动
    editProjectExp(item = {}, type = 'add') {
      let detail = {}
      detail.resumeId = this.detail.id
      if (item) {
        detail.id = item.id
        detail.startDate = item.startDate
        detail.endDate = item.endDate
        detail.companyName = item.companyName
        detail.projectName = item.projectName
        detail.projectDescription = item.projectDescription
      }
      detail = JSON.stringify(detail)
      this.$router.push({
        name: 'projectExp',
        params: {
          type,
          detail
        }
      })
    },
    // 教育经历
    editEduExp(item = {}, type = 'add') {
      let detail = {}
      detail.resumeId = this.detail.id
      if (item) {
        detail.id = item.id
        detail.startDate = item.startDate
        detail.endDate = item.endDate
        detail.school = item.school
        detail.speciality = item.speciality
        detail.degreeCode = item.degreeCode
        detail.isUnifiedStrategy = item.isUnifiedStrategy
        detail.summary = item.summary
      }
      detail = JSON.stringify(detail)
      this.$router.push({
        name: 'eduExp',
        params: {
          type,
          detail
        }
      })
    },
    // 语言能力
    editLangPower(item = {}, type = 'add') {
      let detail = {}
      detail.resumeId = this.detail.id
      item &&
        this.langsInit &&
        this.langsInit.filter(i => {
          if (i.id === item.id) {
            item = i
          }
        })
      if (item) {
        detail.id = item.id
        detail.languages = item.languages
        detail.level = item.level
        detail.listeningSpeakingSkills = item.listeningSpeakingSkills
        detail.readingWritingSkills = item.readingWritingSkills
      }
      detail = JSON.stringify(detail)
      this.$router.push({
        name: 'langPower',
        params: {
          type,
          detail
        }
      })
    },
    // 技能证书
    editSkill(item = {}, type = 'add') {
      let detail = {}
      detail.resumeId = this.detail.id
      if (item) {
        detail.id = item.id
        detail.receivingDate = item.receivingDate
        detail.nameOfCertificate = item.nameOfCertificate
      }
      detail = JSON.stringify(detail)
      this.$router.push({
        name: 'skill',
        params: {
          type,
          detail
        }
      })
    },
    // 自我介绍
    editSelf(textareaTitle, message = '', label) {
      this.$router.push({
        name: 'textareaPage',
        params: {
          textareaTitle,
          message,
          label,
          resumeId: this.detail.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background: #f7f8f9;
  padding: 16px 16px;
  box-sizing: border-box;
  .save-btn {
    color: #fff;
    text-align: center;
    background-color: #1678f9;
    height: 40px;
    line-height: 40px;
    width: 343px;
    left: 50%;
    margin-left: -171.5px;
    font-size: 31px;
    border-radius: 20px;
    position: fixed;
    bottom: 15px;
  }
  .title-bar {
    height: 62px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: 2px 4px 20px 0px rgba(0, 0, 0, 0.05);
    padding: 20px 16px;
    box-sizing: border-box;
    font-weight: 600;
    display: flex;
    align-items: center;
    .text {
      font-size: 16px;
      color: #15181b;
      width: 90px;
    }
    .num {
      font-size: 16px;
      color: #1678f9;
      margin-right: 10px;
    }
    .progress {
      width: 175px;
      border-radius: 3px;
      height: 6px;
      position: relative;
      background: #e5e5e5;
      display: inline-block;
      .active {
        position: absolute;
        left: 0;
        top: 0;
        height: 6px;
        background: #1678f9;
        border-radius: 3px;
        transition: all 0.2s ease-in-out 0s;
      }
    }
  }
  .card {
    background: #fff;
    margin-top: 20px;
    border-radius: 4px;
    box-shadow: 2px 4px 20px 0px rgba(0, 0, 0, 0.05);
    &.edu-exp {
      .mess {
        .label {
          width: 40px;
          height: 18px;
          border-radius: 2px;
          border: 1px solid rgba(102, 102, 102, 1);
          font-size: 11px;
          color: rgba(102, 102, 102, 1);
          line-height: 18px;
          display: inline-block;
          margin-left: 10px;
          text-align: center;
        }
      }
    }
    .add-btn {
      height: 48px;
      line-height: 48px;
      text-align: center;
      color: #1678f9;
      font-size: 12px;
      &:active {
        background: rgba(249, 249, 249, 0.8);
      }
    }
    .title {
      padding: 0 16px;
      height: 54px;
      line-height: 54px;
      box-sizing: border-box;
      font-size: 16px;
      color: #15181b;
      position: relative;
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
        opacity: 0.6;
        border-bottom-width: 1px;
      }
      &.edit {
        &:active {
          background: rgba(249, 249, 249, 0.8);
        }
        &::after {
          content: '';
          width: 16px;
          height: 16px;
          display: inline-block;
          position: absolute;
          right: 16px;
          top: 19px;
          background: url('~@/assets/images/resume/edit.png') no-repeat;
          background-size: 16px;
        }
      }
    }
    .cont {
      padding: 16px;
      box-sizing: border-box;
    }
    .process {
      position: relative;
      &::after {
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
        border: 0 solid #d8d8d8;
        opacity: 0.3;
        border-bottom-width: 1px;
      }
      ul {
        overflow: hidden;
        li {
          padding-left: 30px;
          padding-bottom: 20px;
          position: relative;
          overflow: hidden;
          &::before {
            content: '';
            width: 0.3px;
            position: absolute;
            height: 300px;
            left: 8.5px;
            top: 0;
            display: inline-block;
            border-right: 1px dashed #cccccc;
            z-index: 1;
          }
          &:active {
            background: rgba(249, 249, 249, 0.8);
          }
          &:last-child {
            margin-bottom: 0;
          }
          &::after {
            content: '';
            width: 16px;
            height: 16px;
            display: inline-block;
            position: absolute;
            right: 0px;
            top: 0px;
            background: url('~@/assets/images/resume/edit.png') no-repeat;
            background-size: 16px;
          }
          .time {
            color: #666666;
            font-size: 11px;
            i {
              width: 18px;
              height: 18px;
              display: inline-block;
              background: #fff url('~@/assets/images/resume/dot.png') no-repeat;
              background-size: 18px;
              position: absolute;
              left: 0;
              z-index: 10;
            }
          }
          .comp-name,
          .school-name {
            margin-top: 12px;
            font-size: 14px;
            color: #15181b;
          }
          .mess {
            color: #333333;
            font-size: 12px;
            margin-top: 6px;
          }
        }
      }
    }
    &.lang-power-card {
      .process {
        ul {
          li {
            padding-left: 0;
            padding-bottom: 15px;
            &::before {
              display: none;
            }
            &::after {
              top: 6px;
            }
            &:last-child {
              padding-bottom: 0;
            }
            span {
              vertical-align: middle;
              &.line {
                width: 1px;
                height: 10px;
                background: #666;
                margin: 0 5px;
                display: inline-block;
              }
            }
          }
        }
      }
      .lang-name {
        padding: 0 5px;
        height: 18px;
        border-radius: 2px;
        border: 1px solid #666;
        font-size: 11px;
        color: #666;
        line-height: 18px;
        display: inline-block;
        margin-left: 10px;
        text-align: center;
        vertical-align: middle;
        margin-right: 5px;
        margin-left: 0;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lang-name-ellipsis {
        max-width: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lang-level-ellipsis {
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .lang-level,
      .lang-speak,
      .lang-write {
        color: #333333;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        display: inline-block;
      }
    }
  }
  .my-self {
    .title {
      &::before {
        display: none;
      }
    }
  }
  .base-info {
    .base-info-cont {
      padding: 16px;
      display: flex;
      .self-desc {
        font-size: 14px;
        color: #15181b;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
      }
      .right {
        margin-left: 12px;
        .name {
          font-size: 14px;
          color: #15181b;
          margin-right: 4px;
          i {
            width: 12px;
            height: 12px;
            display: inline-block;
            background: url('~@/assets/images/resume/woman.png') no-repeat;
            background-size: 12px;
            &.active {
              background: url('~@/assets/images/resume/man.png') no-repeat;
              background-size: 12px;
            }
          }
        }
        .mess {
          margin-bottom: 6px;
          span {
            font-size: 11px;
            color: #b2b2b2;
            &::after {
              content: '·';
              display: inline-block;
              font-size: 24px;
              margin-left: 2px;
              margin-right: 2px;
              vertical-align: -5px;
            }
            &:last-child {
              &::after {
                display: none;
              }
            }
          }
        }
        .tel,
        .email {
          font-size: 11px;
          color: #666666;
          &::before {
            content: '';
            width: 16px;
            height: 16px;
            display: inline-block;
            vertical-align: -4px;
            margin-right: 4px;
            margin-left: -1px;
          }
        }
        .tel {
          margin-bottom: 4px;
          &::before {
            background: url('~@/assets/images/resume/tel.png') no-repeat;
            background-size: 16px;
          }
        }
        .email {
          &::before {
            background: url('~@/assets/images/resume/email.png') no-repeat;
            background-size: 16px;
          }
        }
      }
    }
  }
  .job-intent {
    .cont {
      .item {
        margin-bottom: 16px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      label {
        font-size: 14px;
        color: #999999;
        margin-right: 20px;
      }
      span {
        font-size: 14px;
        color: #333333;
      }
    }
  }
}
</style>
