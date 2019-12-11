<template>
  <el-dialog
    :title="$t('manage.usermanage.integral.title')" :visible.sync="visible">
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        :label="$t('common.num')">
      </el-table-column>
      <el-table-column
        prop="transactionId"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.integral.transactionId')">
      </el-table-column>
      <el-table-column
        prop="previousValue"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.integral.previousValue')">
      </el-table-column>
      <el-table-column
        prop="currentValue"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.integral.currentValue')">
      </el-table-column>
      <el-table-column
        prop="changeValue"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.integral.changeValue')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.type===1?'+':'-'}}{{scope.row.changeValue}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.integral.createTime')">
      </el-table-column>

      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.integral.remark')">
      </el-table-column>

      <!--    <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
              <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>-->
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
  </el-dialog>
</template>

<script>
  import {user} from '@/action/user'

  export default {
    data() {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        visible: false,
        pageIndex: 1,
        userId: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    methods: {
      // 获取数据列表
      init(userId) {
        if (userId) this.userId = userId;
        this.visible = true;
        this.dataListLoading = true;
        this.$nextTick(() => {
          let params = {
            page: this.pageIndex,
            limit: this.pageSize,
            userId: this.userId
          };
          user.userIntegralLogList(params).then(({data}) => {
            if (data && data.code === 200) {
              this.dataList = data.page.list
              this.totalPage = data.page.totalCount
            } else if (data && data.code === 500) {
              this.$message.error(data.msg)
            } else {
              this.dataList = []
              this.totalPage = 0
            }
            this.dataListLoading = false
          })
        })
      },
      getDataList() {
        this.dataListLoading = true;
        let params = {
          page: this.pageIndex,
          limit: this.pageSize,
          user_id: this.userId
        };
        user.userIntegralLogList(params).then(({data}) => {
          if (data && data.code === 200) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else if (data && data.code === 500) {
            this.$message.error(data.msg)
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val
        this.pageIndex = 1
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
      }
    }
  }
</script>

<style scoped>

</style>
