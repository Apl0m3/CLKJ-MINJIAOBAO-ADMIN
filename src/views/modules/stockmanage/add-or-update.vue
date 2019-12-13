<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户" prop="userId">
        <el-input v-model="dataForm.userId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="账户分类" prop="type">
        <el-radio-group v-model="dataForm.type" size="medium">
          <el-radio :label="1" border>举办者股权账户</el-radio>
          <el-radio :label="2" border>教职工股权账户</el-radio>
        </el-radio-group>
<!--        <el-input v-model="dataForm.type" placeholder="1.举办者股权账户 2.教职工股权账户"></el-input>-->
      </el-form-item>
      <el-form-item label="股权数量" prop="amount">
        <el-input v-model="dataForm.amount" placeholder="股权数量"></el-input>
      </el-form-item>
      <el-form-item label="所属机构id" prop="parentId">
        <el-input v-model="dataForm.parentId" placeholder="所属机构id"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {stock} from '@/action/stock'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          type: '',
          amount: '',
          parentId: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '1.举办者股权账户 2.教职工股权账户不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '股权数量不能为空', trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: '所属机构id不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            stock.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                console.log(data.stock)
                this.dataForm.userId = data.stock.userId
                this.dataForm.type = data.stock.type
                this.dataForm.amount = data.stock.amount
                this.dataForm.parentId = data.stock.parentId
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'id': this.dataForm.id || undefined,
              'userId': this.dataForm.userId,
              'type': this.dataForm.type,
              'amount': this.dataForm.amount,
              'parentId': this.dataForm.parentId
            }
            var tick = !this.dataForm.id ? stock.add(params) : stock.update(params)
            tick.then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
