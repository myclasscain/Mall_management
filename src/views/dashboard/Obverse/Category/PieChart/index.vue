<template>
  <div class="pie-chart" ref="chart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'PieChart',
  data() {
    return {
      name: 'Search Engine',
      value: '1048'
    }
  },
  mounted() {
    let myChart = echarts.init(this.$refs.chart)
    myChart.setOption({
      title: {
        text: this.name,
        textStyle: {
          fontSize: 16
        },
        subtext: this.value,
        top: 'center',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },

          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    // 绑定事件
    myChart.on('mouseover', params => {
      // params 鼠标移上去那条数据
      this.value = params.data.value
      this.name = params.data.name
      // 重新设置标题
      myChart.setOption({
        title: {
          text: this.name,
          subtext: this.value
        }
      })
    })
  }
}
</script>

<style scoped>
.pie-chart {
  width: 100%;
  height: 300px;
}
</style>
