<template>
  <el-dialog
    :title="$t('manage.usermanage.usermessage.detail.title')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item :label="$t('manage.usermanage.usermessage.acceptUserName')" prop="acceptUserName">
        {{dataForm.acceptUserName}}
      </el-form-item>
      <el-form-item :label="$t('manage.usermanage.usermessage.senderUserName')" prop="senderUserName">
        {{dataForm.senderUserName}}
      </el-form-item>
      <el-form-item :label="$t('manage.usermanage.usermessage.title')" prop="title">
        {{dataForm.title}}
      </el-form-item>
      <el-form-item :label="$t('manage.usermanage.usermessage.content')" prop="content">
        <el-input type="textarea" :rows="2" v-model="dataForm.content" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.usermanage.usermessage.readStatus')" prop="readStatus">
        {{getReadStatus()}}
      </el-form-item>
      <el-form-item :label="$t('manage.usermanage.usermessage.createTime')" prop="createTime">
        {{dataForm.createTime}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="sure()" type="primary">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { usermessage } from '@/action/usermessage'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          userId: '',
          acceptUserName: '',
          content: '',
          title: '',
          senderId: '',
          senderUserName: '',
          readStatus: '',
          createTime: ''
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
            usermessage.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.acceptUserName = data.userMessage.acceptUserName
                this.dataForm.content = data.userMessage.content
                this.dataForm.title = data.userMessage.title
                this.dataForm.senderUserName = data.userMessage.senderUserName
                this.dataForm.readStatus = data.userMessage.readStatus
                this.dataForm.createTime = data.userMessage.createTime
                this.updateReadStatus()
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      getReadStatus () {
        if (this.dataForm.readStatus === 0) {
          return this.$t('manage.user.usermessage.unRead')
        } else {
          return this.$t('manage.user.usermessage.read')
        }
      },
      // 修改读取状态
      updateReadStatus () {
        if (this.dataForm.readStatus === 0) {
          var params = {
            id: this.dataForm.id,
            readStatus: this.dataForm.readStatus
          }
          usermessage.update(params).then(({data}) => {
            if (data && data.code === 500) {
              this.$message.error(data.msg)
            }
          })
        }
      },
      // 确定返回刷新页面
      sure () {
        this.visible = false
        this.$emit('refreshDataList')
      }
    }
  }
</script>
