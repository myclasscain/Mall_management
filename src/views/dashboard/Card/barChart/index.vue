<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  mounted() {
    let lineChart = this.$refs.charts
    let myChart = echarts.init(lineChart)
    myChart.setOption({
      xAxis: {
        // 隐藏x轴
        show: false,
        // 均分
        type: 'category'
      },
      yAxis: {
        // 隐藏y轴
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [70, 20, 78, 20, 48, 20, 60, 50, 44, 10, 60, 44, 88, 66]
        }
      ],
      grid: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    })
  }
}
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>
