<template>
  <!--新增或修改--> <el-dialog
    :title="!dataForm.id ? $t('sys.user.newAdd') :$t('sys.user.modify')"
    :close-on-click-modal="false"
    :visible.sync="visible">
  <!--用户名--> <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item :label="$t('sys.user.AddOrUpdate.userName')" prop="userName">
        <el-input v-model="dataForm.userName" :placeholder="$t('sys.user.AddOrUpdate.userNamePlaceholder')"></el-input>
      </el-form-item>
  <!--密码--><el-form-item :label="$t('sys.user.AddOrUpdate.password')" prop="password" :class="{ 'is-required': !dataForm.id }" v-if="!dataForm.id">
        <el-input v-model="dataForm.password" type="password" :placeholder="$t('sys.user.AddOrUpdate.password')"></el-input>
      </el-form-item>
  <!--确认密码--><el-form-item :label="$t('sys.user.AddOrUpdate.comfirmPassword')" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }" v-if="!dataForm.id">
        <el-input v-model="dataForm.comfirmPassword" type="password" :placeholder="$t('sys.user.AddOrUpdate.comfirmPassword')"></el-input>
  <!--邮箱--></el-form-item>
      <el-form-item :label="$t('sys.user.email')" prop="email">
        <el-input v-model="dataForm.email" :placeholder="$t('sys.user.email')"></el-input>
      </el-form-item>
  <!--手机号--> <el-form-item :label="$t('sys.user.mobile')" prop="mobile">
        <el-input v-model="dataForm.mobile" :placeholder="$t('sys.user.mobile')"></el-input>
      </el-form-item>
  <!--角色--><el-form-item :label="$t('sys.user.AddOrUpdate.role')" size="mini" prop="roleIdList">
        <el-checkbox-group v-model="dataForm.roleIdList">
          <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
<!--      <el-form-item label="状态" size="mini" prop="status">-->
<!--        <el-radio-group v-model="dataForm.status">-->
<!--          <el-radio :label="0">禁用</el-radio>-->
<!--          <el-radio :label="1">正常</el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--取消--><el-button @click="visible = false">{{$t('sys.user.cancel')}}</el-button>
      <!--确认--><el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t('sys.user.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      var validateUserName = (rule, value, callback) => {  // 用户名规则
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateUserName1')))
        } else if (value.length > 10) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateUserName2')))
        } else {
          callback()
        }
      }
      var validatePassword = (rule, value, callback) => {   // 密码规则
        var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validatePassword1')))
        } else if (reg.test(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validatePassword2')))
        } else if (value.length > 20) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validatePassword3')))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {   // 确认密码规则
        var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateComfirmPassword1')))
        } else if (reg.test(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateComfirmPassword2')))
        } else if (this.dataForm.password !== value) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateComfirmPassword3')))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {   // 邮箱规则
        if (!isEmail(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateEmail1')))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {  // 手机号规则
        if (!isMobile(value)) {
          callback(new Error(this.$t('sys.user.AddOrUpdateDataRule.validateMobile1')))
        } else {
          callback()
        }
      }
      return {
        repeatVisible: false,
        visible: false,
        roleList: [],
        dataForm: {
          id: 0,
          userName: '',
          password: '',
          comfirmPassword: '',
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          status: 1
        },
        dataRule: {
          userName: [
            { validator: validateUserName, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          email: [
            { required: true, message: this.$t('sys.user.AddOrUpdateDataRule.validateEmail2'), trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: this.$t('sys.user.AddOrUpdateDataRule.validateMobile2'), trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/role/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.roleList = data && data.code === 200 ? data.list : []
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.userName = data.user.username
                this.dataForm.salt = data.user.salt
                this.dataForm.email = data.user.email
                this.dataForm.mobile = data.user.mobile
                this.dataForm.roleIdList = data.user.roleIdList
                this.dataForm.status = data.user.status
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.repeatVisible = true
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: this.$t('sys.user.success'),
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                    this.repeatVisible = false
                  }
                })
              } else {
                this.$message.error(data.msg)
                this.repeatVisible = false
              }
            })
          }
        })
      }
    }
  }
</script>
