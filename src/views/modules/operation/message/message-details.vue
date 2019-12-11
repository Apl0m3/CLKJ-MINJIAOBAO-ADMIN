<template>
  <el-dialog title="详情"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="消息类型" prop="type">
        {{getType()}}
<!--        <el-radio-group v-model="dataForm.type">-->
<!--          <el-radio :label="1">系统消息</el-radio>-->
<!--          <el-radio :label="2">用户消息</el-radio>-->
<!--        </el-radio-group>-->
      </el-form-item>
      <el-form-item v-if="dataForm.type===2" label="用户" prop="userId">
        {{dataForm.userName}}
      </el-form-item>
      <el-form-item label="消息标题" prop="title">
        {{dataForm.title}}
      </el-form-item>
      <el-form-item label="消息内容" prop="content">
        <el-input type="textarea" :rows="2" v-model="dataForm.content" placeholder="消息内容" disabled="disabled"></el-input>
      </el-form-item>
      <!--<el-form-item label="" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="createSysUserId">
        <el-input v-model="dataForm.createSysUserId" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="" prop="updateSysUserId">
        <el-input v-model="dataForm.updateSysUserId" placeholder=""></el-input>
      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
<!--      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  import {message} from '@/action/message'

  export default {
    data() {
      return {
        loading: false,
        visible: false,
        userList: [],
        dataForm: {
          id: 0,
          userId: undefined,
          type: 1,
          title: '',
          content: '',
        },
        options:[],
        dataRule: {
         userId: [
           { required: true, message: '请选择用户', trigger: 'blur' }
         ],
          type: [
            {required: true, message: '消息类型不能为空', trigger: 'blur'}
          ],
          title: [
            {required: true, message: '消息标题不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '消息内容不能为空', trigger: 'blur'}
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
            message.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.userId = data.message.userId
                this.dataForm.type = data.message.type
                this.dataForm.title = data.message.title
                this.dataForm.content = data.message.content
              }
            })
          }
        })
      },
      getType(){
        if(this.dataForm.type==1)
          return "系统消息";
        else
          return "用户消息";
      },
      remoteMethod(query) {
        this.loading=true
        if (query !== '') {
          message.getUser(query).then(({data}) =>{

            if (data && data.code === 200) {
              this.loading=false
              this.options=data.list;
            }

          })
        }
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'id': this.dataForm.id || undefined,
              'userId': this.dataForm.userId,
              'type': this.dataForm.type,
              'title': this.dataForm.title,
              'content': this.dataForm.content,
            }
            var tick = !this.dataForm.id ? message.add(params) : message.update(params)
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
