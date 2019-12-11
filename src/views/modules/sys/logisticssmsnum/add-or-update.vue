<template>
  <el-dialog
    :title="dataForm.id===1 ? '添加短信数量' : '添加物流数量'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="数量" prop="num">
        <el-input v-model="dataForm.num" placeholder="请输入添加的数量"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {logisticssmsnum} from '@/action/logisticssmsnum'

  export default {
    data () {
      var checkIntegral = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('添加数量不能为空'));
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
        dataForm: {
          id: 0,
          num: '',
        },
        dataRule: {

          num: [
            { required: true, message: '添加数量不能为空', trigger: 'blur' },
            { validator:checkIntegral , trigger:'blur' }
          ],
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              id:this.dataForm.id,
              num:this.dataForm.num
            };
            logisticssmsnum.updateLogisticsSmsNum(params).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit('refreshDataList');
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
