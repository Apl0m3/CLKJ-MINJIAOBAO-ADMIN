<template>
  <el-dialog
    :title="$t('manage.usermanage.useraccount.title')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="$t('manage.statistics.design.operate.walletInformation')" name="0">
        <el-form :model="dataForm" ref="dataForm" label-width="100px">
          <el-form-item :label="$t('manage.statistics.design.operate.unSettlementMoney')">
            {{userAccount.amount|doubleFilter}}
          </el-form-item>
          <el-form-item :label="$t('manage.statistics.design.operate.totalMoney')">
            {{userAccount.totalAmount|doubleFilter}}
          </el-form-item>
          <el-form-item :label="$t('manage.statistics.design.operate.settlementMoney')">
            {{userAccount.settlementAmount|doubleFilter}}
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item :title="$t('manage.statistics.design.operate.bankAccountInfo')" name="1">
        <el-form ref="dataForm" label-width="100px">
          <el-form-item :label="$t('manage.statistics.design.operate.bankAccount')" prop="bankAccount">
            {{userBank.bankAccount}}
          </el-form-item>
          <el-form-item :label="$t('manage.statistics.design.operate.bankName')" prop="bankName">
            {{userBank.bankName}}
          </el-form-item>
          <el-form-item :label="$t('manage.statistics.design.operate.bankUserName')" prop="bankUserName">
            {{userBank.bankUserName}}
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <el-button @click="settlementSub()" type="primary">结算</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {userAccount} from "../../../../action/userAccount";

  export default {
    data() {
      return {
        activeNames: ['0', '1'],
        visible: false,
        userBank: {},
        userAccount: {},
        dataForm: {
          id: 0,
          userId: '',
          commodityTypeId: '',
          commission: '',
          createBy: '',
          createTime: '',
          updateBy: '',
          updateTime: ''
        },
        dataRule: {
          userId: [
            {required: true, message: this.$t('manage.statistics.design.dataRule.userId'), trigger: 'blur'}
          ],
          commodityTypeId: [
            {required: true, message: this.$t('manage.statistics.design.dataRule.commodityTypeId'), trigger: 'blur'}
          ],
          commission: [
            {required: true, message: this.$t('manage.statistics.design.dataRule.commission'), trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0;
        this.visible = true;
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            userAccount.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.userAccount = data.userAccount;
                this.userBank = data.bank;
              }
            })
          }
        })
      },
      settlementSub() {
          let amount=this.userAccount.amount;
          let message = this.$t('manage.statistics.design.operate.message');
          message = message.replace("amount", amount)
        this.$confirm(message, this.$t('common.tips'), {
          confirmButtonText: this.$t("common.comfirm"),
          cancelButtonText:  this.$t("common.cancel"),
          type: 'warning'
        }).then(() => {
          let params = {id: this.userAccount.id, amount: this.userAccount.amount};
          userAccount.settlement(params).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: this.$t('common.success'),
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit('queryRecordInfo')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
