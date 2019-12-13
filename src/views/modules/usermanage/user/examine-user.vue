<template>
  <el-dialog
    :title="dataForm.status==3 ? '审核': '用户详情'"
    :close-on-click-modal="false"
    :before-close="clear"
    :visible.sync="visible">
    <el-form :model="dataForm"  ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="100px">

      <el-form-item :label="$t('manage.user.account')" prop="userName">
        <el-input type="tel" v-model="dataForm.userName" :disabled="dataForm.id!==0" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="dataForm.realName" :disabled="dataForm.id!==0" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="tel" v-model="dataForm.address" :disabled="dataForm.id!==0" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="cards">
        <el-input type="tel" v-model="dataForm.cards" :disabled="dataForm.id!==0" placeholder=""></el-input>
      </el-form-item>
      <!--<el-form-item :label="$t('manage.user.avatar')" prop="avatar">-->
        <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--:action="this.global.uploadUrl"-->
          <!--:show-file-list="false"-->
          <!--accept="image/jpeg,image/gif,image/png"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="dataForm.avatar" :src="global.showUrl+dataForm.avatar" class="avatar"-->
               <!--style="width: 178px;height: 178px">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
        <!--</el-upload>-->
      <!--</el-form-item>-->
      <el-form-item v-if="dataForm.file&&dataForm.file.length>0"  prop="材料">
        <div  v-for="item in dataForm.file">
          <img :src="global.showUrl+item ">
        </div>
      </el-form-item>
      <el-form-item  prop="avatar">
        <el-radio-group   v-model="dataForm.status" >
          <el-radio  :label="0" value="0">审核通过</el-radio>
          <el-radio  :label="4" value="4">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item   label="失败原因" prop="remark">
        <el-input type="tel"  v-model="dataForm.remark"  placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="clear">{{$t("common.cancel")}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t("common.comfirm")}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {user} from '@/action/user'

  export default {
    data() {
      return {
        visible: false,
        imageUrl: '',
        importFileUrl: '', // 在初始时指定url地址即可
        repeatVisible: false,
        dataForm: {
          id: 0,
          userName: '',
          address: '',
          realName: null,
          avatar: null,
          createTime: '',
          status:'',
          cards:'',
          file:[],
          remark:''
        },
      }
    },
    methods: {
      resetFields(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
      },
      init(id) {
        this.dataForm.id = id || 0;
        this.visible = true;
        this.$nextTick(() => {
          this.resetFields('dataForm');
          if (this.dataForm.id) {
            user.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.userName = data.adminUser.userName;
                this.dataForm.address = data.adminUser.address;
                this.dataForm.realName = data.adminUser.realName;
                this.dataForm.avatar = data.adminUser.avatar;
                this.dataForm.status=data.adminUser.status;
                this.dataForm.cards=data.adminUser.cards;
                if(data.adminUser.remark!=null){
                  this.dataForm.remark=data.adminUser.remark;
                }
                if(data.adminUser.loginFile!=null&&data.adminUser.loginFile!=''){
                  this.dataForm.file=data.adminUser.loginFile.split(',')
                  console.log(this.dataForm.file)
                }
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        console.log(this.dataForm.status)
            this.repeatVisible = true;
            let params = {
              userId:this.dataForm.id,
              status:this.dataForm.status,
              remark: this.dataForm.remark
            };
            user.examineUser(params).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: this.$t('common.success'),
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                    this.repeatVisible = false;
                  }
                })
              } else {
                this.$message.error(data.msg);
                this.repeatVisible = false;
              }
            })

      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        if (res && res.code === 200) {
          this.dataForm.avatar = res.result.title;
        }
      },
      beforeAvatarUpload(file) {
        return true;
      },
      clear() {
        this.visible = false;
        this.dataForm.userName = '';
      },
    }
  }
</script>
<!--<script src="//unpkg.com/element-ui@2.10.0/lib/index.js"></script>-->
<!--<link src="//unpkg.com/element-ui@2.10.0/lib/theme-chalk/index.css"/>-->
