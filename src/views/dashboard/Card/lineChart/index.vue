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
          type: 'line',
          data: [70, 7, 78, 12, 48, 20, 60, 50, 44, 10, 60],
          // 设置为平滑的曲线
          smooth: true,
          // 拐点样式
          itemStyle: {
            opacity: 0,
            color: 'skyblue'
          },
          // 填充样式
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'skyblue' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'white' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ],
      grid: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
        show: false
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
