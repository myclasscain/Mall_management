<template>
  <el-form :inline="true" v-model="cForm">
    <el-form-item label="一级分类">
      <el-select
        :disabled="isDisabled"
        placeholder="请选择"
        v-model="cForm.category1Id"
        @change="handler1"
      >
        <el-option
          v-for="c1 in list1"
          :key="c1.id"
          :label="c1.name"
          :value="c1.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        :disabled="isDisabled"
        placeholder="请选择"
        v-model="cForm.category2Id"
        @change="handler2"
      >
        <el-option
          v-for="c2 in list2"
          :key="c2.id"
          :label="c2.name"
          :value="c2.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        :disabled="isDisabled"
        placeholder="请选择"
        v-model="cForm.category3Id"
        @change="handler3"
      >
        <el-option
          v-for="c3 in list3"
          :key="c3.id"
          :label="c3.name"
          :value="c3.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CategorySelect',
  data() {
    return {
      // 一级分类列表
      list1: [],
      // 二级分类列表
      list2: [],
      // 三级分类列表
      list3: [],
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  props: ['isDisabled'],
  methods: {
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code == 200) {
        this.list1 = result.data
      }
    },
    // 一级分类响应函数
    async handler1() {
      // 清除数据
      this.list2 = []
      this.cForm.category2Id = ''
      this.list3 = []
      this.cForm.category3Id = ''

      let { category1Id } = this.cForm
      // 触发自定义事件
      this.$emit('getCategoryId', {
        level: 1,
        categoryId: category1Id
      })

      // 获取二级分类列表
      const result = await this.$API.attr.reqCategory2List(category1Id)
      if (result.code == 200) {
        this.list2 = result.data
      }
    },
    // 二级分类响应函数
    async handler2() {
      // 清除数据
      this.list3 = []
      this.cForm.category3Id = ''
      let { category2Id } = this.cForm
      // 触发自定义事件
      this.$emit('getCategoryId', {
        level: 2,
        categoryId: category2Id
      })

      // 获取三级分类列表
      const result = await this.$API.attr.reqCategory3List(category2Id)
      if (result.code == 200) {
        this.list3 = result.data
      }
    },
    // 三级分类响应函数
    handler3() {
      let { category3Id } = this.cForm
      // 触发自定义事件
      this.$emit('getCategoryId', {
        level: 3,
        categoryId: category3Id
      })
    }
  },
  mounted() {
    this.getCategory1List()
  }
}
</script>

<style></style>
