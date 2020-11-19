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
          :value="entryTypeText"
          label="入职类型："
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
          class="arrow-r"
          readonly
          clickable
          name="picker"
          :value="entryReasonText"
          label="入职原因："
          placeholder="请选择"
          @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns2"
            @cancel="showPicker3 = false"
            @confirm="onConfirm3"
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
    btnLoading:false
  },
  data() {
    return {
      btnLoading:false,
      reason:'',
      entryType:'',
      entryTypeText:'',
      entryReason:'',
      entryReasonText:'',
      entryDate:'',
      entryDateText:'',
      showPicker1:false,
      showPicker2:false,
      showPicker3:false,
      columns1:[
        { text:'类型1',value: 1 },
        { text:'类型2',value: 2 }
      ],
      columns2:[
        { text:'原因1',value: 1 },
        { text:'原因2',value: 2 }
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
        let { entryType,entryReason,entryDate } = this
        let params = { entryType,entryReason,entryDate }
        console.log(params)
      },500)
    },
    // 入职类型
   onConfirm1(e){
     this.entryTypeText = e.text
     this.entryType = e.value
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
   // 入职原因
   onConfirm3(e){
     this.entryReasonText = e.text
     this.entryReason = e.value
     this.showPicker3 = false
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

