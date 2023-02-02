<!--
 * @Author: zhao - 🍉
 * @Date: 2022-10-13 21:22:46
 * @LastEditTime: 2022-10-13 21:26:23
 * @LastEditors: zhao - 🍉
 * @Description:
 * @FilePath: /vanke-gz-owner-admin/src/views/wxMessages/demo.vue
-->
<template>
  <!-- 
   :cardWrap="false"   控制最外层元素标签
   :collapseList=""  （数组 或 数字类型）
      1. 数组: 里面的每一个元素(字符串)应该为 关键字  
      2. 数字: 即需要展示的元素个数-1


   标签发生变化时处理函数:   (函数接收三个参数: val 变化后的值 key 关键词 formData 收集的数据)
   方式一: :onChange="处理函数"  
   方式二: @change="处理函数

   searchForm中的每一个 searchFormItem

   isHide 字段: (控制元素的显示与隐藏 v-if 控制)
      1. 属性值为非函数时, 控制该元素是否被展示
      2. 属性值为函数时, 该函数会被执行, 函数会收到一个参数

   key字段: 关键词

   type: 内部元素标签类型

   otherAttrs: 其他参数 (placeholder type startPlaceholder endPlaceholder)

   valueFormat: 对收集的数据格式化格式

   注意: 写在TableSearch上的自定义属性会被绑定在el-form标签上
    <el-form
      ref="formRef"
      size="small"
      :inline="true"
      :model="formValue"
      class="demo-form-inline"
      v-bind="{ ...$attrs }"
    >
 -->
  <div>
    <TableSearch
      :search-form="searchForm"
      :on-submit="handleQuery"
      :on-reset="handleQuery"
      :collapseList="['sex', 'birth']"
    />
  </div>
</template>

<script>
import TableSearch from './TableSearch'

// const handleHide = a => {
//   console.log(a)
// }
const searchForm = [
  {
    type: 'select',
    // 给后台字段名
    key: 'sex',
    options: [
      { key: 1, value: '男' },
      { key: 2, value: '女' }
    ],
    otherAttrs: { placeholder: '性别' }
  },
  { type: 'date', key: 'birth', otherAttrs: { placeholder: '生日' } },
  {
    type: 'datetime',
    key: 'appointmentTime',
    otherAttrs: { placeholder: '预约时间' }
  },
  { type: 'input', key: 'keyword', otherAttrs: { placeholder: '模板名称' } },
  { type: 'input', key: 'addR', otherAttrs: { placeholder: '模板名称' } },
  {
    type: 'cascader',
    key: 'navigation',

    props: [
      {
        value: 1,
        label: '东南',
        children: [
          {
            value: 2,
            label: '上海',
            children: [
              { value: 3, label: '普陀' },
              { value: 4, label: '黄埔' },
              { value: 5, label: '徐汇' }
            ]
          },
          {
            value: 7,
            label: '江苏',
            children: [
              { value: 8, label: '南京' },
              { value: 9, label: '苏州' },
              { value: 10, label: '无锡' }
            ]
          },
          {
            value: 12,
            label: '浙江',
            children: [
              { value: 13, label: '杭州' },
              { value: 14, label: '宁波' },
              { value: 15, label: '嘉兴' }
            ]
          }
        ]
      },
      {
        value: 17,
        label: '西北',
        children: [
          {
            value: 18,
            label: '陕西',
            children: [
              { value: 19, label: '西安' },
              { value: 20, label: '延安' }
            ]
          },
          {
            value: 21,
            label: '新疆维吾尔族自治区',
            children: [
              { value: 22, label: '乌鲁木齐' },
              { value: 23, label: '克拉玛依' }
            ]
          }
        ]
      }
    ]
  }
]
export default {
  components: { TableSearch },
  data() {
    return {
      test: {
        time: ''
      },
      searchForm
    }
  },
  methods: {
    handleQuery(a) {
      console.log(a)
    },
    handleHide(a) {
      console.log(a)
    },
    handleChange(val, key, formData) {
      console.log(val)
    }
  },
  mounted() {
    // console.log(this.$options.data())
    // console.log(123, this.$data === this._data)
    // console.log(this)
  }
}
</script>

<style></style>
