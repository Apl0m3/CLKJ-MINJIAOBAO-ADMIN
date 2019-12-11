<template>
  <el-dialog
    :title="$t('common.update')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item :label="$t('manage.hotWords.name')" prop="name">
        <el-input v-model="dataForm.name" :placeholder="$t('manage.hotWords.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.hotWords.num')" prop="num">
        <el-input v-model="dataForm.num" :placeholder="$t('manage.hotWords.num')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.hotWords.modifyTime')" prop="modifyTime">
        <el-input v-model="dataForm.modifyTime" :placeholder="$t('manage.hotWords.modifyTime')"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()">{{$t('common.comfirm')}}</el-button>
    </span>
  </el-dialog>
</template>


<script>
  import {hotWords} from '../../../../action/hotwords'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          name: '',
          num: '',
          modifyTime: ''
        },
        dataRule: {
          name: [
            { required: true, message: this.$t('manage.hotWords.nameRule'), trigger: 'blur' }
          ],
          num: [
            { required: true, message: this.$t('manage.hotWords.numRule'), trigger: 'blur' }
          ],
          modifyTime: [
            { required: true, message: this.$t('manage.hotWords.modifyTimeRule'), trigger: 'blur' }
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
            hotWords.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.hotwords.name
                this.dataForm.num = data.hotwords.num
                this.dataForm.modifyTime = data.hotwords.modifyTime
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
              'name': this.dataForm.name,
              'num': this.dataForm.num,
              'modifyTime': this.dataForm.modifyTime
            }
            var tick = !this.dataForm.id ? API.hotwords.add(params) : API.hotwords.update(params)
            tick.then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message:this.$t('common.success'),
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
