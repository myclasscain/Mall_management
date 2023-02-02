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
        // x轴的 min|max长度
        min: 0,
        max: 100
      },
      yAxis: {
        // 隐藏y轴
        show: false,
        // 均分
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          // 每条柱的宽度
          barWidth: 10,
          color: 'yellowgreen',
          showBackground: true,
          backgroundStyle: {
            color: '#e2e2e2'
          },
          // 文本标签
          label: {
            show: true,
            // 文本内容
            formatter: '|',
            // 文本位置
            position: 'right'
          }
        }
      ],
      // 布局
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
