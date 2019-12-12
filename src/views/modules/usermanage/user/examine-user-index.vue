<template>
  <div class="mod-config">
    <!--<el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" :rules="dataRule" >-->
      <!--<el-form-item prop="userName">-->
        <!--<el-input v-model="dataForm.userName" placeholder="电话号码" clearable></el-input>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        :label="$t('manage.user.account')">
      </el-table-column>
      <el-table-column
        prop="realName"
        header-align="center"
        align="center"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.user.createTime')">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="countPay"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--:label="$t('manage.user.countPay')">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        :label="$t('manage.user.status')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===3">待审核</el-tag>
          <el-tag type="danger" v-if="scope.row.status===4">审核失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        :label="$t('common.operation')">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status==4" size="small" @click="addOrUpdateHandle(scope.row.id)">查看
          </el-button>
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)" v-if="scope.row.status==3">
            审核
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
    <examine-user v-if="examineUserVisible" ref="examineUser" @refreshDataList="getDataList"></examine-user>

  </div>
</template>

<script>
    import {user} from '@/action/user'
    import ExamineUser from './examine-user'
    // import UserIntegralLog from './user-integral-log'
    import {message} from "../../../../action/message";

    export default {
        data() {
            return {
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
              examineUserVisible: false,
                userIntegralLogVisible: false,
                userCollectionVisible: false,
                updateUserIntegralVisible: false,
                invitationUserVisible: false,

            }
        },
        components: {
          ExamineUser
            // UserIntegralLog,
        },
        activated() {
            this.getDataList()
        },
        methods: {
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true;
                let page = {
                    page: this.pageIndex,
                    limit: this.pageSize,
                };
                user.examineList(page).then(({data}) => {
                    if (data && data.code === 200) {
                        this.dataList = data.page.list;
                        this.totalPage = data.page.totalCount;
                    } else if (data && data.code === 500) {
                        this.$message.error(data.msg)
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
                this.pageIndex = val;
                this.getDataList()
            },
            // 多选
            selectionChangeHandle(val) {
                this.dataListSelections = val
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                this.examineUserVisible = true;
                this.$nextTick(() => {
                    this.$refs.examineUser.init(id)
                })
            },
        }
    }
</script>
