<template> 
  <el-card shadow="never" class="cardBg">
    <div style="width: 300px;display: inline-block;margin-left: 10px">
      <el-upload
        :action="global.uploadUrl"
        list-type="picture"
        :multiple="false"
        :show-file-list="showFileList"
        :file-list="fileList"
        accept="image/jpeg,image/gif,image/png"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :on-preview="handlePreview">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="fileList[0].url" alt="">
      </el-dialog>
    </div>
  </el-card>
</template>
<script>
  export default {
    name: 'singleUpload',
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
        return true
      },
      handleUploadSuccess (res, file) {
        if (res && res.code === 200) {
          let title = res.result.title
          this.fileList.pop()
          this.fileList.push({name: file.name, url: this.global.showUrl + file.name})
          this.emitInput(title)
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


