<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="抽奖期数" prop="awardPeriods">
        <el-input v-model="dataForm.awardPeriods" placeholder="抽奖期数"></el-input>
      </el-form-item>
      <el-form-item label="起点金额" prop="startMoney">
<!--        <el-radio-group v-model="dataForm.type" size="medium">-->
<!--          <el-radio :label="1" border>举办者股权账户</el-radio>-->
<!--          <el-radio :label="2" border>教职工股权账户</el-radio>-->
<!--        </el-radio-group>-->
        <el-input v-model="dataForm.startMoney" placeholder="起点金额"></el-input>
      </el-form-item>
      <el-form-item label="最低投注" prop="minBet">
        <el-input-number size="medium" v-model="dataForm.minBet"></el-input-number>
<!--        <el-input v-model="dataForm.awardNum" placeholder="奖品数量"></el-input>-->
      </el-form-item>
      <el-form-item label="最高投注" prop="maxBet">
        <el-input-number size="medium" v-model="dataForm.maxBet"></el-input-number>
<!--        <el-input v-model="dataForm.awardBet" placeholder="奖品投注数"></el-input>-->
      </el-form-item>
      <el-form-item label="返奖比例" prop="rewardRatio">
        <el-input v-model="dataForm.rewardRatio" placeholder="返奖比例"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {awardset} from '@/action/awardset'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          awardPeriods: '',
          startMoney: '',
          minBet: 1,
          maxBet: 100,
          rewardRatio: ''
        },
        dataRule: {
          awardPeriods: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          startMoney: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          minBet: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          maxBet: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          rewardRatio: [
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
            awardset.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.awardPeriods = data.awardset.awardPeriods
                this.dataForm.startMoney = data.awardset.startMoney
                this.dataForm.minBet = data.awardset.minBet
                this.dataForm.maxBet = data.awardset.maxBet
                this.dataForm.rewardRatio = data.awardset.rewardRatio
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
              'awardPeriods': this.dataForm.awardPeriods,
              'startMoney': this.dataForm.startMoney,
              'minBet': this.dataForm.minBet,
              'maxBet': this.dataForm.maxBet,
              'rewardRatio': this.dataForm.rewardRatio
            }
            var tick = !this.dataForm.id ? awardset.add(params) : awardset.update(params)
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
