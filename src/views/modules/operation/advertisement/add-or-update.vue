  <template>
  <!--新增或修改--><el-dialog
    :title="!dataForm.id ? '新增':'修改'"
    :close-on-click-modal="false"
    @close='closeDialog'
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @submit.native.prevent="dataFormSubmit" label-width="80px">
      <!--广告图片-->
      <el-form-item label="图片" prop="image">
        <el-upload
          class="avatar-uploader"
          :action="this.global.uploadUrl"
          :show-file-list="false"
          accept="image/jpeg,image/gif,image/png"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="dataForm.image" :src="global.showUrl+dataForm.image" class="avatar" width="178px" height="178px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!--跳转方式-->
      <el-form-item label="跳转方式" prop="jumpMode">
        <el-radio-group v-model="dataForm.jumpMode">
          <!--外部链接--><el-radio :label="1">外部链接</el-radio>
          <!--内部链接--><el-radio :label="2">内部链接</el-radio>
          <!--板块跳转--><el-radio :label="3">板块跳转</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--外部跳转链接-->
      <el-form-item v-if="dataForm.jumpMode===1" label="外部链接" prop="url">
        <el-input v-model="dataForm.url" placeholder="请输入链接"></el-input>
      </el-form-item>

      <!--外部跳转链接-->
      <el-form-item v-if="dataForm.jumpMode===2" label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="请输入链接"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.jumpMode===2" label="内部链接" prop="content">
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

      <!--板块跳转-->
      <el-form-item v-if="dataForm.jumpMode===3" label="板块跳转" prop="module">
        <el-select v-model="dataForm.module" placeholder="请选择板块">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--取消--><el-button @click="visible = false">取消</el-button>
      <!--确认--><el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">确认</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {advertisement} from '@/action/advertisement'
  export default {
    data () {
      return {
        repeatVisible: false,
        ue: null,
        ueId: `advertisement_ueId`,
        ueContent: '',
        initContent: '',
        visible: false,
        imageUrl: '',
        importFileUrl: '', // 在初始时指定url地址即可
        loading: false,
        options:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }],
        dataForm: {
          id: 0,
          image: '', //图片地址
          jumpMode: '', //跳转类型
          title:'', //广告标题
          content: '', //广告详情
          url:'', //外部链接
          module: '',  //板块
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 100
        },
        defaultMsg: '',
        count:0,
        dataRule: {
          image: [
            {required: true, message: "请上传图片", trigger: 'blur'}
          ],
          jumpMode: [
            {required: true, message: "请选择跳转方式", trigger: 'blur'}
          ],
          title: [
            {required: true, message: "请输入标题", trigger: 'blur'}
          ],
          content: [
            {required: true, message: "请输入详情", trigger: 'blur'}
          ],
          url: [
            {required: true, message: "请输入链接" ,trigger: 'blur'}
          ],
          module: [
            {required: true, message: "请选择模块" ,trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      onContentChange (val) {
        this.dataForm.content = val
      },
      init: function (id) {
        this.dataForm.id = id || 0;
        this.visible = true;
        this.repeatVisible = false;
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields();
          if (this.dataForm.id) {
            advertisement.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.image = data.advertisement.image
                this.dataForm.jumpMode = data.advertisement.jumpMode
                this.dataForm.title = data.advertisement.title
                this.dataForm.content = data.advertisement.content
                this.dataForm.url = data.advertisement.url
                this.dataForm.module = data.advertisement.module
              }
            })
          }else {

          }

        })
      },
      // remoteMethod (query) {
      //   this.loading = true
      //   if (query !== '') {
      //     advertisement.getCommodity({name: query}).then(({data}) => {
      //       if (data && data.code === 200) {
      //         this.loading = false;
      //         this.options = data.list
      //       }
      //     })
      //   }
      // },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.repeatVisible = true;
            let params = {
              'id': this.dataForm.id || undefined,
              'image': this.dataForm.image,
              'jumpMode': this.dataForm.jumpMode,
              "title": this.dataForm.title,
              'content': this.dataForm.content,
              'url': this.dataForm.url,
              'module': this.dataForm.module,
            };
            let tick = !this.dataForm.id ? advertisement.add(params) : advertisement.update(params)
            tick.then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: "操作成功",
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
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
        this.imageUrl = URL.createObjectURL(file.raw)
        if (res && res.code === 200) {
          this.dataForm.image = res.result.title
        }
      },
      beforeAvatarUpload (file) {
        return true
      },
      //关闭弹框的事件
      closeDialog(){
          this.options.length = 0;
      },
    },

  }
</script>
<style>
  .el-form-item__error {
    top: 104%;
  }
</style>
