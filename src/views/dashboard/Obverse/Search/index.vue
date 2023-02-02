<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="header-title">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :span="12"><LineChart></LineChart></el-col>
      <el-col :span="12"><LineChart></LineChart></el-col>
    </el-row>
    <div class="footer">
      <!-- 
         :default-sort="{ prop: 'date', order: 'descending' }"
       -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="搜索关键字" width="width">
        </el-table-column>
        <el-table-column prop="address" label="用户数" width="width" sortable>
        </el-table-column>
        <el-table-column prop="address" label="周涨幅" width="width" sortable>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        style="text-align: right"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineChart from './LineChart'
export default {
  name: 'Search',
  components: {
    LineChart
  },
  data() {
    return {
      tableData: [{}]
    }
  }
}
</script>

<style scoped>
.header-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  height: 40px;
  line-height: 40px;
  padding: 0;
}
</style>
<style>
.el-dropdown-link {
  cursor: pointer;
}
</style>
