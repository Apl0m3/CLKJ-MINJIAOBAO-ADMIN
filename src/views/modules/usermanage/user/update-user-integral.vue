<template>
  <el-dialog
    title="修改分销用户积分"
    :close-on-click-modal="false"
    :before-close="close"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="修改类型" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">增加</el-radio>
          <el-radio :label="2">减少</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="修改数量" prop="integral">
        <el-input v-model="dataForm.integral" placeholder="修改数量"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close()">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {user} from '@/action/user'
  export default {
    data () {
      var checkIntegral = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('修改数量不能为空'));
        } else {
          const reg = /^[1-9]\d{0,4}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入最多五位的正整数'));
          }
        }
      };
      return {
        visible: false,
        repeatVisible:false,
        dataForm: {
          id: 0,
          integral: '',
          status:1
        },
        dataRule: {
          integral: [
            { validator:checkIntegral , trigger:'blur' }
          ]
        }
      }
    },
    methods: {
      close(){
        this.visible = false;
        this.clear();
      },
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
              'status': this.dataForm.status,
              'integral': this.dataForm.integral,
            }
            user.updateUserIntegral(params).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit('refreshDataList');
                    this.clear();
                  }
                })
              } else {
                this.$message.error(data.msg);
                this.clear();
              }
            })
          }
        })
      },
      clear(){
        this.dataForm.status=1;
        this.dataForm.integral='';
        this.repeatVisible=false;
      }
    }
  }
</script>
