<template>
  <el-dialog
    :title="dataForm.status !== '' ? '查看' : '审核'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item  label="申请人" prop="userName">
        <el-input :disabled="dataForm.id !== 0" v-model="dataForm.userName" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="提现金额" prop="amount">
        <el-input :disabled="dataForm.id !== 0" v-model="dataForm.amount" placeholder="提现金额"></el-input>
      </el-form-item>
      <!--        审核-->
      <el-form-item    label="审核状态" prop="status">
        <el-select :disabled="showStatusVisible === 1" v-model="dataForm.status"  >
          <el-option label="审核通过" :value="1">
            审核通过
          </el-option>
          <el-option label="审核失败" :value="2">
            审核失败
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.status ===2 " label="失败原因" prop="reason">
        <el-input :disabled="showStatusVisible === 1" v-model="dataForm.reason" placeholder="请输入审核失败原因"></el-input>
      </el-form-item>

      <el-form-item v-if="showStatusVisible === 1" label="审核人" prop="auditUserName">
        <el-input :disabled="dataForm.id !== 0" v-model="dataForm.auditUserName" placeholder="审核人id"></el-input>
      </el-form-item>
      <el-form-item v-if="showStatusVisible === 1" label="审核时间" prop="auditTime">
        <el-input :disabled="dataForm.id !== 0" v-model="dataForm.auditTime" placeholder="审核时间"></el-input>
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
          userName:'',
          amount: '',
          status: '',
          reason: '',
          auditId: '',
          auditUserName:'',
          auditTime: ''
        },
        showStatusVisible:2, //1展示审核人和审核时间 2 不展示
        dataRule: {
          // userId: [
          //   { required: true, message: '申请人id不能为空', trigger: 'blur' }
          // ],
          // amount: [
          //   { required: true, message: '提现金额不能为空', trigger: 'blur' }
          // ],
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
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            withdraw.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                console.log(data)
                this.dataForm.userId = data.withdraw.userId  //申请人的id
                this.dataForm.userName = data.withdraw.userName  //申请人的姓名
                this.dataForm.amount = data.withdraw.amount
                this.dataForm.status = parseInt(data.withdraw.status) === 0 ? "": parseInt(data.withdraw.status)
                //如果状态为审核 则不展示审核时间和审核人 1展示审核人和审核时间 2 不展示
                if(this.dataForm.status !== ""){
                  this.showStatusVisible = 1
                }
                this.dataForm.reason = data.withdraw.reason
                this.dataForm.auditId = data.withdraw.auditId //审核人的id
                this.dataForm.auditUserName = data.withdraw.auditUserName //审核人姓名
                this.dataForm.auditTime = data.withdraw.auditTime
                this.dataForm.createTime = data.withdraw.createTime //提交审核时间

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
            }
            var tick = !this.dataForm.id ? withdraw.add(params) : withdraw.verify(params)
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
