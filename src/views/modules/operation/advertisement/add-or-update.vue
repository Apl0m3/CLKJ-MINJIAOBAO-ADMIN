  <template>
  <!--新增或修改--><el-dialog
    :title="!dataForm.id ? $t('manage.operation.advertisement.newAdd') : $t('manage.operation.advertisement.modify')"
    :close-on-click-modal="false"
    @close='closeDialog'
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @submit.native.prevent="dataFormSubmit" label-width="80px">
      <!--广告图片--><el-form-item :label="$t('manage.operation.advertisement.image')" prop="image">
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
        <!--      位置-->
      <el-form-item :label="$t('manage.operation.advertisement.position')" prop="position">
        <el-radio-group v-model="dataForm.position">
          <el-radio :label="1">{{$t('manage.operation.advertisement.position1')}}</el-radio>
          <el-radio :label="2">{{$t('manage.operation.advertisement.position2')}}</el-radio>
          <el-radio :label="3">{{$t('manage.operation.advertisement.position3')}}</el-radio>
        </el-radio-group>
      </el-form-item>



<!--      展示广告方式-->
      <el-form-item v-if="dataForm.position==1" :label="$t('manage.operation.advertisement.banner')" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio :label="1">{{$t('manage.operation.advertisement.banner1')}}</el-radio>
          <el-radio :label="2">{{$t('manage.operation.advertisement.banner2')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--跳转方式-->
      <el-form-item :label="$t('manage.operation.advertisement.jumpMode')" prop="jumpMode">
        <el-radio-group v-model="dataForm.jumpMode">
<!--          &lt;!&ndash;详情&ndash;&gt;<el-radio :label="1">{{$t('manage.operation.advertisement.jumpMode1')}}</el-radio>-->
          <!--外部跳转--><el-radio :label="2">{{$t('manage.operation.advertisement.jumpMode2')}}</el-radio>
          <!--模板跳转--><el-radio :label="3">{{$t('manage.operation.advertisement.jumpMode3')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--外部跳转链接-->
      <el-form-item v-if="dataForm.jumpMode==2" :label="$t('manage.operation.advertisement.addOrupdate.url')" prop="linkUrl">
        <el-input v-model="dataForm.linkUrl" placeholder=""></el-input>
      </el-form-item>

      <!--模板跳转类型-->
      <el-form-item v-if="dataForm.jumpMode==3" :label="$t('manage.operation.advertisement.addOrupdate.type')" prop="module">
        <el-radio-group v-model="dataForm.module"  @change="radioFun">
          <!--商品分类-->
          <el-radio :label="1">{{$t('manage.operation.advertisement.addOrupdate.ShoppingMall')}}</el-radio>
          <!--积分商城-->
          <el-radio :label="2">{{$t('manage.operation.advertisement.addOrupdate.IntegralMall')}}</el-radio>
          <!--商品-->
          <el-radio :label="3">{{$t('manage.operation.advertisement.addOrupdate.commodity')}}</el-radio>
        </el-radio-group>
      </el-form-item>
<!--      商品分类 -->
      <el-form-item v-if="dataForm.module==1 && dataForm.jumpMode==3"  :label="$t('manage.operation.advertisement.addOrupdate.commodityType')" prop="commodityTypeId">
        <el-select v-model="dataForm.commodityTypeId" placeholder="请选择">
          <el-option
            v-for="item in commodityTypeOption"
            :key="item.commodityTypeId"
            :label="item.name"
            :value="item.commodityTypeId">
          </el-option>
        </el-select>
      </el-form-item>
      <!--商品信息-->
      <el-form-item v-if="dataForm.module == 3 && dataForm.jumpMode==3" :label="$t('manage.operation.advertisement.addOrupdate.commodityUrl')" prop="commodityNameId">
        <el-select
          v-model="dataForm.commodityNameId"
          filterable
          clearable
          remote
          reserve-keyword
          :placeholder="$t('manage.operation.advertisement.addOrupdate.commodityName')"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--        <el-input v-model="dataForm.commodityId" placeholder="商品编号"></el-input>-->
      </el-form-item>
      <!--广告标题-->
<!--      <el-form-item v-if="dataForm.jumpMode==1" :label="$t('manage.operation.advertisement.title')" prop="title">-->
<!--        <el-input v-model="dataForm.title" :placeholder="$t('manage.operation.advertisement.title')"></el-input>-->
<!--      </el-form-item>-->
      <!--广告内容-->
<!--      <el-form-item v-if="dataForm.jumpMode===1" :label="$t('manage.operation.advertisement.addOrupdate.content')" prop="content">-->

<!--        &lt;!&ndash;        <vue-wangeditor :id=ueId&ndash;&gt;-->
<!--        &lt;!&ndash;                        ref="editor" :menus="menus"&ndash;&gt;-->
<!--        &lt;!&ndash;                        width="70%" height="200"&ndash;&gt;-->
<!--        &lt;!&ndash;                        :value="dataForm.content"&ndash;&gt;-->
<!--        &lt;!&ndash;                        :uploadImgUrl="global.uploadUrl"&ndash;&gt;-->
<!--        &lt;!&ndash;                        @load="load" @error="error" @timeout="timeout"></vue-wangeditor>&ndash;&gt;-->
<!--        &lt;!&ndash;        <script :id=ueId type="text/plain"></script>&ndash;&gt;-->
<!--        <editor id="editor_id" width="100%" height="200"-->
<!--                :content="dataForm.content"-->
<!--                pluginsPath="/static/kindeditor/plugins/"-->
<!--                :loadStyleMode="false"-->
<!--                :uploadJson="global.uploadKEUrl"-->
<!--                @on-content-change="onContentChange"-->
<!--                :items="['source', '|', 'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',-->
<!--                     '|', 'justifyleft', 'justifycenter', 'justifyright',-->
<!--                    'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',-->
<!--                    'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen',-->
<!--                    'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',-->
<!--                    'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image',-->
<!--                    'insertfile', 'table', 'hr', 'pagebreak',-->
<!--                    , 'link', 'unlink', '|']"-->
<!--        >-->
<!--        </editor>-->
<!--      </el-form-item>-->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <!--取消--><el-button @click="visible = false">{{$t('manage.operation.advertisement.cancel')}}</el-button>
      <!--确认--><el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t('manage.operation.advertisement.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import {advertisement} from '@/action/advertisement'
  // import vueWangeditor from 'vue-wangeditor'
  export default {
    data () {
      return {
        repeatVisible: false,
        ue: null,
        ueId: `advertisement_ueId`,
        ueContent: '',
        initContent: '',
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
        //   'img',
        //   'insertcode', // 插入代码
        //   '|',
        //   'undo', // 撤销
        //   'redo', // 重做
        //   'fullscreen' // 全屏
        // ],
        visible: false,
        imageUrl: '',
        importFileUrl: '', // 在初始时指定url地址即可
        loading: false,
        options:[],
        dataForm: {
          id: 0,
          image: '',
          jumpMode: '',
          title: '',
          content: '',
          url: '',
          linkUrl:'', //外部链接
          createTime: '',
          module: '',
          commodityName:'',
          type:'',
          position:'',
          commodityNameId: '', //商品id
          commodityTypeId: '', //商品类型id
        },
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 100
        },
        defaultMsg: '',
        commodityTypeOption: [],
        count:0,
        dataRule: {
          image: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.imageRule'), trigger: 'blur'}
          ],
          jumpMode: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.jumpModeRule'), trigger: 'blur'}
          ],
          position: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.jumpModeRule'), trigger: 'blur'}
          ],
          title: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.titleRule'), trigger: 'blur'}
          ],
          content: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.contentRule'), trigger: 'blur'}
          ],
            linkUrl: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.urlRule') }
          ],
          commodityTypeId: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.urlRule'), trigger: 'blur'}
          ],
          commodityNameId: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.commodityTypeNameRule'), trigger: 'blur'}
          ],
          banner: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.commodityTypeNameRule'), trigger: 'blur'}
          ],
          type: [
            {required: true, message: this.$t('manage.operation.advertisement.addOrupdate.dataRule.commodityTypeNameRule'), trigger: 'blur'}
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
          this.getTypeList();
          this.dataForm.commodityTypeId = 0
          this.$refs['dataForm'].resetFields();
          if (this.dataForm.id) {
            advertisement.info(this.dataForm.id).then(({data}) => {
              if (data && data.code === 200) {
                this.dataForm.image = data.advertisement.image;
                this.dataForm.jumpMode = data.advertisement.jumpMode;
                this.dataForm.module = data.advertisement.module;
                this.dataForm.title = data.advertisement.title;
                this.dataForm.content = data.advertisement.content;
                this.dataForm.type = data.advertisement.type;
                this.initContent = data.advertisement.content;
                this.dataForm.position = data.advertisement.position;
                this.dataForm.commodityName = data.advertisement.commodityName;
                this.dataForm.url = data.advertisement.url; //当moudle=1 jumpMode=3 是商品类型id 当moudle=3 jumpMode=3 是商品id
                if(this.dataForm.jumpMode === 2){
                    this.dataForm.linkUrl =this.dataForm.url;
                }
                if(this.dataForm.jumpMode == 3 && this.dataForm.module == 3 ){
                    if(this.dataForm.commodityName!=null){
                        this.remoteMethod (this.dataForm.commodityName);
                    }
                    this.dataForm.commodityNameId = parseInt(this.dataForm.url)
                }
                if(this.dataForm.jumpMode == 3 && this.dataForm.module == 1 ){
                    this.dataForm.commodityTypeId = parseInt(this.dataForm.url)
                }
              }
            })
          }else {
              this.dataForm.type = 1;
              this.dataForm.position = 1;
              this.dataForm.commodityTypeId = 0;
              this.dataForm.jumpMode = 2;
              this.dataForm.module = 1;
              this.dataForm.linkUrl = '';

              // this.dataForm.commodityNameId = 0;
          }

        })
      },
      remoteMethod (query) {
        this.loading = true
        if (query !== '') {
          advertisement.getCommodity({name: query}).then(({data}) => {
            if (data && data.code === 200) {
              this.loading = false;
              this.options = data.list
            }
          })
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var url;
            if (this.dataForm.jumpMode === 3){
              switch (this.dataForm.module) {
                case 2:
                  break;
                case 3:
                  url = this.dataForm.commodityNameId;
                  break;
                default:
                  url = this.dataForm.commodityTypeId
              }
            }
            if(this.dataForm.jumpMode === 2){
              url = this.dataForm.linkUrl;
            }
            this.repeatVisible = true;
            let params = {
              'id': this.dataForm.id || undefined,
              'image': this.dataForm.image,
              'jumpMode': this.dataForm.jumpMode,
              'title': this.dataForm.title,
              'content': this.dataForm.content,
              'url': url,
              'module': this.dataForm.module,
              'commodityId': this.dataForm.commodityId,
              'type':this.dataForm.type,
              'position':this.dataForm.position,
            };

            let tick = !this.dataForm.id ? advertisement.add(params) : advertisement.update(params)
            tick.then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: this.$t('manage.operation.advertisement.success'),
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                    // this.clear();
                  }
                })
              } else {
                this.$message.error(data.msg)
                this.repeatVisible = false
                // this.clear();
              }
            })
          }
        })
      },
      radioFun(labelValue){
        if(labelValue === 1){
          this.getTypeList();
          this.dataForm.commodityTypeId = 0;
        }
        if(labelValue === 3){
            this.remoteMethod('')
            this.dataForm.commodityNameId = ''
        }

      },
      clearLoad () {
        this.dataForm.image = ''
        this.dataForm.jumpMode = 1
        this.dataForm.title = ''
        this.dataForm.content = ''
        this.dataForm.url = ''
        this.dataForm.commodityId = 0
        this.dataForm.type = 1
        this.$refs.editor.clear()
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
      //获取商品分类列表
      getTypeList() {
        advertisement.getTypeList().then(({data}) => {
          if (data && data.code === 200) {
            this.commodityTypeOption = data.typeList;
            this.commodityTypeOption.unshift({
              name:"全部",
              commodityTypeId:0
            })
          } else {
          }
        })
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
