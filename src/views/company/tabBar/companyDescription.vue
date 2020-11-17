<template>
  <div class="wrap-box">
    <!-- 公司视频&公司介绍 -->
    <div v-if="renderInfo.companyVideoUrl || renderInfo.introduce" class="panel">
      <div class="panel-body">
        <div class="company-video">
          <video
            class="video"
            controls
          >
            <source
              :src="renderInfo.companyVideoUrl"
              type="video/mp4"
            />
          </video>
        </div>
        <div class="company-introduce">
          <p
            :class="['introduce-content', {expand: isExpand}]"
          >{{ renderInfo.introduce }}</p>
          <span v-if="!isExpand && renderInfo.introduce.length > 208" class="introduce-more" @click="isExpand = !isExpand"><span class="more-icon">...</span>查看全部</span>
        </div>
      </div>
    </div>
    <!-- 公司福利 -->
    <div v-if="renderInfo.welfareHighlights.length" class="panel" style="margin-bottom: 20px;">
      <p class="panel-title"><i class="icon iconfont icon-bianzu3"></i>公司福利</p>
      <div class="panel-body">
        <div class="company-welfare">
          <span
            v-for="(item, index) in renderInfo.welfareHighlights"
            :key="index"
            class="welfare-item"
          >{{ item | filterCommonDict(dictData.dicts.lightLabel) }}</span>
        </div>
      </div>
    </div>
    <!-- 办公环境 -->
    <div v-if="renderInfo.companyPictureImgs && renderInfo.companyPictureImgs.length" class="panel">
      <p class="panel-title"><i class="icon iconfont icon-bianzu101"></i>办公环境</p>
      <div class="panel-body">
        <div class="company-pic">
          <van-swipe :show-indicators="false" class="swiper-box">
            <van-swipe-item v-for="(item, index) in renderInfo.companyPictureImgs" :key="index">
              <div class="swiper-item">
                <van-image
                  fit="cover"
                  :src="item"
                  :data-src="item"
                  class="img"
                  @click="previewImg"
                />
                <span class="index">{{ index + 1 }}/{{ renderInfo.companyPictureImgs.length }}</span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
    <!-- 公司地址 -->
    <div v-if="renderInfo.provinceId || renderInfo.cityId || renderInfo.areaId || renderInfo.address" class="panel">
      <p class="panel-title"><i class="icon iconfont icon-bianzu11"></i>公司地址</p>
      <div class="panel-body">
        <div class="company-map">
          <div id="map" class="map"></div>
          <div class="map-des">
            <p class="des-text ellipsis">{{ renderInfo.provinceId | filterCommonDict(dictData.areas) }}{{ renderInfo.cityId | filterLevel2(dictData.areas) }}{{ renderInfo.areaId | filterLevel3(dictData.areas) }}{{ renderInfo.address }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 公司门户 -->
    <div v-if="renderInfo.website || renderInfo.companyWxMp" class="panel">
      <p class="panel-title"><i class="icon iconfont icon-bianzu22"></i>公司门户</p>
      <div class="panel-body">
        <div class="company-door">
          <div v-if="renderInfo.website" class="door-item">
            <p class="item-text ellipsis">
              <span class="text-label">公司官网：</span>
              <span class="text-value">{{ renderInfo.website }}</span>
            </p>
            <span
              v-clipboard:copy="renderInfo.website"
              v-clipboard:success="onCopy"
              class="item-btn"
            >复制</span>
          </div>
          <div v-if="renderInfo.companyWxMp" class="door-item">
            <p class="item-text ellipsis">
              <span class="text-label">微信公众号：</span>
              <span class="text-value">{{ renderInfo.companyWxMp }}</span>
            </p>
            <span
              v-clipboard:copy="renderInfo.companyWxMp"
              v-clipboard:success="onCopy"
              class="item-btn"
            >复制</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
import filters from '@/utils/filters'
export default {
  components: {},
  props: {
    // 字典
    dictData: {
      type: Object,
      required: true
    },
    // 公司信息
    companyInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // 公司介绍是否展开
      isExpand: false
    }
  },
  computed: {
    // 渲染的企业信息
    renderInfo() {
      const data = Object.assign({}, this.companyInfo)
      // 福利
      data.welfareHighlights = data.welfareHighlights
        ? data.welfareHighlights.split(',')
        : []
      return data
    }
  },
  watch: {
    companyInfo(val) {
      // 渲染地图
      this.initMap()
    }
  },
  mounted() {
    // 渲染地图
    this.initMap()
  },
  methods: {
    // 预览图片
    previewImg(e) {
      const imgUrl = e.currentTarget.dataset.src; // 获取当前点击的图片
      ImagePreview([imgUrl])
    },
    // 渲染地图
    initMap() {
      const city = filters.filterLevel2(
        this.companyInfo.cityId,
        this.dictData.areas
      )
      const area = filters.filterLevel3(
        this.companyInfo.areaId,
        this.dictData.areas
      )
      const address = this.companyInfo.address
      const result = []
      if (city) {
        result.push(city)
      }
      if (area) {
        result.push(area)
      }
      if (address) {
        result.push(address)
      }
      const geoAddress = result.join(',')
      console.log(geoAddress)
      const geo = new window.qq.maps.Geocoder()
      geo.getLocation(geoAddress) // 地址
      geo.setComplete(function(res) {
        console.log(res, res.detail.location) // 得到经纬度
        const map = new window.qq.maps.Map(document.getElementById('map'), {
          center: res.detail.location, // 将经纬度加到center属性上
          zoom: 16, // 缩放
          draggable: true, // 是否可拖拽
          scrollwheel: true, // 是否可滚动缩放
          disableDoubleClickZoom: false
        })
        new window.qq.maps.Marker({
          position: res.detail.location, // 标记的经纬度
          animation: window.qq.maps.MarkerAnimation.BOUNCE, // 标记的动画
          map: map // 标记的地图
        })
        new window.qq.maps.CityService({
          // 设置地图
          map: map,
          complete: function(results) {
            console.log(9999, results)
          }
        })
      })
    },
    // 复制文字
    onCopy(e) {
      this.$toast.success('复制成功');
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/less/together/index.less';
.wrap-box {
  padding: 16px 16px 0;
  .panel {
    padding: 16px;
    box-shadow:0px 1px 16px 0px rgba(6,28,57,0.06);
    border-radius:4px;
    overflow: hidden;
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
    .panel-title {
      font-size: 14px;
      color: #343434;
      font-weight: bold;
      margin-bottom: 8px;
      .icon{
        display: inline-block;
        font-size: 24px;
        color: #1678F9;
        margin-right: 4px;
        vertical-align: sub;
      }
    }
    .panel-body {
      .list {
        line-height: 20px;
        font-size: 14px;
        color: #7f7f7f;
        li {
          display: flex;
          .title {
            flex: none;
          }
          .content {
            flex: auto;
            &.white-space{
              width: 100%;
              white-space: pre-wrap;
            }
          }
        }
      }
      .company-video{
        height: 148px;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 8px;
        .video{
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
      .company-introduce {
        position: relative;
        .introduce-content {
          width: 100%;
          max-height: 165px;
          line-height: 20px;
          font-size: 14px;
          color: #7f7f7f;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 8;
          overflow: hidden;
          white-space: pre-wrap;
          &.expand {
            display: block;
            max-height: none;
          }
        }
        .introduce-more {
          width: 5em;
          font-size: 14px;
          color: #1678F9;
          background-color: #fff;
          position: absolute;
          right: 0;
          bottom: 0;
          .more-icon{
            color: #7f7f7f;
          }
        }
      }
      .company-welfare{
        .welfare-item{
          display: inline-block;
          padding: 4px 12px;
          font-size: 12px;
          color: #666666;
          background: rgba(244,246,249,1);
          border-radius: 2px;
          border: 1px solid rgba(224,235,249,1);
          margin: 0 8px 8px 0;
        }
      }
      .company-pic {
        height: 120px;
        overflow: hidden;
        position: relative;
        .swiper-box {
          height: 100%;
        }
        .swiper-item{
          height: 100%;
          overflow: hidden;
          position: relative;
          .img{
            display: block;
            width: 100%;
            height: 100%;
          }
          .index{
            display: block;
            padding: 0 8px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            color: #ffffff;
            background: rgba(0 , 0, 0, .5);
            border-radius: 0 4px 0 4px;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
      .company-map{
        .map{
          width: 100%;
          height: 150px;
          margin-bottom: 10px;
        }
        .map-des{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .des-text{
            flex: auto;
            font-size: 12px;
            color: #666666;
          }
        }
      }
      .company-door{
        .door-item{
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          &:last-child{
            margin-bottom: 0;
          }
          .item-text{
            flex: auto;
            font-size: 12px;
            color: #666666;
          }
          .item-btn{
            flex: none;
            margin-left: 15px;
            font-size: 12px;
            color: #1678F9;
          }
        }
      }
    }
  }
}
</style>
