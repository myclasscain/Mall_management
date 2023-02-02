<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div class="clearfix" slot="header">
      <!-- 
         v-model="activeName" 
         @tab-click="handleClick"
       -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="right" v-show="activeName == 'sale'">
        <span @click="setDay">今日</span>
        <span @click="serWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- 
          v-model="value2"
          :picker-options="pickerOptions"
         -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="center-echarts" ref="cenEcharts"></div>
        </el-col>
        <el-col :span="6">
          <div class="saleOrder">
            <h4>门店{{ title }}排名</h4>
            <ul>
              <li>
                <span class="lIndex">1</span>
                <span>肯德基</span>
                <span class="saleTotal">323,234</span>
              </li>
              <li>
                <span class="lIndex">2</span>
                <span>麦当劳</span>
                <span class="saleTotal">299,132</span>
              </li>
              <li>
                <span class="lIndex">3</span>
                <span>可乐</span>
                <span class="saleTotal">283,998</span>
              </li>
              <li>
                <span class="otherOrder">4</span>
                <span>海底捞</span>
                <span class="saleTotal">266,223</span>
              </li>
              <li>
                <span class="otherOrder">5</span>
                <span>啤酒</span>
                <span class="saleTotal">223,445</span>
              </li>
              <li>
                <span class="otherOrder">6</span>
                <span>汉堡包</span>
                <span class="saleTotal">219,663</span>
              </li>
              <li>
                <span class="otherOrder">7</span>
                <span>真功夫</span>
                <span class="saleTotal">200,997</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  data() {
    return {
      // 收集tab面板选项
      activeName: 'sale',
      barData: [
        110000, 112000, 110000, 113000, 150000, 160000, 111111, 222222, 188888,
        199999, 150000, 166666
      ],
      // 柱状图画布
      myCharts: null,
      // 收集日期数据
      date: []
    }
  },
  computed: {
    title() {
      return this.activeName == 'sale' ? '销售额' : '访问量'
    },
    ...mapState({
      mockData: state => state.home.mockData
    })
  },
  methods: {
    // 设置为今日
    setDay() {
      let today = dayjs().format('YYYY-MM-DD')
      this.date = [today, today]
      this.myCharts.setOption({
        xAxis: [
          {
            data: [
              '9:00',
              '10:00',
              '11:00',
              '12:00',
              '13:00',
              '14:00',
              '15:00',
              '16:00',
              '17:00',
              '18:00',
              '19:00',
              '20:00'
            ]
          }
        ],
        series: [
          {
            data: [80, 70, 60, 120, 100, 130, 80, 50, 40, 80, 110, 80]
          }
        ]
      })
    },
    // 设置为本周
    serWeek() {
      let start = dayjs().day(1).format('YYYY-MM-DD')
      let end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
      this.myCharts.setOption({
        xAxis: [
          {
            data: [
              '星期一',
              '星期二',
              '星期三',
              '星期四',
              '星期五',
              '星期六',
              '星期天'
            ]
          }
        ],
        series: [
          {
            data: [1000, 1200, 1300, 1100, 1220, 1700, 1500]
          }
        ]
      })
    },
    // 设置为本月
    setMonth() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
      this.myCharts.setOption({
        xAxis: [
          {
            data: ['第一周', '第二周', '第三周', '第四周']
          }
        ],
        series: [
          {
            data: [10000, 12000, 10000, 13000]
          }
        ]
      })
    },
    // 设置为本年
    setYear() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
      this.myCharts.setOption({
        xAxis: [
          {
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        ],
        series: [
          {
            data: [
              110000, 112000, 110000, 113000, 150000, 160000, 111111, 222222,
              188888, 199999, 150000, 166666
            ]
          }
        ]
      })
    }
  },
  watch: {
    activeName: {
      handler(newVal) {
        let barTitle = ''
        if (newVal == 'visit') {
          this.barData = [220, 110, 88, 99, 220, 76, 40, 52, 200, 334, 390, 330]
          barTitle = '访问量(万)'
        } else {
          this.barData = [
            110000, 112000, 110000, 113000, 150000, 160000, 111111, 222222,
            188888, 199999, 150000, 166666
          ]
          barTitle = '销售额'
        }
        this.myCharts.setOption({
          title: {
            text: barTitle
          },
          series: [
            {
              data: this.barData
            }
          ]
        })
      }
    }
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.cenEcharts)
    this.myCharts.setOption({
      title: {
        text: '销售额趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],

          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: [
            110000, 112000, 110000, 113000, 150000, 160000, 111111, 222222,
            188888, 199999, 150000, 166666
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>
.clearfix {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 20px;
}

.right span {
  margin: 0 10px;
}

.el-date-editor {
  width: 220px;
  margin: 0 20px;
}
.el-tabs--top {
  width: 100%;
}

.el-col {
  height: 300px;
}
.center-echarts {
  width: 100%;
  height: 95%;
}

.saleOrder {
  width: 100%;
  height: 100%;
}
.saleOrder h4 {
  height: 5%;
  margin-bottom: 20px;
  margin-top: 0;
}
.saleOrder ul {
  width: 100%;
  height: 270px;
  margin: 0;
  list-style: none;
  padding: 0 20px 0 0;
}
.saleOrder ul li {
  margin-bottom: 15px;
}
.saleOrder ul .lIndex {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: black;
  color: white;
  margin-right: 20px;
  text-align: center;
}
.saleOrder ul .saleTotal {
  float: right;
}
.saleOrder ul .otherOrder {
  display: inline-block;
  margin-right: 26px;
  text-align: center;
  padding-left: 5px;
}
</style>
