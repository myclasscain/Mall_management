<template>
  <el-card>
    <div slot="header">
      <div class="sale-option">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value" size="small">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <PieChart></PieChart>
  </el-card>
</template>

<script>
import PieChart from './PieChart'
export default {
  name: 'Category',
  data() {
    return {
      value: '全部渠道'
    }
  },
  components: {
    PieChart
  }
}
</script>

<style scoped>
.sale-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #eee;
}
</style>
