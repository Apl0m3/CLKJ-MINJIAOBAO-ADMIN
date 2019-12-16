<template>
  <el-dialog
    :title="dataForm.status !== 0 ? '查看' : '审核'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item label="返利平台" prop="thirdPartyName">
        <el-input :disabled="dataForm.id !== 0 " v-model="dataForm.thirdPartyName" placeholder="返利平台"></el-input>
      </el-form-item>
      <el-form-item label="返利金额" prop="amount">
        <el-input :disabled="dataForm.id !== 0 " v-model="dataForm.amount" placeholder="返利金额"></el-input>
      </el-form-item>

      <el-form-item label="获得返利人姓名" prop="userName">
        <el-input :disabled="dataForm.id !== 0 " v-model="dataForm.userName" placeholder="获得返利人姓名"></el-input>
      </el-form-item>
      <el-form-item label="第三方返利时间" prop="createTime">
        <el-input :disabled="dataForm.id !== 0 " v-model="dataForm.createTime" placeholder="第三方返利时间"></el-input>
      </el-form-item>
      <!--        审核-->
      <el-form-item    label="审核状态" prop="status">
        <el-select :disabled="showStatusVisible === 1" v-model="dataForm.status"  >
          <el-option  label="审核通过" :value="1">
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
      <el-form-item v-if="showStatusVisible === 1" label="审核人姓名" prop="auditUserName">
        <el-input :disabled="dataForm.id !== 0 " v-model="dataForm.auditUserName" placeholder="审核人姓名"></el-input>
      </el-form-item>
      <el-form-item v-if="showStatusVisible === 1" label="审核时间" prop="auditTime">
        <el-input :disabled="dataForm.id !== 0 " v-model="dataForm.auditTime" placeholder="审核时间"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {cashBack} from '../../../../action/thirdpartycashback'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          thirdPartyName: '',
          amount: '',
          userId: '',
          userName: '',
          createTime: '',
          auditUserId: '',
          auditUserName: '',
          auditTime: '',
          status: '',
          reason: ''
        },
        showStatusVisible:2,
        dataRule: {
          thirdPartyName: [
            { required: true, message: '返利平台不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '返利金额不能为空', trigger: 'blur' }
          ],
          userId: [
            { required: true, message: '获得返利人id不能为空', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '获得返利人姓名不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '第三方返利时间不能为空', trigger: 'blur' }
          ],
          auditUserId: [
            { required: true, message: '审核人id不能为空', trigger: 'blur' }
          ],
          auditUserName: [
            { required: true, message: '审核人姓名不能为空', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '审核时间不能为空', trigger: 'blur' }
          ],
          auditTime: [
            { required: true, message: '审核时间不能为空', trigger: 'blur' }
          ],
          status: [
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
            cashBack.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.thirdPartyName = data.thirdPartyCashBack.thirdPartyName
                this.dataForm.amount = data.thirdPartyCashBack.amount
                this.dataForm.userId = data.thirdPartyCashBack.userId
                this.dataForm.userName = data.thirdPartyCashBack.userName
                this.dataForm.createTime = data.thirdPartyCashBack.createTime
                this.dataForm.auditUserId = data.thirdPartyCashBack.auditUserId
                this.dataForm.auditUserName = data.thirdPartyCashBack.auditUserName
                this.dataForm.auditTime = data.thirdPartyCashBack.auditTime
                this.dataForm.status = parseInt(data.thirdPartyCashBack.status )=== 0? '':parseInt(data.thirdPartyCashBack.status)
                //如果状态为审核 则不展示审核时间和审核人 1展示审核人和审核时间 2 不展示
                if(this.dataForm.status !== ''){
                  this.showStatusVisible = 1
                }

                this.dataForm.reason = data.thirdPartyCashBack.reason
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
              'thirdPartyName': this.dataForm.thirdPartyName,
              'amount': this.dataForm.amount,
              'userId': this.dataForm.userId,
              'userName': this.dataForm.userName,
              'createTime': this.dataForm.createTime,
              'status':this.dataForm.status,
              'reason':this.dataForm.reason,

            }
            var tick = !this.dataForm.id ? cashBack.add(params) : cashBack.verify(params)
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
