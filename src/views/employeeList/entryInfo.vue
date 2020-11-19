<template>
  <div class="to-entry-page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <van-form>
        <van-field
          class="arrow-r"
          readonly
          clickable
          name="picker"
          :value="entryDateText"
          label="入职日期："
          placeholder="请选择"
          @click="showPicker2 = true"
        />
        <van-popup v-model="showPicker2" round position="bottom">
          <van-datetime-picker
            type="date"
            title="请选择"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="showPicker2 = false"
            @confirm="onConfirm2"
            :formatter="formatter"
          />
        </van-popup>
        
        <van-field
            v-model="jobName"
            label="入职职位："
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入入职职位' }]"
        />

        <van-field
            v-model="beforeSalary"
            label="试用期薪资："
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入试用期薪资' }]"
        />

        <van-field
            v-model="afterSalary"
            label="转正后薪资："
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入转正后薪资' }]"
        />

        <van-field
          class="arrow-r"
          readonly
          clickable
          name="picker"
          :value="payDay"
          label="每月发薪日："
          placeholder="请选择"
          @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns1"
            @cancel="showPicker1 = false"
            @confirm="onConfirm1"
          />
        </van-popup>
    </van-form>

    <div class="footer-btns">
        <van-button class="default-btn ghost" @click="onClickLeft">取消</van-button>
        <van-button class="default-btn" @click="submit" :loading="btnLoading" loading-text="提交">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      btnLoading:false,
      entryDate:'',
      beforeSalary:'',
      afterSalary:'',
      entryDateText:'',
      jobName:'',
      payDay:'',
      showPicker1:false,
      showPicker2:false,
      columns1:[
        { text:1 },
        { text:2 }
      ],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
    }
  },
  methods:{
    submit(){
      this.btnLoading = true  
      setTimeout(()=>{
        this.btnLoading = false
        let { entryDate,jobName,beforeSalary,afterSalary,payDay } = this
        let params = { entryDate,jobName,beforeSalary,afterSalary,payDay }
        console.log(params)
      },500)
    },
    // 每月发薪日
   onConfirm1(e){
     this.payDay = e.text
     this.showPicker1 = false
   },
   // 入职日期
   onConfirm2(e){
     let month = Number(e.getMonth()) + 1
     let day = e.getDate() 
     if(month < 10) {
       month = '0' + month
     }
     if(day < 10) {
       day = '0' + day
     }
     this.entryDateText = 
        e.getFullYear() +
        "年" +
        month +
        "月" +
        day +
        "日"
      this.entryDate = 
        e.getFullYear() +
        "-" +
        month +
        "-" +
        day 
     this.showPicker2 = false
   },
   formatter(type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      } else if (type === 'day') {
        return `${val}日`;
      }
      return val;
    },
  }
}
</script>
<style lang="less">
@import '~@/assets/less/entryInfo.less';
</style>

