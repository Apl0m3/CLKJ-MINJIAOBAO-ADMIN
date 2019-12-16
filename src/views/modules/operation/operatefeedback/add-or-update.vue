<template>
  <el-dialog
    title="回复"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item :label="$t('manage.operation.operateFeedback.replyContent')" prop="content">
        <el-input type="textarea" :rows="2" v-model="dataForm.content" :placeholder="$t('manage.operation.operateFeedback.replyContentPla')"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t('common.comfirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {operatefeedback} from '../../../../../src/action/operatefeedback'
  export default {
    data () {
      return {
        visible: false,
        repeatVisible:false,
        dataForm: {
          id: 0,
          content: '',
        },
        dataRule: {
          content: [
            { required: true, message: this.$t('manage.operation.operateFeedback.replyContentRule'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id;
        this.visible = true;
        this.$nextTick(() => {
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.repeatVisible=true;
            var params = {
              'id': this.dataForm.id,
              'content': this.dataForm.content,
            }
            operatefeedback.reply(params).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: this.$t('common.success'),
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit('refreshDataList');
                    this.repeatVisible=false;
                  }
                })
              } else {
                this.$message.error(data.msg);
                this.repeatVisible=false;
              }
            })
          }
        })
      }
    }
  }
</script>
