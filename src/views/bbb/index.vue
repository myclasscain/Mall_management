<template>
  <div>
    <TableSearch2
      :cardWrap="true"
      :layout="'flex'"
      :search-form="searchForm"
      :on-submit="handleQuery"
      :on-reset="handleQuery"
    ></TableSearch2>
  </div>
</template>

<script>
import TableSearch2 from './TableSearch2.vue'
const handleHide = a => {
  console.log(a)
}
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
  { type: 'input', key: 'keyword', otherAttrs: { placeholder: '模板名称' } },
  { type: 'input', key: 'addR', otherAttrs: { placeholder: '模板名称' } }
]

export default {
  name: 'bbb',
  components: {
    TableSearch2
  },
  data() {
    return {
      searchForm
    }
  },
  methods: {
    handleQuery(a) {
      console.log(a)
    }
  }
}
</script>

<style></style>
