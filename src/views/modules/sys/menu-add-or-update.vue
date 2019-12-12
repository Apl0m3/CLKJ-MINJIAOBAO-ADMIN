<template>
  <el-dialog
    :title="!dataForm.id ? $t('common.add') : $t('common.update')"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item :label="$t('sys.menu.type')" prop="type">
        <el-radio-group v-model="dataForm.type">
          <el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="dataForm.typeList[dataForm.type] + $t('sys.menu.name')" prop="name">
        <el-input v-model="dataForm.name"
                  :placeholder="dataForm.typeList[dataForm.type] + $t('sys.menu.name')"></el-input>
      </el-form-item>
      <!--<el-form-item v-if="dataForm.type!==2"-->
                    <!--label="i18n"-->
                    <!--prop="i18n"-->
                    <!--:rules="{required: true, message: this.$t('sys.menu.validate.i18nValidate'), trigger: 'blur'}">-->
        <!--<el-input v-model="dataForm.i18n" :placeholder="$t('sys.menu.i18n')"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item :label="$t('sys.menu.parentName')" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="menuId"
            ref="menuListTree"
            @current-change="menuListTreeCurrentChangeHandle"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true"
                  :placeholder="$t('sys.menu.select_placeholder')" class="menu-list__input"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type === 1" :label="$t('sys.menu.url')" prop="url">
        <el-input v-model="dataForm.url" :placeholder="$t('sys.menu.url')"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 0" :label="$t('sys.menu.perms')" prop="perms">
        <el-input v-model="dataForm.perms" :placeholder="$t('sys.menu.input_placeholder')"></el-input>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" :label="$t('sys.menu.orderNum')" prop="orderNum">
        <el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0"
                         :label="$t('sys.menu.orderNum')"></el-input-number>
      </el-form-item>
      <el-form-item v-if="dataForm.type !== 2" :label="$t('sys.menu.icon')" prop="icon">
        <el-row>
          <el-col :span="22">
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover">
              <div class="mod-menu__icon-list">
                <el-button
                  v-for="(item, index) in iconList"
                  :key="index"
                  @click="iconActiveHandle(item)"
                  :class="{ 'is-active': item === dataForm.icon }">
                  <icon-svg :name="item"></icon-svg>
                </el-button>
              </div>
            </el-popover>
            <el-input v-model="dataForm.icon" v-popover:iconListPopover :readonly="true" :placeholder="$t('sys.menu.iconPla')"
                      class="icon-list__input"></el-input>
          </el-col>
          <el-col :span="2" class="icon-list__tips">
            <el-tooltip placement="top" effect="light">
              <div slot="content">{{$t('sys.menu.content')}}<a
                href="//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js" target="_blank">icons/index.js</a>描述
              </div>
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancel')}}</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :disabled="repeatVisible">{{$t('common.comfirm')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {treeDataTranslate} from '@/utils'
  import Icon from '@/icons'

  export default {
    data () {
      var validateUrl = (rule, value, callback) => {
        if (this.dataForm.type === 1 && !/\S/.test(value)) {
          callback(new Error(this.$t('sys.menu.validate.validateUrl')))
        } else {
          callback()
        }
      }
      return {
        repeatVisible: false,
        visible: false,
        dataForm: {
          id: 0,
          type: 1,
          typeList: [this.$t('sys.menu.catalog'), this.$t('sys.menu.menu'), this.$t('sys.menu.button')],
          name: '',
          nameEs: '',
          i18n: '',
          parentId: 0,
          parentName: '',
          url: '',
          perms: '',
          orderNum: 0,
          icon: '',
          iconList: []
        },
        dataRule: {
          name: [
            {required: true, message: this.$t('sys.menu.validate.nameValidate'), trigger: 'blur'}
          ],
          parentName: [
            {required: true, message: this.$t('sys.menu.validate.parentNameValidate'), trigger: 'change'}
          ],
          url: [
            {validator: validateUrl, trigger: 'blur'}
          ]
        },
        menuList: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        }
      }
    },
    created () {
      this.iconList = Icon.getNameList()
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/menu/select'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.menuList = treeDataTranslate(data.menuList, 'menuId')
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        }).then(() => {
          if (!this.dataForm.id) {
            // 新增
            this.menuListTreeSetCurrentNode()
          } else {
            // 修改
            this.$http({
              url: this.$http.adornUrl(`/sys/menu/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              this.dataForm.id = data.menu.menuId
              this.dataForm.type = data.menu.type
              this.dataForm.name = data.menu.name
              this.dataForm.nameEs = data.menu.nameEs
              this.dataForm.i18n = data.menu.i18n
              this.dataForm.parentId = data.menu.parentId
              this.dataForm.url = data.menu.url
              this.dataForm.perms = data.menu.perms
              this.dataForm.orderNum = data.menu.orderNum
              this.dataForm.icon = data.menu.icon
              this.menuListTreeSetCurrentNode()
            })
          }
        })
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        this.dataForm.parentId = data.menuId
        this.dataForm.parentName = data.name
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId)
        this.dataForm.parentName = (this.$refs.menuListTree.getCurrentNode() || {})['name']
      },
      // 图标选中
      iconActiveHandle (iconName) {
        this.dataForm.icon = iconName
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.repeatVisible = true
            this.$http({
              url: this.$http.adornUrl(`/sys/menu/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'menuId': this.dataForm.id || undefined,
                'type': this.dataForm.type,
                'name': this.dataForm.name,
                'nameEs': this.dataForm.nameEs,
                'i18n': this.dataForm.i18n,
                'parentId': this.dataForm.parentId,
                'url': this.dataForm.url,
                'perms': this.dataForm.perms,
                'orderNum': this.dataForm.orderNum,
                'icon': this.dataForm.icon
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: this.$t('common.success'),
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

<style lang="scss">
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
      > .el-input__inner {
        cursor: pointer;
      }
    }

    &__icon-popover {
      max-width: 370px;
    }

    &__icon-list {
      max-height: 180px;
      padding: 0;
      margin: -8px 0 0 -8px;

      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;

        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }

    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
