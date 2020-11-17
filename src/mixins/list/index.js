export const TableMixin = {
  data() {
    return {
      // 表格对象
      dataTableObj: {
        currPage: 1,
        pageSize: 10,
        total: 0,
        list: []
      },
      // 列表滚动loading
      listLoading: false,
      // 列表是否加载完
      listFinished: false,
      // 下拉刷新loading
      pullLoading: false
    }
  },
  computed: {
    // 渲染的数据表格
    renderList() {
      return this.dataTableObj.list;
    }
  },
  methods: {
    // 下拉刷新方法
    onPullRefresh() {
      this.dataTableObj.currPage = 1;
      this.searchList()
      // 停止下拉刷新
      this.pullLoading = false;
    }
  }
};
