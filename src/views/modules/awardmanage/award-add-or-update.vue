<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="奖品类型" prop="awardType">
        <el-select v-model="dataForm.awardType" placeholder="请选择" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!--        <el-input v-model="dataForm.awardBet" placeholder=""></el-input>-->
      </el-form-item>
      <el-form-item label="奖品金额" prop="awardMoney">
        <!--        <el-radio-group v-model="dataForm.type" size="medium">-->
        <!--          <el-radio :label="1" border>举办者股权账户</el-radio>-->
        <!--          <el-radio :label="2" border>教职工股权账户</el-radio>-->
        <!--        </el-radio-group>-->
        <el-input v-model="dataForm.awardMoney" placeholder="奖品金额"></el-input>
      </el-form-item>
      <el-form-item label="奖品数量" prop="awardNum">
        <el-input v-model="dataForm.awardNum" placeholder="奖品数量"></el-input>
      </el-form-item>
      <el-form-item label="奖品投注数" prop="awardBet">
        <el-input v-model="dataForm.awardBet" placeholder="奖品投注数"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {award} from '@/action/award'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          awardType: '',
          awardMoney: '',
          awardNum: '',
          awardBet: ''
        },
        options: [
          {
            value: 1,
            label: '一等奖'
          }, {
            value: 2,
            label: '二等奖'
          }, {
            value: 3,
            label: '三等奖'
          }, {
            value: 4,
            label: '四等奖'
          }, {
            value: 5,
            label: '五等奖'
          }
        ],
        dataRule: {
          awardType: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          awardMoney: [
            { required: true, message: '1.举办者股权账户 2.教职工股权账户不能为空', trigger: 'blur' }
          ],
          awardNum: [
            { required: true, message: '股权数量不能为空', trigger: 'blur' }
          ],
          awardBet: [
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
            award.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.awardType = data.award.awardType
                this.dataForm.awardMoney = data.award.awardMoney
                this.dataForm.awardNum = data.award.awardNum
                this.dataForm.awardBet = data.award.awardBet
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
              'awardType': this.dataForm.awardType,
              'awardMoney': this.dataForm.awardMoney,
              'awardNum': this.dataForm.awardNum,
              'awardBet': this.dataForm.awardBet
            }
            var tick = !this.dataForm.id ? award.add(params) : award.update(params)
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
