<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <!--手机查询条件--><el-input v-model="dataForm.phone" :placeholder="$t('manage.operation.sendsmslog.placeholder')" clearable></el-input>
      </el-form-item>
        <el-form-item>
          <!--查询按钮--> <el-button @click="getDataList()">{{$t('manage.operation.sendsmslog.query')}}</el-button>
<!--           <el-button v-if="isAuth('manage:syssendsmslog:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
<!--           <el-button v-if="isAuth('manage:syssendsmslog:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
         </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

<!--      &lt;!&ndash;id号&ndash;&gt;<el-table-column-->
<!--        prop="id"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        :label="$t('manage.operation.sendsmslog.id')">-->
<!--      </el-table-column>-->
      <!--邮箱-->
      <el-table-column
        prop="phone"
        header-align="center"
        align="center"
        :label="$t('manage.operation.sendsmslog.mail')">
      </el-table-column>
      <!--创建时间--><el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.operation.sendsmslog.createTime')">
      </el-table-column>
      <!--验证码--><el-table-column
        prop="code"
        header-align="center"
        align="center"
        :label="$t('manage.operation.sendsmslog.code')">
      </el-table-column>
      <!--验证状态--><el-table-column
        prop="status"
        header-align="center"
        align="center"
        :label="$t('manage.operation.sendsmslog.status')">
        <template slot-scope="scope">
          <!--成功--> <el-tag v-if="scope.row.status===0" size="small" type="success">{{$t('manage.operation.sendsmslog.Success')}}</el-tag>
          <!--失败--><el-tag v-if="scope.row.status===1" size="small" type="danger">{{$t('manage.operation.sendsmslog.fail')}}</el-tag>
        </template>
      </el-table-column>
      <!--   <el-table-column
           prop="content"
           header-align="center"
           align="center"
           label="">
         </el-table-column>
         <el-table-column
           prop="msg"
           header-align="center"
           align="center"
           label="">
         </el-table-column>-->
      <!--验证类型 注册 登录 忘记密码--><el-table-column
        prop="type"
        header-align="center"
        align="center"
        :label="$t('manage.operation.sendsmslog.type')">
        <template slot-scope="scope">
          <!--注册--> <el-tag v-if="scope.row.type==1" size="small" type="danger">{{$t('manage.operation.sendsmslog.register')}}</el-tag>
          <!--登录--><el-tag v-if="scope.row.type==2" size="small" type="danger">{{$t('manage.operation.sendsmslog.signIn')}}</el-tag>
          <!--忘记密码--><el-tag v-if="scope.row.type==3" size="small" type="danger">{{$t('manage.operation.sendsmslog.forgetPassword')}}</el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        fixed="right"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        width="150"-->
<!--        label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">详情</el-button>-->
<!--          &lt;!&ndash;          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>&ndash;&gt;-->
<!--        </template>-->
<!--      </el-table-column>-->
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
<!--    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>-->
  </div>
</template>

<script>
  import {syssendsmslog} from '@/action/syssendsmslog'
  // import AddOrUpdate from './add-or-update'

  export default {
    data () {
      return {
        dataForm: {
          phone: ''
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
      // AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        var params = {
          page: this.pageIndex,
          limit: this.pageSize,
          phone: this.dataForm.phone
        }
        syssendsmslog.list(params).then(({data}) => {
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
      }
      // 新增 / 修改
      // addOrUpdateHandle(id) {
      //   this.addOrUpdateVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.addOrUpdate.init(id)
      //   })
      // },
    }
  }
</script>
