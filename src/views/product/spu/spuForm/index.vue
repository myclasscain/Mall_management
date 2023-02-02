<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="trademark.tmName"
            :value="trademark.id"
            v-for="trademark in trademarkList"
            :key="trademark.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          placeholder="SPU描述"
          type="textarea"
          rows="4"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="imagesList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attrIdAndAttrName"
          :placeholder="`还有${unSelectAttr.length}未选择`"
        >
          <el-option
            v-for="saleAttr in unSelectAttr"
            :key="saleAttr.id"
            :label="saleAttr.name"
            :value="`${saleAttr.id}:${saleAttr.name}`"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSaleAttr"
          :disabled="!attrIdAndAttrName"
          >添加销售属性</el-button
        >
        <el-table style="width: 100%" :data="spu.spuSaleAttrList" border>
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column label="属性名" prop="saleAttrName" width="width">
          </el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="tag in row.spuSaleAttrValueList"
                closable
                :disable-transitions="true"
                @close="handleClose(row.spuSaleAttrValueList, $index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="width">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteSaleAttr($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      // 对话框展示图片地址
      dialogImageUrl: '',
      // dialog显示与隐藏
      dialogVisible: false,
      // 品牌列表数据
      trademarkList: [],
      // 平台全部销售属性
      saleAttrList: [],
      // 收集数据
      spu: {
        category3Id: 0,
        description: '',
        spuName: '',
        tmId: '',
        spuImageList: [
          {
            // imgName: 'string',
            // imgUrl: 'string',
          }
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   saleAttrName: 'string',
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       saleAttrValueName: 'string',
          //     }
          //   ]
          // }
        ]
      },
      // 图片列表的数据
      imagesList: [],
      // 收集选择的销售属性和id
      attrIdAndAttrName: ''
    }
  },
  computed: {
    unSelectAttr() {
      return this.saleAttrList.filter(item => {
        return !this.spu.spuSaleAttrList.some(item1 => {
          return item.name == item1.saleAttrName
        })
      })
    }
  },
  methods: {
    // 照片墙所需方法
    handleRemove(file, fileList) {
      this.imagesList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传成功的回调
    handleSuccess(response, file, fileList) {
      this.imagesList = fileList
    },
    // 添加spu时获取基础数据
    async getBaseData(category3Id) {
      // 收集category3Id
      this.spu.category3Id = category3Id
      // 获取品牌信息列表
      const result = await this.$API.spu.reqBaseTrademarkList()
      if (result.code == 200) {
        this.trademarkList = result.data
      }
      // 获取平台全部销售属性
      const result2 = await this.$API.spu.reqBaseSaleAttrList()
      this.saleAttrList = result2.data
    },
    // 初始化spuForm
    async initSpuData(spu) {
      //  获取spu信息的数据
      const spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code == 200) {
        // 在修改spuInfo的时候,需要向服务器发请求的, 把服务器返回的数据(对象),赋值给spu
        this.spu = spuResult.data
      }

      // 获取品牌列表数据
      const trademarkResult = await this.$API.spu.reqBaseTrademarkList()
      if (trademarkResult.code == 200) {
        this.trademarkList = trademarkResult.data
      }
      // 获取spu图片的数据
      const imagesResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (imagesResult.code == 200) {
        // 由于照片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        // 需要把服务器返回的数据进行修改
        let listArr = imagesResult.data
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })

        this.imagesList = listArr
      }
      // 获取平台全部的销售属性
      const saleAttrResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleAttrResult.code == 200) {
        this.saleAttrList = saleAttrResult.data
      }
    },
    // 添加销售属性
    addSaleAttr() {
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')

      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
      })
      // 修改为默认值
      this.attrIdAndAttrName = ''
    },
    // 删除销售属性
    deleteSaleAttr(index) {
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    // 属性值列表所需方法
    // 添加销售属性值回调
    addSaleAttrValue(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // input失焦回调
    handleInputConfirm(row) {
      // 属性值不能为空
      if (row.inputValue.trim() == '') this.$message('属性值不能为空')
      // 属性值不能重复
      let result = row.spuSaleAttrValueList.some(item => {
        return item.saleAttrValueName == row.inputValue
      })
      if (result) {
        return this.$message('属性值不能重复')
      }
      const newAttrValue = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.inputValue
      }
      row.spuSaleAttrValueList.push(newAttrValue)
      row.inputVisible = false
    },
    // 移除属性值回调
    handleClose(saleAttrValueList, index) {
      saleAttrValueList.splice(index, 1)
    },
    // 添加或修改spu
    async addOrUpdateSpu() {
      // 整理参数
      this.spu.spuImageList = this.imagesList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.imgUrl
        }
      })

      // spuSaleAttrList 身上多余的属性不应该带给服务器
      this.spu.spuSaleAttrList.forEach(item => {
        if (item.hasOwnProperty('inputValue')) {
          item.inputValue = undefined
          item.inputVisible = undefined
        }
      })
      // 发请求
      const result = await this.$API.spu.reqAddOrUpdateSku(this.spu)
      if (result.code == 200) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$emit('changeScene', {
          scene: 0,
          flag: this.spu.id ? '修改' : '添加'
        })
      }
      // 防止数据回显
      Object.assign(this._data, this.$options.data())
    },
    // 取消按钮的回调
    cancle() {
      this.$emit('changeScene', { scene: 0 })
      // 解决数据回显
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
