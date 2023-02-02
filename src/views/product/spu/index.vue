<template>
  <div>
    <!-- <el-card style="margin: 20px 0"> -->
    <!-- <CategorySelect
        @getCategoryId="getCategoryId"
        :isDisabled="!scene == 0"
      /> -->

    <!-- </el-card> -->
    <TableSearch
      :search-form="searchForm"
      :cardWrap="true"
      :onChange="handleChange"
      :hideSubmit="true"
      :hideReset="true"
      ref="tableSearch"
      @myClick="() => {}"
      @otherClick="() => {}"
    />
    <el-card>
      <!-- 这里未来是有三种场景展示的 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="records.length < 1"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table border :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="SPU名称"
            prop="spuName"
            width="width"
          ></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            width="width"
          ></el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ row }">
              <HintButton
                title="添加sku"
                type="success"
                icon="el-icon-plus"
                size="mini"
                @click="addSku(row)"
              >
              </HintButton>

              <HintButton
                title="修改spu"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateSpu(row)"
              >
              </HintButton>
              <HintButton
                title="查看当前spu全部的sku列表"
                type="info"
                icon="el-icon-info"
                size="mini"
                @click="handle(row)"
              >
              </HintButton>
              <el-popconfirm
                :title="`确定删除【${row.spuName}】吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--  
           @size-change="handleSizeChange"
          @current-change="handleCurrentChange" 
          -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->, sizes,total"
          :total="total"
          style="text-align: center"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu" />
      <SkuForm v-show="scene == 2" @changeScenes="changeScenes" ref="sku" />
    </el-card>
    <!-- dialog SKU列表展示 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
      :before-close="close"
    >
      <el-table :data="skuList" border v-loading="loading">
        <el-table-column
          label="名称"
          prop="skuName"
          width="width"
        ></el-table-column>
        <el-table-column
          label="价格"
          prop="price"
          width="width"
        ></el-table-column>
        <el-table-column
          label="重量"
          prop="weight"
          width="width"
        ></el-table-column>
        <el-table-column label="默认图片" width="width">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './spuForm'
import SkuForm from './skuForm'
export default {
  name: 'Spu',
  data() {
    return {
      // 三级分类id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // spu列表
      records: [],
      // 分页器数据
      page: 1,
      limit: 3,
      total: 0,
      // 控制场景展示
      scene: 0,
      // 控制对话框的显示与隐藏
      dialogTableVisible: false,
      // 当前选中的sku信息
      spu: {},
      // sku列表
      skuList: [],
      // 控制展示loading效果
      loading: true,
      // 给TableSearch的数据
      searchForm: [
        {
          type: 'select',
          // 给后台字段名
          key: 'category1Id',
          label: '一级分类',
          options: [],
          otherAttrs: {
            placeholder: '请选择',
            style: { 'margin-left': '10px' },
            disabled: false
          }
        },
        {
          type: 'select',
          // 给后台字段名
          key: 'category2Id',
          label: '二级分类',
          options: [],
          otherAttrs: {
            placeholder: '请选择',
            style: { 'margin-left': '10px' },
            disabled: false
          }
        },
        {
          type: 'select',
          // 给后台字段名
          key: 'category3Id',
          options: [],
          label: '三级分类',
          otherAttrs: {
            placeholder: '请选择',
            style: { 'margin-left': '10px' },
            disabled: false
          }
        }
      ]
    }
  },
  components: {
    SpuForm,
    SkuForm
  },
  methods: {
    // 获取一级分类列表
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code == 200) {
        this.searchForm[0].options = result.data.map(item => {
          return {
            key: item.id,
            value: item.name
          }
        })
      }
    },
    // 自定义事件回调  获取分类id
    getCategoryId({ level, categoryId }) {
      switch (level) {
        case 1:
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
          // 清空spu列表
          this.records = []
          break
        case 2:
          this.category2Id = categoryId
          this.category3Id = ''
          // 清空spu列表
          this.records = []
          break

        case 3:
          this.category3Id = categoryId
          // 发请求获取数据
          this.getSpuList()
      }
    },
    // 获取spu列表
    async getSpuList(pages = 1) {
      this.page = pages
      let { page, limit, category3Id } = this
      const result = await this.$API.spu.reqSpuList({
        page,
        limit,
        category3Id
      })
      if (result.code == 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 每页数据条数发生改变时的回调
    handleSizeChange(limit) {
      this.limit = limit
      this.getSpuList()
    },
    // 当前页发生改变时的回调
    handleCurrentChange(pages) {
      this.getSpuList(pages)
    },
    // 切换场景
    changeScene({ scene, flag }) {
      // 修改应该停留在当前页
      if (flag == '修改') {
        this.getSpuList(this.page)
      } else {
        this.getSpuList()
      }
      this.scene = scene
      this.toggleDisabled()
    },
    // 这个取消按钮是不需要重新获取数据的
    changeScenes(scene) {
      this.scene = scene
      this.toggleDisabled()
    },
    // 添加spu回调
    addSpu() {
      this.$refs.spu.getBaseData(this.category3Id)
      this.scene = 1
      this.toggleDisabled()
    },
    // 修改spu回调
    updateSpu(row) {
      this.scene = 1
      // 获取自组件SpuForm子组件
      // 在父组件当中可以通过 $refs | $children 获取自组件等等
      this.$refs.spu.initSpuData(row)

      this.toggleDisabled()
    },
    // 删除spu
    async deleteSpu(row) {
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        // SPU的个数大于1 停留在当前页 否则回到上一页
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2
      // 父组件调用子组件的方法---让子组件发3个请求
      this.$refs.sku.getBaseData(this.category1Id, this.category2Id, row)
      this.toggleDisabled()
    },
    // 查看sku列表的回调
    async handle(spu) {
      // console.log(spu)
      this.dialogTableVisible = true
      this.spu = spu
      // 发请求
      const result = await this.$API.spu.reqSkuList(spu.id)
      if (result.code == 200) {
        this.skuList = result.data
        // 将loading置为false
        this.loading = false
      }
    },
    // 关闭对话框的回调
    close(done) {
      // loading再次变为真
      this.loading = true
      // 清除sku列表的数据
      this.skuList = []
      // 关闭对话框
      done()
    },
    // 三级分类标签发生变化时的回调
    async handleChange(val, key, formData) {
      switch (key) {
        case 'category1Id':
          // 清除数据
          this.category2Id = ''
          this.searchForm[1].options = []
          this.$refs.tableSearch.formValue.category2Id = ''

          this.category3Id = ''
          this.searchForm[2].options = []
          this.$refs.tableSearch.formValue.category3Id = ''

          this.records = []

          this.category1Id = val
          // 获取二级分类列表
          const result = await this.$API.attr.reqCategory2List(val)
          if (result.code == 200) {
            this.searchForm[1].options = result.data.map(item => {
              return {
                key: item.id,
                value: item.name
              }
            })
          }
          break

        case 'category2Id':
          // 清除数据
          this.category3Id = ''
          this.searchForm[2].options = []
          this.$refs.tableSearch.formValue.category3Id = ''

          this.records = []

          this.category2Id = val
          // 获取三级分类列表
          const result2 = await this.$API.attr.reqCategory3List(val)
          if (result2.code == 200) {
            this.searchForm[2].options = result2.data.map(item => {
              return {
                key: item.id,
                value: item.name
              }
            })
          }
          break

        case 'category3Id':
          this.category3Id = val
          // 获取spu列表
          this.getSpuList()
          break
      }
    },
    // 修改三级分类的可用性
    toggleDisabled() {
      let flag = this.scene != 0
      this.searchForm.forEach(item => {
        item.otherAttrs.disabled = flag
      })
    }
  },

  mounted() {
    this.getCategory1List()
  }
}
</script>

<style></style>
