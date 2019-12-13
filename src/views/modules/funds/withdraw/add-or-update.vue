<template>
  <el-dialog
    :title="dataForm.id !== 0 ? '查看' : '审核'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item :disabled="dataForm.id === 0" label="申请人" prop="userId">
        <el-input  v-model="dataForm.userId" placeholder="申请人id"></el-input>
      </el-form-item>
      <el-form-item label="提现金额" prop="amount">
        <el-input v-model="dataForm.amount" placeholder="提现金额"></el-input>
      </el-form-item>
      <el-form-item label="审核状态" prop="status">
        <el-input v-model="dataForm.status" placeholder="审核状态 1成功 2失败"></el-input>
      </el-form-item>
      <el-form-item label="审核失败原因" prop="reason">
        <el-input v-model="dataForm.reason" placeholder="审核失败原因"></el-input>
      </el-form-item>
      <el-form-item label="审核人id" prop="auditId">
        <el-input v-model="dataForm.auditId" placeholder="审核人id"></el-input>
      </el-form-item>
      <el-form-item label="审核时间" prop="auditTime">
        <el-input v-model="dataForm.auditTime" placeholder="审核时间"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {withdraw} from '../../../../action/withdraw'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          amount: '',
          status: '',
          reason: '',
          auditId: '',
          auditTime: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '申请人id不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '提现金额不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '审核状态 1成功 2失败不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '审核失败原因不能为空', trigger: 'blur' }
          ],
          auditId: [
            { required: true, message: '审核人id不能为空', trigger: 'blur' }
          ],
          auditTime: [
            { required: true, message: '审核时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        console.log("1  哈哈哈哈哈")
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            withdraw.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                console.log("哈哈哈哈哈")
                this.dataForm.userId = data.withdraw.userId
                this.dataForm.amount = data.withdraw.amount
                this.dataForm.status = data.withdraw.status
                this.dataForm.reason = data.withdraw.reason
                this.dataForm.auditId = data.withdraw.auditId
                this.dataForm.auditTime = data.withdraw.auditTime
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
              'amount': this.dataForm.amount,
              'status': this.dataForm.status,
              'reason': this.dataForm.reason,
              'auditId': this.dataForm.auditId,
              'auditTime': this.dataForm.auditTime
            }
            var tick = !this.dataForm.id ? withdraw.add(params) : withdraw.update(params)
            tick.then(({data}) => {
              if (data && data.code === 200) {
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
