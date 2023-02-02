<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 列表展示 -->
    <el-table style="width: 100%" :data="list" border>
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="品牌LOGO" width="width">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>

      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="updateTrademark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="text-align: center"
    >
    </el-pagination>
    <!-- 添加页面 -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="tmForm.tmName"
            autocomplete="off"
            style="width: 80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip" style="margin-left: 85px">
              只能上传jpg/png文件，且不超过2M
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    const validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 6) {
        callback(new Error('品牌名称长度在 2 到 6 个字符之间'))
      } else {
        callback()
      }
    }
    return {
      // 当前页码数
      page: 1,
      // 每一页需要展示的数据条数
      limit: 3,
      // 总的数据条数
      total: 0,
      // 品牌列表
      list: [],
      // 控制添加页面的展示
      dialogFormVisible: false,
      // 收集表单数据
      tmForm: {
        logoUrl: '',
        tmName: ''
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { validator: validateTmName, trigger: 'change' }
        ],
        logoUrl: [{ required: true, message: '请选择LOGO' }]
      }
    }
  },
  methods: {
    // 获取品牌列表
    async getTrademarkList(pager = 1) {
      this.page = pager
      let { page, limit } = this
      const result = await this.$API.trade_mark.reqTrademarkList(page, limit)
      if (result.code == 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 改变每页展示的数据条数
    handleSizeChange(size) {
      this.limit = size
      this.getTrademarkList()
    },
    // 展示dialog
    showDialog() {
      this.dialogFormVisible = true
      this.tmForm = {
        logoUrl: '',
        tmName: ''
      }
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加或修改品牌处理函数
    addOrUpdateTrademark() {
      this.$refs.ruleForm.validate(async success => {
        if (success) {
          this.dialogFormVisible = false
          const result = await this.$API.trade_mark.reqAddOrUpdateTrademark(
            this.tmForm
          )
          if (result.code === 200) {
            this.$message({
              showClose: true,
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功',
              type: 'success'
            })
            // 再次获取品牌列表进行展示
            // 要看此次操作时修改还是添加  添加从新获取数据回到第一页  修改从新获取数据 留在当前页
            this.getTrademarkList(this.tmForm.id ? this.page : 1)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 修改品牌处理函数
    updateTrademark(row) {
      this.tmForm = { ...row }
      this.dialogFormVisible = true
    },
    // 删除品牌处理函数
    deleteTrademark(row) {
      this.$confirm(`是否删除${row.tmName}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 用户点击确定时会触发
          const result = await this.$API.trade_mark.reqDeleteTrademark(row.id)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            // 再次获取品牌列表 应处在删除页面 或 删除的前一页面(当页面中只有一条数据 我们删除的还是这条数据 应该退回到前一页)
            this.getTrademarkList(
              this.list.length > 1 ? this.page : this.page - 1
            )
          }
        })
        // 用户点击取消按钮的时候会触发
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted() {
    this.getTrademarkList()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
