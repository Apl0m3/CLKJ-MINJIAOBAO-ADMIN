<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="" prop="phone">
        <el-input v-model="dataForm.phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-input v-model="dataForm.code" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="0-成功
            1-失败" prop="status">
        <el-input v-model="dataForm.status" placeholder="0-成功
            1-失败"></el-input>
      </el-form-item>
      <el-form-item label="" prop="content">
        <el-input v-model="dataForm.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="msg">
        <el-input v-model="dataForm.msg" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label=" 1-注册  2-登录  3-忘记密码" prop="type">
        <el-input v-model="dataForm.type" placeholder=" 1-注册  2-登录  3-忘记密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {syssendsmslog} from '@/action/syssendsmslog'

  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: 0,
          phone: '',
          createTime: '',
          code: '',
          status: '',
          content: '',
          msg: '',
          type: ''
        },
        dataRule: {
          phone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          createTime: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          status: [
            {
              required: true, message: '0-成功  1-失败不能为空', trigger: 'blur'
            }
          ],
          content: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          msg: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, message: ' 1-注册  2-登录  3-忘记密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init(id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            syssendsmslog.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.phone = data.syssendsmslog.phone
                this.dataForm.createTime = data.syssendsmslog.createTime
                this.dataForm.code = data.syssendsmslog.code
                this.dataForm.status = data.syssendsmslog.status
                this.dataForm.content = data.syssendsmslog.content
                this.dataForm.msg = data.syssendsmslog.msg
                this.dataForm.type = data.syssendsmslog.type
              }
            })
          }
        })
      }
      ,
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'id': this.dataForm.id || undefined,
              'phone': this.dataForm.phone,
              'createTime': this.dataForm.createTime,
              'code': this.dataForm.code,
              'status': this.dataForm.status,
              'content': this.dataForm.content,
              'msg': this.dataForm.msg,
              'type': this.dataForm.type
            }
            var tick = !this.dataForm.id ? API.syssendsmslog.add(params) : API.syssendsmslog.update(params)
            tick.then(({data}) => {
              if (data && data.code === 0) {
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
