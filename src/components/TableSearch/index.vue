<template>
  <div
    :is="cardWrap ? 'el-card' : 'div'"
    class="table-search"
    shadow="never"
    :class="{ 'table-search-flex': !cardWrap }"
  >
    <!-- 
    ref 打标识
    :model 绑定数据
    v-bind 将父组件传递过来的props 应用到自己身上
    inline 不独占一行
   -->
    <el-form
      ref="formRef"
      :model="formValue"
      size="small"
      :inline="true"
      class="demo-form-inline"
      v-bind="{ ...$attrs }"
    >
      <div :class="layout === 'flex' ? 'form-row-flex' : 'from-row-inline'">
        <div class="form-row-left">
          <template v-for="(searchFormItem, index) in searchForm">
            <!-- 
              formatCollapse: 根据折叠配置计算出当前元素是否要显示 
               -->
            <el-form-item
              :key="searchFormItem.key"
              :style="
                'margin-right:' + (searchFormItem.labelWidth ? 0 : '18px')
              "
              :label="searchFormItem.label"
              :prop="searchFormItem.key"
              :label-width="searchFormItem.labelWidth"
              v-if="!evalOptions(searchFormItem.isHide)"
              v-show="formatCollapse(searchFormItem.key, index)"
            >
              <el-input
                v-if="searchFormItem.type === 'input'"
                v-model="formValue[searchFormItem.key]"
                v-bind="{ ...inputAttrs, ...searchFormItem.otherAttrs }"
                @change="
                  e => {
                    handleChange(e, searchFormItem.key, formValue)
                  }
                "
              />
              <!-- 
                filterable 是否可搜索
               -->
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

              <!-- 日期时间同时选择 -->
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
              <!-- 
                级联选择器
               -->
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
              ></el-cascader>
            </el-form-item>
          </template>
          <el-form-item v-if="layout === 'inline'">
            <el-button
              v-if="!hideSubmit"
              type="primary"
              style="margin-left: 0"
              @click="handleSubmit"
              >查询</el-button
            >
            <el-button v-if="!hideReset" @click="handleReset"> 重置 </el-button>
            <!-- 
              !! : 强制转换为布尔类型
             -->
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
  name: 'TableSearch',
  props: {
    // 用来识别 是否需要使用el-card 组件
    cardWrap: {
      type: Boolean,
      default: true
    },
    // 折叠属性配置
    collapseList: {
      type: [Array, Number],
      default: 0
    },
    // 用来调整每一行的样式
    // 使用flex布局 或者使用inline样式
    layout: {
      type: String,
      default: 'inline'
    },
    // 需要遍历的数据
    searchForm: {
      type: Array,
      default: () => []
    },
    // 自定义属性默认值 (防止报错)
    onChange: {
      type: Function,
      default: () => {}
    },
    inputWidth: {
      // 输入框长度配置
      type: [String, Boolean],
      default: false
    },
    // 是否隐藏提交按钮
    hideSubmit: {
      type: Boolean,
      default: false
    },
    // 是否隐藏重置按钮
    hideReset: {
      type: Boolean,
      default: false
    },
    // 提交按钮的回调 收到整理好的表单的数据
    onSubmit: {
      type: Function,
      default: () => {}
    },
    // 重置按钮回调 收到重置之后的表单数据
    onReset: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      // 收集表单数据  将searchFormItem的key作为属性 数据收集到该属性值上
      formValue: {},
      // 折叠配置
      collapse: true,
      // 统一配置
      inputAttrs: {
        style: { width: '180px' },
        placeholder: '请输入'
      },
      selectAttrs: {
        style: { width: '180px' },
        placeholder: '请选择'
      }
    }
  },
  // 监视修改元素宽度
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
  methods: {
    // option
    evalOptions(option) {
      // 执行 options
      if (typeof option === 'function') {
        return option(this.getFormData())
      }
      return option
    },
    // 获取响应式表单数据
    getFormData() {
      const data = this.formatFormData(this.$data.formValue)
      return data
    },
    // 整理参数 格式化表单数据
    formatFormData(_submitData) {
      // _submitData ---> formValue
      const result = {}
      const subKeyList = []
      // 遍历formValue中的属性返回一个属性的数组 e 为 每一个属性名称
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
    // 根据折叠配置计算出当前元素是否需要显示
    formatCollapse(key, i) {
      // key 为关键词  i 为当前元素的索引
      if (!this.$props.collapseList) {
        return true
      }
      // 组件自身控制折叠属性
      if (!this.$data.collapse) {
        return true
      }
      // 小于该折叠属性值的索引都会被展示 其余的隐藏 (display隐藏)
      if (typeof this.$props.collapseList === 'number') {
        return this.$props.collapseList > i
      }
      return this.$props.collapseList.includes(key)
    },
    // 标签发生变化处理函数
    handleChange(val, key, formData) {
      this.$props.onChange(val, key, formData)
      this.$emit('change', val, key, formData)
    },
    // 提交按钮回调
    handleSubmit() {
      // 表单验证 没有定义 一直为true
      this.$refs.formRef.validate(success => {
        const data = this.formatFormData(this.$data.formValue)
        success && this.onSubmit && this.onSubmit(data)
      })
    },
    // 重置按钮回调
    handleReset() {
      this.$refs.formRef.resetFields()
      this.initFormValue()
      this.onReset && this.onReset(this.formValue)
    },
    // 解决重置之后, 输入无法显示问题
    initFormValue() {
      const formData = {}
      this.searchForm.forEach(item => {
        formData[item.key] = null
      })
      this.formValue = formData
    },
    // 折叠按钮回调
    handleCollapse() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped lang="scss">
.el-icon-arrow-up {
  transition: transform 0.2s;
}
.collapse {
  transform: rotateZ(180deg);
}
// 设置元素的底部外边距
.table-search {
  margin-bottom: 16px;

  // 对组件内部样式进行设置 调整布局
  ::v-deep .el-card__body {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
  }

  // 为flex布局设置样式 (控制search布局)
  .form-row-flex {
    display: flex;
    justify-content: space-between;

    .form-row-left {
      // 换行
      flex-wrap: wrap;
    }
    .form-row-right {
      width: 140px;
      text-align: right;
      white-space: nowrap; // 定义处理元素内的空白
    }
  }

  // 第二种布局
  .from-row-inline {
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

// 当没有使用el-card 需要自己调整布局
.table-search-flex {
  display: flex;
  justify-content: space-between;
}

// 未设置样式
// .demo-form-inline{
// }
</style>
