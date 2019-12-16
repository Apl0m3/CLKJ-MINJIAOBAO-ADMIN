<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="用户" prop="userId">
        <el-input v-model="dataForm.userId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户投注数" prop="userBet">
        <el-input v-model="dataForm.userBet" placeholder="用户投注数"></el-input>
      </el-form-item>
      <el-form-item label="用户抽奖号" prop="userAwardNo">
        <el-input v-model="dataForm.userAwardNo" placeholder="用户抽奖号"></el-input>
      </el-form-item>
      <el-form-item label="抽奖期数" prop="awardPeriods">
        <el-input v-model="dataForm.awardPeriods" placeholder="抽奖期数"></el-input>
      </el-form-item>
      <el-form-item label="是否中奖" prop="result">
        <el-radio-group v-model="dataForm.result" size="medium">-->
          <el-radio :label="1">中奖</el-radio>
          <el-radio :label="2">未中奖</el-radio>
        </el-radio-group>
<!--        <el-input v-model="dataForm.result" placeholder="是否中奖(1:中奖 2:未中奖)"></el-input>-->
      </el-form-item>
      <el-form-item label="奖品id" prop="awardId">
        <el-input v-model="dataForm.awardId" placeholder="奖品id"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {bet} from '@/action/bet'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          userBet: '',
          userAwardNo: '',
          awardPeriods: '',
          result: '',
          awardId: ''
        },
        dataRule: {
          userId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          userBet: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          userAwardNo: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          awardPeriods: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          result: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          awardId: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
            bet.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.userId = data.bet.userId
                this.dataForm.userBet = data.bet.userBet
                this.dataForm.userAwardNo = data.bet.userAwardNo
                this.dataForm.awardPeriods = data.bet.awardPeriods
                this.dataForm.result = data.bet.result
                this.dataForm.awardId = data.bet.awardId
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
              'userBet': this.dataForm.userBet,
              'userAwardNo': this.dataForm.userAwardNo,
              'awardPeriods': this.dataForm.awardPeriods,
              'result': this.dataForm.result,
              'awardId': this.dataForm.awardId
            }
            var tick = !this.dataForm.id ? bet.add(params) : bet.update(params)
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
