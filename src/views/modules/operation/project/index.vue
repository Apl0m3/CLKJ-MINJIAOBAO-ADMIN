<template>
  <div>
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="150px">


      <!--      <el-form-item :label="$t('manage.operation.project.logo')" prop="logo">-->
      <!--        <el-upload-->
      <!--          class="avatar-uploader"-->
      <!--          :action="global.uploadUrl"-->
      <!--          :show-file-list="false"-->
      <!--          accept="image/jpeg,image/gif,image/png"-->
      <!--          :on-success="handleAvatarSuccess"-->
      <!--          :before-upload="beforeAvatarUpload">-->
      <!--          <img v-if="dataForm.logo" :src="global.showUrl+dataForm.logo" class="avatar">-->
      <!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--        </el-upload>-->
      <!--&lt;!&ndash;        <el-input v-model="dataForm.companyLogo" placeholder="logo"></el-input>&ndash;&gt;-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="应用名称" prop="name">-->
      <!--        <el-input v-model="dataForm.name" placeholder="应用名称"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="邮箱" prop="email">-->
      <!--        <el-input type="email" v-model="dataForm.email" placeholder=""></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="dataForm.address" placeholder="" ></el-input>
      </el-form-item>
      <el-form-item label="客服电话" prop="phone">
        <el-input v-model="dataForm.phone" type="tel"
                  pattern="1[0-9]{3}-[0-9]{3}-[0-9]{4}"></el-input>
      </el-form-item>
      <el-form-item label="二维码" prop="image">
        <el-upload
          class="avatar-uploader"
          :action="global.uploadUrl"
          :show-file-list="false"
          accept="image/jpeg,image/gif,image/png"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.image" :src="global.showUrl+dataForm.image" class="avatar" width="178px" height="178px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="关于我们:" prop="remark">
        <editor :id="'editor1'+new Date().getTime()"
                :content.sync="dataForm.remark"
                :uploadJson="global.uploadKEUrl"
                :cssData="'.ke-content img {max-width: 600px;height:auto;}'"
                :loadStyleMode="false"
                :allowImageRemote="false"
                pluginsPath="/static/kindeditor/plugins/"
                :items="[  'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',
                     '|', 'justifyleft', 'justifycenter', 'justifyright',
                    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent',
                    'quickformat', 'selectall', '|', 'fullscreen','image',
                    'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                    'italic', 'underline', 'strikethrough', 'lineheight', 'hr',  '|']"
        />


        <!--<el-input-->
        <!--:autoSize="true"-->
        <!--v-model="value.commodity.remark"-->
        <!--type="textarea"-->
        <!--maxlength="1000"-->
        <!--show-word-limit-->
        <!--:placeholder="$t('manage.commodity.commodityInfoDetail.remarkPla')">-->

        <!--</el-input>-->
      </el-form-item>
      <!--      <el-form-item :label="$t('manage.operation.project.fax')" prop="fax">-->
      <!--        <el-input v-model="dataForm.fax"  type="tel"-->
      <!--                  pattern="1[0-9]{3}-[0-9]{3}-[0-9]{4}"></el-input>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item :label="$t('manage.operation.project.remark')" prop="remark">-->
      <!--        <el-input type="textarea" v-model="dataForm.remark" placeholder=""></el-input>-->
      <!--      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t("common.comfirm")}}</el-button>
    </span>
  </div>

</template>

<script>
    import {project} from '../../../../../src/action/project'

    export default {
        data() {
            return {
                startTime:'',
                endTime:'',
                repeatVisible: false,
                visible: false,
                imageUrl: global.showUrl,
                dataForm: {
                    id: 0,
                    logo: '',
                    companyName: '',
                    name: '',
                    fax: '',
                    email: '',
                    address: '',
                    am: [],
                    pm: [],
                    phone: '',
                    remark: '',
                  image:'',
                },
                dataRule: {
                    address: [
                        {required: true, message: this.$t('manage.operation.project.rule.addressRule'), trigger: 'blur'},
                        {min: 3, max: 200, message: this.$t('manage.commodity.commodityInfoDetail.nameRule2'), trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: this.$t('manage.operation.project.rule.phoneRule'), trigger: 'blur'}
                    ],
                    remark: [
                        {required: true, message: this.$t('manage.operation.project.rule.remarkRule'), trigger: 'blur'}
                    ]
                }
            }
        },
        beforeRouteEnter(to, form, next) {
            next(vm => {
                vm.init();
            })
        },
        methods: {
            init() {
                this.dataForm.id = 1;
                this.visible = true;
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();
                    if (this.dataForm.id) {
                        project.info(this.dataForm.id).then(({data}) => {
                            if (data && data.code === 200) {
                                this.dataForm.address = data.project.address
                                this.dataForm.phone = data.project.phone
                                this.dataForm.remark = data.project.remark
                              this.dataForm.image = data.project.image
                            }
                        })
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.repeatVisible = true;
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        let params = {
                            'id': this.dataForm.id || undefined,
                            'name': this.dataForm.name,
                            'address': this.dataForm.address,
                            'phone': this.dataForm.phone,
                            'remark': this.dataForm.remark,
                          'image':this.dataForm.image
                        };
                        let tick = !this.dataForm.id ? project.add(params) : project.update(params);
                        tick.then(({data}) => {
                            if (data && data.code === 200) {
                                this.$message({
                                    message: this.$t('common.success'),
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList');
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
                this.imageUrl = URL.createObjectURL(file.raw);
                if (res && res.code === 200) {
                    this.dataForm.image = res.result.title;
                }
            },
            beforeAvatarUpload(file) {

                return true;
            },
        }
    }
</script>

