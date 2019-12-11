<template> 
  <div>
    <el-upload
      :action="global.uploadUrl"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="maxCount"
      :on-exceed="handleExceed"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount: {
        type: Number,
        default: 6
      }
    },
    data () {
      return {
        dialogVisible: false,
        dialogImageUrl: null,
      }
    },
    computed: {
      fileList () {
        let fileList = []
        if (this.value) {
          for (let i = 0; i < this.value.length; i++) {
            fileList.push({
              name: this.value[i],
              url: this.global.showUrl + this.value[i],
              title: this.value[i]
            })
          }
        }
        return fileList
      },
    },
    methods: {
      emitInput (fileList) {
        let value = []
        for (let i = 0; i < fileList.length; i++) {
          value.push(fileList[i].title)
        }
        this.$emit('input', value)
      },
      handleRemove (file, fileList) {
        this.emitInput(fileList)
      },
      handlePreview (file) {
        this.dialogVisible = true
        this.dialogImageUrl = file.url
      },
      beforeUpload (file) {
        let _self = this
        return true
      },
      handleUploadSuccess (res, file) {
        if (res && res.code === 200) {
          this.fileList.push({
            name: file.name,
            url: this.global.showUrl + res.result.title,
            title: res.result.title
          })
          this.emitInput(this.fileList)
        }
      },
      handleExceed (files, fileList) {
        this.$message({
          message: '最多只能上传' + this.maxCount + '张图片',
          type: 'warning',
          duration: 1000
        })
      },
    }
  }
</script>
<style>

</style>


