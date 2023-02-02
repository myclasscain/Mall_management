<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{ skuInfo.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="sku.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="价格(元)"
          v-model="sku.price"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="sku.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="规格描述"
          v-model="sku.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item
            :label="spuAttr.attrName"
            v-for="spuAttr in spuAttrInfoList"
            :key="spuAttr.id"
          >
            <el-select
              placeholder="请选择"
              v-model="spuAttr.attrIdAndValueId"
              style="margin: 0 10px 10px 0"
            >
              <el-option
                :label="attrValue.valueName"
                :value="`${spuAttr.id}:${attrValue.id}`"
                v-for="attrValue in spuAttr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" label-width="80px" :inline="true">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="saleAttr in spuSaleAttrList"
            :key="saleAttr.id"
            style="margin: 0 10px 10px 0"
          >
            <el-select
              placeholder="请选择"
              v-model="saleAttr.saleAttrIdAndValueId"
            >
              <el-option
                :label="saleAttrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="spuImageList"
          @selection-change="handleSelectionChange"
          ref="multipleTable"
          >>
          <el-table-column type="selection" align="center" width="55">
          </el-table-column>
          <el-table-column label="图片">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="setDefaultImg(row)"
                >设置默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // 存储图片的数据
      spuImageList: [],
      // 存储销售属性的数据
      spuSaleAttrList: [],
      // 存储平台属性的数据
      spuAttrInfoList: [],
      // 收集sku数据的字段
      sku: {
        // 第一类收集的数据 父组件给的数据
        spuId: 0,
        tmId: 0,
        category3Id: 0,
        // 第二类收集的数据 数据双向绑定收集v-model
        price: '',
        weight: '',
        skuDesc: '',
        skuName: '',

        // 第三类 需要自己写代码
        // 默认图片
        skuDefaultImg: '',
        //平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // }
        ],
        // 收集图片的字段
        skuImageList: [
          // {
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   isDefault: 'string',
          //   spuImgId: 0
          // }
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0
          // }
        ]
      },
      // 父组件传递过来的数据
      skuInfo: {},
      // 收集选中的图片列表
      imageList: []
    }
  },
  methods: {
    // 获取skuForm的数据
    async getBaseData(category1Id, category2Id, currentSpu) {
      // 收集来自于父组件给与的数据
      this.sku.category3Id = currentSpu.category3Id
      this.sku.tmId = currentSpu.tmId
      this.sku.spuId = currentSpu.id
      this.skuInfo = currentSpu
      // 获取图片列表
      const imagesResult = await this.$API.spu.reqSpuImageList(currentSpu.id)
      if (imagesResult.code == 200) {
        imagesResult.data.forEach(item => {
          item.isDefault = 0
        })
        this.spuImageList = imagesResult.data
      }
      // 获取销售属性数据
      const saleAttrResult = await this.$API.spu.reqSpuSaleAttrList(
        currentSpu.id
      )
      if (saleAttrResult.code == 200) {
        this.spuSaleAttrList = saleAttrResult.data
      }
      // 获取平台销售属性数据
      const spuAttrInfoResult = await this.$API.spu.reqSpuAttrInfoList(
        category1Id,
        category2Id,
        currentSpu.category3Id
      )
      if (spuAttrInfoResult.code == 200) {
        this.spuAttrInfoList = spuAttrInfoResult.data
      }
    },
    // 取消按钮
    cancel() {
      this.$emit('changeScenes', 0)
      // 清除数据
      Object.assign(this._data, this.$options.data())
    },
    // 设置默认图片
    setDefaultImg(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      // 默认图片必须为被选中状态
      let flag = this.imageList.some(item => {
        return item === row
      })
      if (!flag) {
        this.$refs.multipleTable.toggleRowSelection(row)
      }
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    // 收集被选中的图片
    handleSelectionChange(selection) {
      // 取消按钮时 被取消的元素的 isDefault必须为0 因为没有选择是不可以成为默认图片的
      if (this.imageList.length > selection.length) {
        const targetArr = this.imageList.filter(item => {
          return !selection.some(item1 => {
            return item.id === item1.id
          })
        })
        targetArr[0].isDefault = 0
      }
      this.imageList = selection
    },
    // 保存按钮的回调
    async save() {
      // 整理参数

      // 第二种方法
      // 整理平台属性数据
      const { spuAttrInfoList, sku, spuSaleAttrList, imageList } = this
      const result = spuAttrInfoList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          let [attrId, valueId] = item.attrIdAndValueId.split(':')
          pre.push({
            attrId,
            valueId
          })
        }
        return pre
      }, [])
      sku.skuAttrValueList = result
      // 整理销售属性数据
      const result2 = spuSaleAttrList.reduce((pre, item) => {
        if (item.saleAttrIdAndValueId) {
          let [saleAttrId, saleAttrValueId] =
            item.saleAttrIdAndValueId.split(':')
          pre.push({
            saleAttrId,
            saleAttrValueId
          })
        }
        return pre
      }, [])
      sku.skuSaleAttrValueList = result2
      // 整理图片数据
      sku.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发请求
      const saveResult = await this.$API.spu.reqSaveSkuInfo(sku)
      if (saveResult.code == 200) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$emit('changeScenes', 0)
        // 清除数据
        Object.assign(this._data, this.$options.data())
      }
    }
  }
}
</script>

<style></style>
