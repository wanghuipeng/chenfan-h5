<template>
  <div class="wrap-box">
    <!-- 搜索结果栏 -->
    <div class="result-bar">
      <div class="list-area">
        <div v-for="(item, index) in renderList" :key="index" class="list-item">
          <div class="item-body">
            <recommend-position-item :position-info="item" :hhId="hhId" />
          </div>
        </div>
      </div>
      <div v-show="loadShow" class="list-loading-text">
        <image src="/static/daLieImgs/common/loading_list.gif" />加载中...
      </div>
      <!-- <div v-if="dataTableObj.total && dataTableObj.total === dataTableObj.list.length" class="no-more">已加载全部</div> -->
      <!-- 列表为空 -->
      <div v-show="loadShow === false && !dataTableObj.list.length" class="empty-area">
        <img src="/static/daLieImgs/position/psition_empty.png" />
        <p>抱歉，未能找到相关的职位</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TableMixin } from '@/mixins/position'
import recommendPositionItem from '../common/recommendPositionItem'
import { getPositionListByCompanyId } from '@/api/position'
export default {
  components: {
    recommendPositionItem
  },
  mixins: [TableMixin],
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
    },
    // 猎头ID
    hhId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      // 查询条件
      queryForm: {
        companyId: this.companyInfo.id
      }
    }
  },
  computed: {},
  watch: {
    companyInfo(val) {
      this.queryForm.companyId = val.id;
      // 查询职位列表
      this.searchList();
    }
  },
  mounted() {
    // 查询职位列表
    this.searchList()
  },
  onUnload() {},
  methods: {
    // 查询职位列表
    searchList() {
      const para = Object.assign({}, this.queryForm)
      para.pageNumber = this.dataTableObj.currPage
      para.pageSize = this.dataTableObj.pageSize
      getPositionListByCompanyId(para).then(res => {
        this.loadShow = false;
        if (res.records) {
          let list = [];
          if (para.pageNumber === 1) {
            list = res.records
          } else {
            list = this.dataTableObj.list.concat(res.records)
          }
          this.dataTableObj.total = res.total
          this.$set(this.dataTableObj, 'list', list)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import '~@/assets/less/together/index.less';
.wrap-box {
  .result-bar {
    position: relative;
    .list-area{
      padding: 12px 20px 0;
      .list-item{
        padding: 16px 0;
        border-bottom: 1px solid #D9D9D9;
        &:last-child{
          border: none;
        }
      }
    }
  }
}
</style>
