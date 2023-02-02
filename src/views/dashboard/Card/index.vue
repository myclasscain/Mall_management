<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6"
        ><el-card>
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              周同比&nbsp;&nbsp;56.67%&nbsp;&nbsp;
              <svg
                t="1665400079385"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5225"
                width="16"
                height="16"
              >
                <path
                  d="M325.456471 862.280661"
                  p-id="5226"
                  fill="#d81e06"
                ></path>
                <path
                  d="M882.057788 862.280661"
                  p-id="5227"
                  fill="#d81e06"
                ></path>
                <path
                  d="M236.028491 877.160382"
                  p-id="5228"
                  fill="#d81e06"
                ></path>
                <path
                  d="M960.132455 877.160382"
                  p-id="5229"
                  fill="#d81e06"
                ></path>
                <path
                  d="M63.683483 788.736998"
                  p-id="5230"
                  fill="#d81e06"
                ></path>
                <path
                  d="M958.469023 788.736998"
                  p-id="5231"
                  fill="#d81e06"
                ></path>
                <path
                  d="M64.77753 858.792098"
                  p-id="5232"
                  fill="#d81e06"
                ></path>
                <path
                  d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z"
                  p-id="5233"
                  fill="#d81e06"
                ></path>
                <path
                  d="M959.523505 858.792098"
                  p-id="5234"
                  fill="#d81e06"
                ></path></svg
              >日同比&nbsp;&nbsp;19.16%&nbsp;&nbsp;
              <svg
                t="1665401005111"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6261"
                width="16"
                height="16"
              >
                <path
                  d="M325.456471 862.280661"
                  p-id="6262"
                  fill="#1afa29"
                ></path>
                <path
                  d="M882.057788 862.280661"
                  p-id="6263"
                  fill="#1afa29"
                ></path>
                <path
                  d="M236.028491 877.160382"
                  p-id="6264"
                  fill="#1afa29"
                ></path>
                <path
                  d="M960.132455 877.160382"
                  p-id="6265"
                  fill="#1afa29"
                ></path>
                <path
                  d="M63.683483 788.736998"
                  p-id="6266"
                  fill="#1afa29"
                ></path>
                <path
                  d="M958.469023 788.736998"
                  p-id="6267"
                  fill="#1afa29"
                ></path>
                <path
                  d="M64.77753 858.792098"
                  p-id="6268"
                  fill="#1afa29"
                ></path>
                <path
                  d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z"
                  p-id="6269"
                  fill="#1afa29"
                ></path>
                <path
                  d="M959.523505 858.792098"
                  p-id="6270"
                  fill="#1afa29"
                ></path>
              </svg>
            </template>
            <template slot="footer"> 日销售额￥ 12423 </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card>
          <Detail title="访问量" count="88460">
            <template slot="footer"> 日访问量 1234 </template>
            <template slot="charts">
              <LineChart></LineChart>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card>
          <Detail title="支付笔数" count="88460">
            <template slot="footer"> 转化率65% </template>
            <template slot="charts"> <BarChart /> </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6"
        ><el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="footer">
              周同比&nbsp;&nbsp;12%&nbsp;&nbsp;
              <svg
                t="1665400079385"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5225"
                width="16"
                height="16"
              >
                <path
                  d="M325.456471 862.280661"
                  p-id="5226"
                  fill="#d81e06"
                ></path>
                <path
                  d="M882.057788 862.280661"
                  p-id="5227"
                  fill="#d81e06"
                ></path>
                <path
                  d="M236.028491 877.160382"
                  p-id="5228"
                  fill="#d81e06"
                ></path>
                <path
                  d="M960.132455 877.160382"
                  p-id="5229"
                  fill="#d81e06"
                ></path>
                <path
                  d="M63.683483 788.736998"
                  p-id="5230"
                  fill="#d81e06"
                ></path>
                <path
                  d="M958.469023 788.736998"
                  p-id="5231"
                  fill="#d81e06"
                ></path>
                <path
                  d="M64.77753 858.792098"
                  p-id="5232"
                  fill="#d81e06"
                ></path>
                <path
                  d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z"
                  p-id="5233"
                  fill="#d81e06"
                ></path>
                <path
                  d="M959.523505 858.792098"
                  p-id="5234"
                  fill="#d81e06"
                ></path></svg
              >&nbsp;&nbsp;日同比&nbsp;&nbsp;11%&nbsp;&nbsp;
              <svg
                t="1665401005111"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6261"
                width="16"
                height="16"
              >
                <path
                  d="M325.456471 862.280661"
                  p-id="6262"
                  fill="#1afa29"
                ></path>
                <path
                  d="M882.057788 862.280661"
                  p-id="6263"
                  fill="#1afa29"
                ></path>
                <path
                  d="M236.028491 877.160382"
                  p-id="6264"
                  fill="#1afa29"
                ></path>
                <path
                  d="M960.132455 877.160382"
                  p-id="6265"
                  fill="#1afa29"
                ></path>
                <path
                  d="M63.683483 788.736998"
                  p-id="6266"
                  fill="#1afa29"
                ></path>
                <path
                  d="M958.469023 788.736998"
                  p-id="6267"
                  fill="#1afa29"
                ></path>
                <path
                  d="M64.77753 858.792098"
                  p-id="6268"
                  fill="#1afa29"
                ></path>
                <path
                  d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z"
                  p-id="6269"
                  fill="#1afa29"
                ></path>
                <path
                  d="M959.523505 858.792098"
                  p-id="6270"
                  fill="#1afa29"
                ></path></svg
            ></template>
            <template slot="charts"> <ProgressChart /> </template
          ></Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './lineChart'
import BarChart from './barChart'
import ProgressChart from './progressChart'
export default {
  name: 'Card',
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart
  }
}
</script>

<style></style>
