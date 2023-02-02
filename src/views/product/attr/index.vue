<template>
  <div>
    <!-- <el-card style="margin: 20px 0">
      <CategorySelect
        @getCategoryId="getCategoryId"
        :isDisabled="!isShowTable"
      />
    </el-card> -->
    <TableSearch
      :hideSubmit="true"
      :hideReset="true"
      @change="handleChange"
      :searchForm="searchForm"
      ref="table_search"
    />
    <el-card>
      <!-- 列表 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="attrList.length < 1"
          @click="addAttrBtn"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                style="margin-left: 8px"
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttrBtn(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加 | 编辑  -->
      <div v-show="!isShowTable">
        <el-form ref="form" :model="attrInfo" :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="cancel">取消</el-button>
        <el-table :data="attrInfo.attrValueList" border style="margin: 10px 0">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值"
                size="mini"
                v-if="row.flag"
                :ref="$index"
                @blur="toggleLook(row)"
                @keyup.native.enter="toggleLook(row)"
              ></el-input>
              <span
                style="display: block"
                v-else
                @click="toggleEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确认删除${row.valueName}？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="attrInfo.attrValueList < 1"
          @click="addOrUpdateAttr"
          >保存</el-button
        >
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
    <!-- dialog对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否删除【{{ currentAttr.attrName }}】？</span>
      <span slot="footer" class="dialog-foter">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteAttr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      // 会话框所需数据
      dialogVisible: false,
      // 当前选中的属性信息
      currentAttr: {},
      // 一级分类id
      category1Id: '',
      // 二级分类id
      category2Id: '',
      // 三级分类id
      category3Id: '',
      // 平台属性列表
      attrList: [],
      // 控制是否展示列表
      isShowTable: true,
      // 收集数据
      attrInfo: {
        attrName: '',
        attrValueList: [
          // {
          //   attrId: undefined,
          //   valueName: ''
          // }
        ],
        // 这里应该是三级分类的id 因为添加属性需要知道,是给哪一个三级分类添加的 (但是在此不能直接获取, 因为对象的属性生成时无序的)
        categoryId: 0,
        categoryLevel: 3
      },
      searchForm: [
        {
          key: 'category1Id',
          label: '一级分类',
          type: 'select',
          options: [],
          otherAttrs: {
            placeholder: '请选择',
            disabled: false
          }
        },
        {
          key: 'category2Id',
          label: '二级分类',
          type: 'select',
          options: [],
          otherAttrs: {
            placeholder: '请选择',
            disabled: false
          }
        },
        {
          key: 'category3Id',
          label: '三级分类',
          type: 'select',
          options: [],
          otherAttrs: {
            placeholder: '请选择',
            disabled: false
          }
        }
      ]
    }
  },
  methods: {
    // 获取平台属性列表
    async getAttrList() {
      let { category1Id, category2Id, category3Id } = this
      const result = await this.$API.attr.reqAttrList({
        category1Id,
        category2Id,
        category3Id
      })
      if (result.code == 200) {
        this.attrList = result.data
      }
    },
    // 添加属性按钮回调
    addAttrBtn() {
      this.isShowTable = false
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        // 添加新的属性值时 传给服务器的数据需要三级分类的id 因为要知道是给那个三级分类添加的属性
        categoryId: this.category3Id,
        categoryLevel: 3
      }
      // 三级列表可用性
      this.searchForm.forEach(item => {
        item.otherAttrs.disabled = !this.isShowTable
      })
    },
    // 编辑属性回调
    editAttr(row) {
      this.isShowTable = false
      // 深度克隆
      this.attrInfo = cloneDeep(row)
      // 遍历属性值列表 为每一个属性值对象添加响应式数据 flag
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })

      this.searchForm.forEach(item => {
        item.otherAttrs.disabled = !this.isShowTable
      })
    },
    // 删除属性按钮
    deleteAttrBtn(row) {
      this.dialogVisible = true
      this.currentAttr = row
    },
    // 删除属性回调
    async deleteAttr() {
      try {
        this.dialogVisible = false
        const result = await this.$API.attr.reqDeleteAttr(this.currentAttr.id)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getAttrList()
      } catch (error) {
        this.$message('删除失败')
      }
    },
    // 添加属性值回调
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        // 对于修改某一个属性的时候, attrInfo是服务器返回的数据 带有id 故新增的时候需要给属性值加上id
        attrId: this.attrInfo.id,
        valueName: '',
        // 用flag来控制是否为编辑模式 还是 查看模式
        flag: true
      })
      // 获取input 实现自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 删除属性值回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 切换为编辑模式
    toggleEdit(row, index) {
      row.flag = true
      // 获取input节点 实现自动聚焦
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 切换为查看模式
    toggleLook(row) {
      // 如果输入的为空 禁止切换为查看模式 因为内容为空 高度会为0 出现无法切换为编辑模式的BUG
      if (row.valueName.trim() == '') {
        return
      }
      row.flag = false
    },
    // 保存按钮回调
    async addOrUpdateAttr() {
      // 整理参数
      // 1.  valueName为空的不应该提交到服务器
      // 2. 删除flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName.trim() != '') {
          delete item.flag
          return true
        }
      })
      // 发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.isShowTable = true

        // 三级列表可用性
        this.searchForm.forEach(item => {
          item.otherAttrs.disabled = !this.isShowTable
        })
        this.getAttrList()
      } catch (error) {
        this.$message('保存失败')
      }
    },
    // 取消按钮回调
    cancel() {
      this.isShowTable = true
      // 三级列表可用性
      this.searchForm.forEach(item => {
        item.otherAttrs.disabled = !this.isShowTable
      })
    },
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
    // 目标元素发生变化时的处理函数
    async handleChange(val, key, formData) {
      switch (key) {
        case 'category1Id':
          this.category2Id = ''
          this.searchForm[1].options = []

          this.category3Id = ''
          this.searchForm[2].options = []

          this.$refs['table_search'].formValue.category2Id = ''
          this.$refs['table_search'].formValue.category3Id = ''

          this.attrList = []

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
          this.category3Id = ''
          this.searchForm[2].options = []

          this.$refs['table_search'].formValue.category3Id = ''

          this.attrList = []

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
          this.getAttrList()
          break
      }
    }
  },
  mounted() {
    this.getCategory1List()
  }
}
</script>

<style></style>
