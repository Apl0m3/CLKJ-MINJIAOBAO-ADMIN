<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" :placeholder="$t('manage.usermanage.useraccount.key')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{$t('common.select')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
<!--      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="20">
      </el-table-column>-->
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.useraccount.name')">
      </el-table-column>
      <el-table-column
        prop="userRoleId"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.useraccount.userRoleId')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userRoleId === 1">{{$t("manage.user.pthy")}}</el-tag>
          <el-tag v-if="scope.row.userRoleId === 2">{{$t("manage.user.dls")}}</el-tag>
          <el-tag v-if="scope.row.userRoleId === 3">{{$t("manage.user.sjs")}}</el-tag>
          <el-tag v-if="scope.row.userRoleId === 4">{{$t("manage.user.gys")}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.useraccount.amount')">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.useraccount.totalAmount')">
      </el-table-column>
      <el-table-column
        prop="settlementAmount"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.useraccount.settlementAmount')">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        :label="$t('common.operation')">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="scope.row.amount>0" @click="addOrUpdateHandle(scope.row.id)">{{$t('manage.usermanage.useraccount.settlement')}}</el-button>
          <el-button type="text" size="small" v-else>{{$t('manage.usermanage.useraccount.unSettlement')}}</el-button>
          <!--<el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
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
  import {userAccount} from "../../../../action/userAccount";
  import AddOrUpdate from './add-or-update'

  export default {
    data() {
      return {
        dataForm: {
          key: ''
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
    activated() {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        let params = {
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key
        };
        userAccount.list(params).then(({data}) => {
          if (data && data.code === 200) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.pageIndex = 1;
        this.getDataList()
      },
      // 当前页
      currentChangeHandle(val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle(val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true;
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      // deleteHandle(id) {
      //   let ids = id ? [id] : this.dataListSelections.map(item => {
      //     return item.id
      //   });
      //   this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     userAccount.del(ids).then(({data}) => {
      //       if (data && data.code === 0) {
      //         this.$message({
      //           message: '操作成功',
      //           type: 'success',
      //           duration: 1500,
      //           onClose: () => {
      //             this.getDataList()
      //           }
      //         })
      //       } else {
      //         this.$message.error(data.msg)
      //       }
      //     })
      //   })
      // }
    }
  }
</script>
