<template>
  <div class="industry-page">
    <ul>
      <li
        v-for="(item,index) in industryArr"
        :key="index"
        :class="[ item.flag === 3 ? 'disabled' : '']"
      >
        <p class="title">{{ item.label }}</p>
        <div class="labels">
          <span
            v-for="(itemChild,indexChild) in item.children"
            :key="indexChild"
            :class="[itemChild.active ? 'active' : '',itemChild.disabled ? 'disabled' : '']"
            @click="checkIt(itemChild)"
          >{{ itemChild.label }}{{ itemChild.disabled }}</span>
        </div>
      </li>
    </ul>
    <div class="footer-fixed">
      <div v-if="checkedArr.length > 0" class="items">
        <span class="title">已选</span>
        <span v-for="(item,index) in checkedArr" :key="index" class="item" @click="delItem(item)">
          {{ item.label }}
          <label>×</label>
        </span>
      </div>
      <div class="btns">
        <span @click="clearIt">清除</span>
        <span @click="sureIt">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
// flag 1:默认  2:可编辑 3:不可编辑
export default {
  data() {
    return {
      industryArr: [],
      checkedArr: []
    }
  },
  computed: {
    dictData() {
      return this.$store.state.global.dictData
    }
  },
  mounted(options) {
    this.checkedArr = JSON.parse(this.$route.params.checkedArr)
    console.log('options.checkedArr', this.checkedArr)
    this.industryArr = this.dictData.industry
    if (this.checkedArr && this.checkedArr.length > 0) {
      this.industryArr &&
        this.industryArr.filter(item => {
          item.flag = 1 // 不能跨行业选择（需要跨行业则删除改行）
          item.children.filter(itemInner => {
            console.log(222222222)
            this.checkedArr.filter(item1 => {
              if (itemInner.value === item1.value) {
                item.flag = 2 // 不能跨行业选择（需要跨行业则删除改行）
                itemInner.active = true
              }
            })
          })
        })
      setTimeout(() => {
        this.industryArr.filter(item => {
          // 不能跨行业选择（需要跨行业则删除改行）
          if (item.flag === 1) {
            item.flag = 3
          }
        })
      }, 0)
    } else {
      this.industryArr &&
        this.industryArr.filter(item => {
          // 不能跨行业选择（需要跨行业则删除改行）
          item.flag = 1
        })
    }

    console.log('行业字典', this.industryArr)
  },
  destroyed() {
    this.industryArr &&
      this.industryArr.filter(item => {
        item.children.filter(itemInner => {
          itemInner.active = false
        })
      })
  },
  methods: {
    checkIt(itemChild) {
      console.log('child', itemChild)
      // 记录已选的数据
      if (this.checkedArr && this.checkedArr.length < 3) {
        // 正反选
        this.industryArr.filter(item => {
          item.children.filter(itemInner => {
            if (itemInner.value === itemChild.value) {
              console.log('parent', item)
              item.flag = 2 // 不能跨行业选择（需要跨行业则删除改行）
              if (itemInner.active) {
                itemInner.active = false
              } else {
                itemInner.active = true
              }
            }
          })
        })
        this.industryArr.filter(item => {
          // 不能跨行业选择（需要跨行业则删除改行）
          if (item.flag === 1) {
            item.flag = 3
          }
        })

        if (itemChild.active) {
          // 最多选3项
          this.checkedArr.push(itemChild)
        } else {
          // this.checkedArr.pop(itemChild)
          console.log(11111)
          this.delItem({
            label: itemChild.label,
            value: itemChild.value
          })
        }

        if (this.checkedArr && this.checkedArr.length === 0) {
          this.industryArr.filter(item => {
            // 不能跨行业选择（需要跨行业则删除改行）
            item.flag = 1
          })
        }
      } else if (this.checkedArr && this.checkedArr.length === 3) {
        if (itemChild.active) {
          this.industryArr.filter(item => {
            item.children.filter(itemInner => {
              if (itemInner.value === itemChild.value) {
                if (itemInner.active) {
                  itemInner.active = !itemInner.active
                } else {
                  itemInner.active = true
                }
              }
            })
          })
          // this.checkedArr.pop(itemChild)

          this.delItem({
            label: itemChild.label,
            value: itemChild.value
          })
          console.log(22222)
        } else {
          this.$toast('最多选择3项')
        }
      }
    },
    sureIt() {
      this.$router.go(-1)
      const checkedArr = JSON.stringify(this.checkedArr)
      localStorage.setItem('industryArr', checkedArr)
      // const { checkedArr } = this
      // this.$router.push({ name: 'jobIntent', params: { checkedArr } })
      //   wx.navigateBack({
      //     delta: 1
      //   })
      //   // 将参数传回上一页
      //   const pages = getCurrentPages()
      //   const prevPage = pages[pages.length - 2] // 上一页
      //   // 调用上一个页面的setData 方法，将数据存储
      //   prevPage.setData({
      //     query: this.checkedArr
      //   })
    },
    clearIt() {
      this.checkedArr = []
      this.industryArr.filter(item => {
        item.flag = 1 // 不能跨行业选择（需要跨行业则删除改行）
        item.children.filter(itemInner => {
          itemInner.active = false
        })
      })
    },
    delItem(item) {
      this.industryArr.filter(item1 => {
        item1.children.filter(item2 => {
          if (item2.value === item.value) {
            item2.active = false
          }
        })
      })

      console.log(this.industryArr)
      this.checkedArr = this.checkedArr.filter(item1 => {
        return !(item1.value === item.value)
      })

      console.log('delItem', item, item.value, this.checkedArr)
      if (this.checkedArr && this.checkedArr.length === 0) {
        this.industryArr.filter(item => {
          // 不能跨行业选择（需要跨行业则删除改行）
          item.flag = 1
        })
      }
    },
    removeArray(arr, obj) {
      var length = arr.length
      for (var i = 0; i < length; i++) {
        if (JSON.stringify(arr[i]) === JSON.stringify(obj)) {
          if (i === 0) {
            arr.shift() // 删除并返回数组的第一个元素
            return arr
          } else if (i === length - 1) {
            arr.pop() // 删除并返回数组的最后一个元素
            return arr
          } else {
            arr.splice(i, 1) // 删除下标为i的元素
            console.log('最後', arr)
          }
        }
      }
      return arr
    }
  }
}
</script>

<style lang="less" scoped>
.industry-page {
  padding-bottom: 100px;
  .footer-fixed {
    background: #fff;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
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
    .items {
      padding: 8px 20px 6px 20px;
      .title {
        font-size: 12px;
        color: #333;
        margin-right: 15px;
      }
      .item {
        font-size: 11px;
        color: #1678f9;
        border: 1px solid #1678f9;
        background: #fff;
        border-radius: 20px;
        display: inline-block;
        height: 20px;
        line-height: 22px;
        padding: 0 6px;
        margin-right: 10px;
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      padding: 8px 20px;
      box-sizing: border-box;
      span {
        width: auto;
        height: 35px;
        line-height: 35px;
        display: inline-block;
        font-size: 16px;
        &:first-child {
          border-radius: 4px;
          border: 1px solid #f5f5f5;
          background-color: #f5f5f5;
          width: 98px;
          height: 35px;
          line-height: 35px;
          display: inline-block;
          text-align: center;
          color: #333;
        }
        &:last-child {
          border-radius: 4px;
          border: 1px solid #1678f9;
          background: #1678f9;
          display: inline-block;
          text-align: center;
          color: #fff;
          margin-left: 20px;
          flex: 1;
        }
      }
    }
  }
  ul {
    padding: 20px 10px;
    box-sizing: border-box;
    li {
      margin-bottom: 10px;
      &.disabled {
        position: relative;
        &::before {
          content: ' ';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          opacity: 0.65;
          z-index: 20;
        }
      }
      .title {
        font-size: 16px;
        margin-bottom: 10px;
        padding: 0 5px;
        font-weight: 600;
      }
      .labels {
        span {
          width: auto;
          padding: 4px 10px;
          border-radius: 4px;
          display: inline-block;
          margin: 0 5px 10px 5px;
          box-sizing: border-box;
          color: #333;
          background: #f5f5f5;
          height: 34px;
          line-height: 26px;
          font-size: 14px;
          border: 1px solid #fff;
          &.active {
            color: #1678f9;
            border-color: #1678f9;
            background: #fff;
          }
          &.disabled {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
