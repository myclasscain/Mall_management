<template>
  <div
    :is="cardWrap ? 'el-card' : 'div'"
    class="table-search"
    :class="{ 'table-search-flex': !cardWrap }"
    shadow="never"
  >
    <el-form
      ref="formRef"
      size="small"
      :inline="true"
      :model="formValue"
      class="demo-form-inline"
      v-bind="{ ...$attrs }"
    >
      <div :class="layout === 'flex' ? 'form-row-flex' : 'form-row-inline'">
        <div class="form-row-left">
          <template v-for="(searchFormItem, index) in searchForm">
            <el-form-item
              v-if="!evalOptions(searchFormItem.isHide)"
              v-show="formatCollapse(searchFormItem.key, index)"
              :key="searchFormItem.label"
              :style="
                'margin-right:' + (searchFormItem.labelWidth ? 0 : '18px')
              "
              :label="searchFormItem.label"
              :prop="searchFormItem.key"
              :label-width="searchFormItem.labelWidth"
            >
              <el-input
                v-if="searchFormItem.type === 'input'"
                v-model="formValue[searchFormItem.key]"
                v-bind="{ ...inputAttrs, ...searchFormItem.otherAttrs }"
                @input="
                  e => {
                    handleChange(e, searchFormItem.key, formValue)
                  }
                "
              />

              <el-select
                v-else-if="searchFormItem.type === 'select'"
                v-model="formValue[searchFormItem.key]"
                filterable
                v-bind="{ ...selectAttrs, ...searchFormItem.otherAttrs }"
                @change="
                  e => {
                    handleChange(e, searchFormItem.key, formValue)
                  }
                "
                v-on="searchFormItem.listeners"
              >
                <el-option
                  v-for="option in evalOptions(searchFormItem.options)"
                  :key="option.key"
                  :label="option.value"
                  :value="option.key"
                />
              </el-select>
              <el-date-picker
                v-else-if="searchFormItem.type === 'date'"
                v-model="formValue[searchFormItem.key]"
                :type="(searchFormItem.otherAttrs || {}).type || 'date'"
                :start-placeholder="
                  searchFormItem.otherAttrs &&
                  (searchFormItem.otherAttrs.startPlaceholder || '开始日期')
                "
                :end-placeholder="
                  searchFormItem.otherAttrs &&
                  (searchFormItem.otherAttrs.endPlaceholder || '结束日期')
                "
                :value-format="searchFormItem.valueFormat || 'yyyy-MM-dd'"
                v-bind="{ ...selectAttrs, ...searchFormItem.otherAttrs }"
                @change="
                  e => {
                    handleChange(e, searchFormItem.key, formValue)
                  }
                "
              />
              <el-date-picker
                v-else-if="searchFormItem.type === 'datetime'"
                v-model="formValue[searchFormItem.key]"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-bind="{ ...selectAttrs, ...searchFormItem.otherAttrs }"
                @change="
                  e => {
                    handleChange(e, searchFormItem.key, formValue)
                  }
                "
              />

              <el-cascader
                v-else-if="searchFormItem.type === 'cascader'"
                v-model="formValue[searchFormItem.key]"
                :options="searchFormItem.props"
                v-bind="{ ...selectAttrs, ...searchFormItem.otherAttrs }"
                @change="
                  e => {
                    handleChange(e, searchFormItem.key, formValue)
                  }
                "
                v-on="$listeners"
              />
            </el-form-item>
          </template>
          <el-form-item v-if="layout === 'inline'">
            <el-button
              v-if="!hideSubmit"
              type="primary"
              style="margin-left: 0"
              @click="handleSubmit"
            >
              查询
            </el-button>
            <el-button v-if="!hideReset" @click="handleReset"> 重置 </el-button>
            <el-button v-if="!!collapseList" type="text" @click="handleCollapse"
              >{{ collapse ? '展开' : '折叠'
              }}<i :class="{ 'el-icon-arrow-up': true, collapse: collapse }"
            /></el-button>
          </el-form-item>
        </div>
        <div v-if="layout === 'flex'" class="form-row-right">
          <el-form-item>
            <el-button
              v-if="!hideSubmit"
              type="primary"
              style="margin-left: 0"
              @click="handleSubmit"
            >
              查询
            </el-button>
            <el-button v-if="!hideReset" @click="handleReset"> 重置 </el-button>
            <el-button v-if="!!collapseList" type="text" @click="handleCollapse"
              >{{ collapse ? '展开' : '折叠'
              }}<i :class="{ 'el-icon-arrow-up': true, collapse: collapse }"
            /></el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="el-form-item el-form-item--small action-btn">
      <slot />
      <slot name="new-add-button" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardWrap: {
      type: Boolean,
      default: true
    },
    collapseList: {
      type: [Array, Number],
      default: 0
    },
    layout: {
      type: String,
      default: 'inline'
    },
    hideReset: {
      type: Boolean,
      default: false
    },
    hideSubmit: {
      type: Boolean,
      default: false
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    inputWidth: {
      // 输入框长度配置
      type: [String, Boolean],
      default: false
    },
    onSubmit: {
      type: Function,
      default: () => {}
    },
    onReset: {
      type: Function,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      formValue: {},
      collapse: true,
      inputAttrs: {
        style: { width: '180px' },
        placeholder: '请输入'
      },
      selectAttrs: {
        style: { width: '180px' },
        placeholder: '请选择'
      },
      test: []
    }
  },
  watch: {
    inputWidth: {
      handler: function () {
        if (this.inputWidth) {
          this.inputAttrs.style.width = this.inputWidth
          this.selectAttrs.style.width = this.inputWidth
        }
      },
      immediate: true
    }
  },
  mounted() {
    // this.setDefaultValue()
  },

  methods: {
    // 获取el-form组件
    getFormRef() {
      return this.$refs.formRef
    },
    //
    getFormData() {
      const data = this.formatFormData(this.$data.formValue)
      return data
    },
    setFormValue(data) {
      this.formValue = { ...this.formValue, ...data }
    },
    setFormValueByKey(key, value) {
      this.$set(this.formValue, key, value)
    },
    setDefaultValue() {
      ;(this.$props.searchForm || []).forEach(e => {
        e.value && (this.$data.formValue[e.key] = e.value)
      })
    },
    initFormValue() {
      const formData = {}
      this.searchForm.forEach(item => {
        formData[item.key] = null
      })
      this.formValue = formData
    },
    formatCollapse(key, i) {
      if (!this.$props.collapseList) {
        return true
      }
      if (!this.$data.collapse) {
        return true
      }
      if (typeof this.$props.collapseList === 'number') {
        return this.$props.collapseList > i
      }
      return this.$props.collapseList.includes(key)
    },
    //
    formatFormData(_submitData) {
      // _submitData ---> formValue
      const result = {}
      const subKeyList = []
      Object.keys(_submitData).forEach(e => {
        const currentRender = this.$props.searchForm.find(ee => ee.key === e)
        if (currentRender && currentRender.subKey) {
          const currentSub = _submitData[e] || []
          currentRender.subKey.forEach((eee, iii) => {
            subKeyList.push(eee)
            result[eee] = currentSub[iii]
          })
        } else {
          !subKeyList.includes(e) && (result[e] = _submitData[e])
        }
      })
      return result
    },
    handleChange(val, key, formData) {
      // console.log(this.$props)
      this.$props.onChange(val, key, formData)
      this.$emit('change', val, key, formData)
    },
    handleCollapse() {
      this.collapse = !this.collapse
    },
    handleSubmit() {
      this.$refs.formRef.validate(success => {
        console.log(success)
        const data = this.formatFormData(this.$data.formValue)
        success && this.onSubmit && this.onSubmit(data)
      })
    },
    handleReset() {
      this.$refs.formRef.resetFields()
      this.initFormValue() // 解决重置之后, 输入无法显示问题
      this.onReset && this.onReset(this.formValue)
    },

    evalOptions(option) {
      // 执行 options
      if (typeof option === 'function') {
        return option(this.getFormData())
      }
      return option
    }
  }
}
</script>

<style lang="scss" scoped>
.table-search-flex {
  display: flex;
  justify-content: space-between;
}
.el-icon-arrow-up {
  transition: transform 0.2s;
}
.collapse {
  transform: rotateZ(180deg);
}
.table-search {
  margin-bottom: 16px;

  ::v-deep .el-card__body {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
  }

  // 布局-1
  .form-row-flex {
    display: flex;
    justify-content: space-between;

    .form-row-left {
      flex-wrap: wrap;
    }
    .form-row-right {
      width: 140px;
      text-align: right;
      white-space: nowrap;
    }
  }
  // 布局-2
  .form-row-inline {
    .form-row-left,
    .form-row-right {
      display: inline-block;
    }
  }
  // 重置form-item 边距
  ::v-deep .el-form.el-form--inline .el-form-item {
    margin-top: 6px;
    margin-bottom: 6px;
    margin-right: 0;
  }

  // 插槽(操作栏)
  .action-btn {
    margin-left: 12px;
    margin-bottom: 0;
    ::v-deep .el-button {
      margin: 6px 12px 6px 0;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .el-range-input::placeholder {
    color: #c0c4cc;
  }
}
</style>
