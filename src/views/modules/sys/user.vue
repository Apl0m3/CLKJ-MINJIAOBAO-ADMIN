<template>
  <div class="mod-user">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <!--查询条件用户名-->  <el-input v-model="dataForm.userName" :placeholder="$t('sys.user.placeholder')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <!--查询--> <el-button @click="getDataList()">{{$t('sys.user.query')}}</el-button>
        <!--新增-->  <el-button v-if="isAuth('sys:user:save')" type="primary" @click="addOrUpdateHandle()">{{$t('sys.user.newAdd')}}</el-button>
        <!--        <el-button v-if="isAuth('sys:user:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <!--用户ID-->   <el-table-column
        prop="userId"
        header-align="center"
        align="center"
        width="80"
        :label="$t('sys.user.userId')">
      </el-table-column>
      <!--用户名--> <el-table-column
        prop="username"
        header-align="center"
        align="center"
        :label="$t('sys.user.userName')">
      </el-table-column>
      <!--邮箱--> <el-table-column
        prop="email"
        header-align="center"
        align="center"
        :label="$t('sys.user.email')">
      </el-table-column>
      <!--手机号--> <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        :label="$t('sys.user.mobile')">
      </el-table-column>
      <!--状态 禁用或正常--> <el-table-column
        prop="status"
        header-align="center"
        align="center"
        :label="$t('sys.user.status')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">{{$t('sys.user.Prohibit')}}</el-tag>
          <el-tag v-else size="small">{{$t('sys.user.normal')}}</el-tag>
        </template>
      </el-table-column>
      <!--创建时间--> <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="180"
        :label="$t('sys.user.createTime')">
      </el-table-column>
      <!--操作--> <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        :label="$t('sys.user.operation')">
        <template slot-scope="scope">
          <!--修改操作--> <el-button v-if="isAuth('sys:user:update')" type="text" size="small"
                     @click="addOrUpdateHandle(scope.row.userId)">{{$t('sys.user.modify')}}
          </el-button>
          <!--禁用或启用操作--> <el-button v-if="isAuth('sys:user:onOrOff')" type="text" size="small"
                     @click="onOrOffHandle(scope.row.userId,scope.row.status)"><span
            :style="scope.row.status===0?'':'color:red'">{{scope.row.status===0? $t('sys.user.Enable'):$t('sys.user.Prohibit')}}</span></el-button>
          <!--删除操作--> <el-button v-if="isAuth('sys:user:delete')" type="text" size="small" @click="deleteHandle(scope.row.userId)">
            {{$t('sys.user.delete')}}
          </el-button>
          <!--重置密码操作--> <el-button v-if="isAuth('sys:user:resetPassword')" type="text" size="small"
                     @click="resetPasswordHandle(scope.row.userId)">{{$t('sys.user.resetPassword')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './user-add-or-update'

  export default {
    data () {
      return {
        dataForm: {
          userName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/user/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.userName
          })
        }).then(({data}) => {
          if (data && data.code === 200) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var userIds = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        // this.$t("delete-prompt")

        let deletePrompt = this.$t('prompt.delete') // 删除提示
        let title = this.$t('prompt.title') // 提示
        console.log(deletePrompt, title)
        this.$confirm(deletePrompt, title, {
          confirmButtonText: this.$t('sys.user.confirm'), // 确认
          cancelButtonText: this.$t('sys.user.cancel'), // 取消
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/user/delete'),
            method: 'post',
            data: this.$http.adornData(userIds, false)
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: this.$t('sys.user.success'), // 操作成功
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {
        })
      },
      // 禁用/启用
      onOrOffHandle: function (id, status) {
        let title = this.$t('prompt.title')// 提示
        let Enable = this.$t('sys.user.Enable') // 启用
        let Prohibit = this.$t('sys.user.Prohibit') // 禁用
        let Confirmation = this.$t('sys.user.Confirmation') // 确认进行
        let operation1 = this.$t('sys.user.operation1') // 操作？
        this.$confirm(`${Confirmation}[${status ? Prohibit : Enable}]${operation1}`, title, {
          confirmButtonText: this.$t('sys.user.confirm'), // 确认
          cancelButtonText: this.$t('sys.user.cancel'), //  取消
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/user/onOrOff/' + id),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: this.$t('sys.user.success'), // 操作成功
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {
        })
      },
      // 重置密码
      resetPasswordHandle: function (id) {
        let title = this.$t('prompt.title')// 提示
        let resetPassword1 = this.$t('sys.user.resetPassword1') // 提示信息
        this.$confirm(resetPassword1, title, {
          confirmButtonText: this.$t('sys.user.confirm'), // 确认
          cancelButtonText: this.$t('sys.user.cancel'), // 取消
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/user/resetPassword/' + id),
            method: 'get'
          }).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: this.$t('sys.user.success'), // 操作成功
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {
        })
      }
    }
  }
</script>
