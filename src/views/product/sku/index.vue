<template>
  <div>
    <el-table style="width: 100%" border :data="records" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" width="80">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row }">
          <!-- 该图标显示的是商品正在处于的状态 -->
          <el-button
            type="success"
            icon="el-icon-bottom"
            size="mini"
            v-if="row.isSale == 0"
            @click="onSale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-else
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="$message('正在开发中...')"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteSku(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="getSkuList"
      :current-page="page"
      :page-sizes="[5, 10, 20]"
      :page-size="100"
      layout="prev, pager, next, jumper,->,total,sizes"
      :total="total"
      style="text-align: center"
    >
    </el-pagination>
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="50%"
      :show-close="false"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16"
          ><el-tag
            type="success"
            v-for="attr in skuInfo.skuAttrValueList"
            :key="attr.id"
            style="margin-right: 10px; margin-bottom: 10px"
            >{{ attr.attrName }}-{{ attr.valueName }}</el-tag
          ></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="400px" style="width: 400px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" width="400px" height="400px" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      records: [],
      loading: true,
      drawer: false,
      direction: 'rtl',
      skuInfo: {}
    }
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages
      let { page, limit } = this
      const result = await this.$API.sku.reqSkuList(page, limit)
      if (result.code == 200) {
        this.records = result.data.records
        this.total = result.data.total
        this.loading = false
      }
    },
    sizeChange(limit) {
      this.loading = true
      this.limit = limit
      this.getSkuList()
    },
    // 上架
    async onSale(row) {
      try {
        this.loading = true
        const result = await this.$API.sku.reqOnSale(row.id)
        row.isSale = 1
        this.$message({
          type: 'success',
          message: '上架成功'
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 下架
    async cancelSale(row) {
      try {
        this.loading = true
        const result = await this.$API.sku.reqCancelSale(row.id)
        row.isSale = 0
        this.$message({
          type: 'success',
          message: '下架成功'
        })
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    // 查看当前sku信息
    async getSkuInfo(row) {
      this.drawer = true
      const result = await this.$API.sku.reqSkuInfo(row.id)
      if (result.code == 200) {
        this.skuInfo = result.data
      }
    },
    async deleteSku(row) {
      this.loading = true
      const result = await this.$API.sku.reqDeleteSku(row.id)
      if (result.code == 200) {
        this.loading = false
        this.$message({
          type: 'success',
          message: '删除成功'
        })

        this.getSkuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    }
  },
  mounted() {
    this.getSkuList()
  }
}
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style scoped>
.el-row .el-col-5 {
  font-size: 18px;
  text-align: right;
  font-weight: bold;
}
.el-col {
  margin: 10px;
}
/* 深度选择器 */
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #99a9bf;
}
</style>
