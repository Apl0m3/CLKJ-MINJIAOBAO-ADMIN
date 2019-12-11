<template>
  <el-dialog
    :title="!dataForm.id ? $t('common.add') : $t('common.update')"
    :close-on-click-modal="false"
    :before-close="clear"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item  :label="$t('manage.user.memberType')" prop="userRoleId">
        <el-radio-group v-model="dataForm.userRoleId" :disabled="dataForm.id!==0">
          <el-radio :label="1">{{$t("manage.user.pthy")}}</el-radio>
          <el-radio :label="2">{{$t("manage.user.dls")}}</el-radio>
          <el-radio :label="3">{{$t("manage.user.sjs")}}</el-radio>
          <el-radio :label="4">{{$t("manage.user.gys")}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('manage.user.account')" prop="userName">
        <el-input type="tel" v-model="dataForm.userName" :disabled="dataForm.id!==0" placeholder=""></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.user.name')" prop="nickName">
        <el-input v-model="dataForm.name" :disabled="dataForm.id!==0" placeholder=""></el-input>
      </el-form-item>
      <el-form-item :label="$t('manage.user.avatar')" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="this.global.uploadUrl"
          :show-file-list="false"
          accept="image/jpeg,image/gif,image/png"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.avatar" :src="global.showUrl+dataForm.avatar" class="avatar"
               style="width: 178px;height: 178px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--        <el-input v-model="dataForm.avatar" placeholder="" type=""></el-input>-->
      </el-form-item>
<!--      <el-form-item :label="$t('manage.user.birthday')" prop="birthday">-->
<!--        <el-date-picker-->
<!--          :disabled="dataForm.id!==0"-->
<!--          v-model="dataForm.birthday"-->
<!--          type="date"-->
<!--          format="yyyy-MM-dd"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          :picker-options="pickerOptions"-->
<!--          :placeholder="$t('manage.user.xzrq')"-->
<!--        >-->
<!--        </el-date-picker>-->
<!--        &lt;!&ndash;        <el-input v-model="dataForm.birthday" placeholder="" type="date" format="yyyy-MM-dd" style="width: 255px"></el-input>&ndash;&gt;-->
<!--      </el-form-item>-->
<!--      <el-form-item :label="$t('manage.user.gender')" prop="gender">-->
<!--        <el-radio-group v-model="dataForm.gender" :disabled="dataForm.id!==0">-->
<!--          <el-radio :label="1">{{$t("manage.user.male")}}</el-radio>-->
<!--          <el-radio :label="2">{{$t("manage.user.female")}}</el-radio>-->
<!--          &lt;!&ndash;          <el-radio :label="3">保密</el-radio>&ndash;&gt;-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <!--      <el-form-item :label="$t('manage.user.addressName')" v-if="dataForm.id!==0">-->
      <!--        <el-input placeholder="" :disabled="dataForm.id!==0" v-model="dataForm.addressName" >{{dataForm.addressName}}</el-input>-->
      <!--      </el-form-item>-->

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
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(this.$t('manage.user.validate.wrongPhone')));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error(this.$t('manage.user.validate.correctPhone')));
                    }
                }
            };
            return {
                pickerOptions: {
                    // disabledDate是一个函数,参数是当前选中的日期值,这个函数需要返回一个Boolean值,
                    disabledDate: (time) => {
                        // 如果函数处理比较简单,可以直接在这里写逻辑方法
                        // return time.getTime() < Date.now() - 8.64e7

                        // 如果函数里处理的数据比较麻烦,也可以单独放在一个函数里,避免data数据太臃肿
                        return this.dealDisabledDate(time)
                    }
                }, // 日期设置对象
                visible: false,
                imageUrl: '',
                importFileUrl: '', // 在初始时指定url地址即可
                repeatVisible: false,
                dataForm: {
                    id: 0,
                    userName: '',
                    addressName: '',
                    password: '',
                    name: null,
                    nickName: '',
                    avatar: null,
                    birthday: '',
                    gender: 1,
                    autoLoginStatus: '',
                    wxOpenId: '',
                    createTime: '',
                    userRoleId: 1
                },
                dataRule: {
                    name: [
                        {required: true, message: this.$t('manage.user.validate.nickName'), trigger: 'blur'},
                        {min: 2, max: 20, message: this.$t('manage.user.validate.nickNameTips')}
                    ],
                    avatar: [
                        {required: false, message: this.$t('manage.user.validate.avatar'), trigger: 'blur'}
                    ],
                    birthday: [
                        {required: true, message: this.$t('manage.user.validate.birthday'), trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 单独处理时间的函数
            dealDisabledDate(time) {
                // time.getTime是把选中的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
                // Date.now()是把今天的时间转化成自1970年1月1日 00:00:00 UTC到当前时间的毫秒数,这样比较好比较
                // return的值,true是不可以操作选择,false可以操作选择,比如下面这个判断就只能选择今天之后的时间
                return time.getTime() > Date.now()

                // 这里减8.64e7的作用是,让今天的日期可以选择,如果不减的话,今天的日期就不可以选择,判断中写<= 也是没用的,一天的毫秒数就是8.64e7
                // return time.getTime() <= Date.now()
                // return time.getTime() < Date.now() - 8.64e7
            },
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
                                this.dataForm.addressName = data.adminUser.addressName;
                                this.dataForm.name = data.adminUser.name;
                                this.dataForm.avatar = data.adminUser.avatar;
                                this.dataForm.birthday = data.adminUser.birthday;
                                this.dataForm.gender = data.adminUser.gender;
                                this.dataForm.userRoleId = data.adminUser.userRoleId;
                            }
                        })
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.repeatVisible = true;
                        let params = {
                            'id': this.dataForm.id || undefined,
                            'userName': this.dataForm.userName,
                            'nickName': this.dataForm.nickName,
                            'avatar': this.dataForm.avatar,
                            'birthday': this.dataForm.birthday,
                            'gender': this.dataForm.gender,
                            'userRoleId': this.dataForm.userRoleId
                        };
                        let tick = !this.dataForm.id ? user.add(params) : user.update(params);
                        tick.then(({data}) => {
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
