<template> 
  <el-card shadow="never" class="cardBg">
    <div style="width: 300px;display: inline-block;margin-left: 10px">
      <el-upload
        :action="global.uploadUrl"
        :multiple="false"
        :show-file-list="showFileList"
        :file-list="fileList"
        accept=".zip,.rar"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :on-preview="handlePreview">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传zip/rar文件,不超过50M</div>
      </el-upload>
    </div>
  </el-card>
</template>
<script>
    export default {
        name: 'zipUpload',
        props: {
            value: String
        },
        computed: {
            fileList () {

                return [{
                    name: this.value,
                    url: this.global.showUrl + this.value
                }]
            },
            showFileList () {
                if (this.value) {
                    return true
                }
                return false
            }
        },
        data () {
            return {
                dialogVisible: false,
            }
        },
        methods: {
            emitInput (val) {
                this.$emit('input', val)
            },
            handleRemove (file, fileList) {
                this.emitInput('')
            },
            handlePreview (file) {
                this.dialogVisible = true
            },
            beforeUpload (file) {
                let fileSize = file.size / 1024 / 1024 ;
                if(fileSize > 50){
                    this.$message.error('上传稿件过大!');
                }
                return fileSize < 50;
            },
            handleUploadSuccess (res, file) {
                if (res && res.code === 200) {
                    let title = res.result.title
                    this.fileList.pop()
                    this.fileList.push({name: file.name, url: this.global.showUrl + file.name})
                    this.emitInput(title);
                    this.$message.success('上传成功!');
                }
            }
        }
    }
</script>
<style>
  .cardBg {
    background: #F8F9FC;
  }
</style>


