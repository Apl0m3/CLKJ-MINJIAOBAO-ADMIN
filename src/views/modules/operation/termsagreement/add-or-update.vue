<template>
  <!--新增或修改-->
  <el-dialog
    :title="!dataForm.id ? $t('manage.operation.greement.newAdd') : $t('manage.operation.greement.modify')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <!--类型-->
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @submit.native.prevent label-width="80px">
      <el-form-item :label="$t('manage.operation.greement.type')" prop="type">
        <el-select v-model="dataForm.type" :disabled="dataForm.id!==0">
          <el-option-group>
            <!--注册协议-->
            <el-option :value="1" :label="$t('manage.operation.greement.RegistrationAgreement')"></el-option>
            <!--设计师申请协议-->
            <el-option :value="2" :label="$t('manage.operation.greement.designerRule')"></el-option>
            <!--代理商协议-->
            <el-option :value="3" :label="$t('manage.operation.greement.agentRule')"></el-option>
            <!--供应商协议 -->
            <el-option :value="4" :label="$t('manage.operation.greement.supplyRule')"></el-option>
            <!--页面提示-->
            <el-option :value="5" :label="$t('manage.operation.greement.tip')"></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <!--标题-->
      <el-form-item :label="$t('manage.operation.greement.title')" prop="title">
        <el-input v-model="dataForm.title" placeholder=""></el-input>
      </el-form-item>
      <!--      <el-form-item label="图标" prop="icon">-->
      <!--&lt;!&ndash;        <el-input v-model="dataForm.icon" placeholder=""></el-input>&ndash;&gt;-->

      <!--        <el-upload-->
      <!--          class="avatar-uploader"-->
      <!--          :action="this.global.uploadUrl"-->
      <!--          :show-file-list="false"-->
      <!--          accept="image/jpeg,image/gif,image/png"-->
      <!--          :on-success="handleAveditoratarSuccess"-->
      <!--          :before-upload="beforeAvatarUpload">-->
      <!--          <img v-if="dataForm.icon" :src="global.showUrl+dataForm.icon" class="avatar" style="width: 178px;height: 178px">-->
      <!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
      <!--        </el-upload>-->
      <!--      </el-form-item>-->
      <!--内容-->
      <el-form-item :label="$t('manage.operation.greement.content')" prop="content">
        <editor id="editor_id" width="100%" height="200"
                :content="dataForm.content"
                :cssData="'.ke-content img {max-width: 600px;height:auto;}'"
                pluginsPath="/static/kindeditor/plugins/"
                :loadStyleMode="false"
                :uploadJson="global.uploadKEUrl"
                @on-content-change="onContentChange"
                :items="['source', '|', 'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',
                     '|', 'justifyleft', 'justifycenter', 'justifyright',
                    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
                    'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen',
                    'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
                    'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',
                    'table', 'hr', 'pagebreak','link', 'unlink', '|']"
        >
        </editor>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--取消--><el-button @click="visible = false">{{$t('manage.operation.greement.cancel')}}</el-button>
      <!--确认--><el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t('manage.operation.greement.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import {termsagreement} from '../../../../../src/action/termsagreement'
    // import vueWangeditor from 'vue-wangeditor'

    export default {
      data () {
        return {
          repeatVisible: false,
          visible: false,
          imageUrl: '',
          initContent: '',
          importFileUrl: '', // 在初始时指定url地址即可
                // menus: [
                //   'source', // 源码模式
                //   '|',
                //   'bold', // 粗体
                //   'underline', // 下划线
                //   'italic', // 斜体
                //   'strikethrough', // 中线
                //   'eraser', // 清空格式
                //   'forecolor', // 文字颜色
                //   '|',
                //   'quote', // 引用
                //   'fontfamily', // 字体
                //   'fontsize', // 字号
                //   'head', // 标题
                //   'unorderlist', // 无序列表
                //   'orderlist', // 有序列表
                //   'alignleft', // 左对齐
                //   'aligncenter', // 居中
                //   'alignright', // 右对齐
                //   '|',
                //   'link', // 链接
                //   'unlink', // 取消链接
                //   'table', // 表格
                //   '|',
                //   'insertcode', // 插入代码
                //   '|',
                //   'undo', // 撤销
                //   'redo', // 重做
                //   'fullscreen' // 全屏
                // ],
          dataForm: {
            id: 0,
            type: 1,
            title: '',
            icon: '',
            content: ''
          },
          dataRule: {
            title: [
              {
                required: true,
                message: this.$t('manage.operation.greement.addOrupdate.dataRule.titleRule'),
                trigger: 'blur'
              }
            ],
            icon: [
              {
                required: true,
                message: this.$t('manage.operation.greement.addOrupdate.dataRule.iconRule'),
                trigger: 'blur'
              }
            ],
            content: [
              {
                required: true,
                message: this.$t('manage.operation.greement.addOrupdate.dataRule.contentRule'),
                trigger: 'blur'
              }
            ]
          }
        }
      },
      methods: {
        onContentChange (val) {
          this.dataForm.content = val
        },
        init (id) {
          this.dataForm.id = id || 0
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            if (this.dataForm.id) {
              termsagreement.info(this.dataForm.id).then(({data}) => {
                console.log(data)
                if (data && data.code === 200) {
                  this.dataForm.type = data.termsAgreement.type
                  this.dataForm.title = data.termsAgreement.title
                  this.dataForm.icon = data.termsAgreement.icon
                  this.dataForm.content = data.termsAgreement.content
                  this.initContent = data.termsAgreement.content
                                // this.setContent()
                }
              })
            }
          })
        },
            // 表单提交
        dataFormSubmit () {
                // this.getContent();
                // if (this.initContent !== '<p><br></p>') {
                //   this.dataForm.content = this.initContent;
                // } else {
                //   this.dataForm.content = '';
                // }
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              this.repeatVisible = true
              var params = {
                'id': this.dataForm.id || undefined,
                'type': this.dataForm.type,

                'title': this.dataForm.title,
                'icon': this.dataForm.icon,
                'content': this.dataForm.content
              }
              var tick = !this.dataForm.id ? termsagreement.add(params) : termsagreement.update(params)
              tick.then(({data}) => {
                if (data && data.code === 200) {
                  this.$message({
                    message: this.$t('manage.operation.greement.success'),
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.visible = false
                      this.$emit('refreshDataList')
                                        // this.$refs.editor.clear();
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
        },
        handleAvatarSuccess (res, file) {
                // this.imageUrl = URL.createObjectURL(file.raw);
          if (res && res.code === 200) {
            this.dataForm.icon = res.result.title
          }
        },
        beforeAvatarUpload (file) {
          return true
        }
            // setContent() {
            //   this.$refs.editor.setHtml(this.initContent)
            // },
            // getContent() {
            //   this.initContent = this.$refs.editor.getHtml(this.initContent);
            // },
      }
        // components: {
        //   vueWangeditor
        // }
    }
</script>
<style>
  .el-form-item__error {
    top: 104%;
  }
</style>
