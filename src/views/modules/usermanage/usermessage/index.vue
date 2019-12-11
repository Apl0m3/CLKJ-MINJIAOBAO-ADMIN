<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.title" :placeholder="$t('manage.usermanage.usermessage.title')" clearable></el-input>
      </el-form-item>
      <el-select v-model="dataForm.readStatus" :clearable="true" :placeholder="$t('manage.usermanage.usermessage.readStatusPlaceholder')">
        <el-option label="未读" :value="0">未读</el-option>
        <el-option label="已读" :value="1">已读</el-option>
      </el-select>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.id')">
      </el-table-column>
      <el-table-column
        prop="acceptUserName"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.acceptUserName')">
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.title')">
      </el-table-column>
      <el-table-column
        prop="content"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.content')">
      </el-table-column>
      <el-table-column
        prop="senderUserName"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.senderUserName')">
      </el-table-column>
      <el-table-column
        prop="readStatus"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.readStatus')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.readStatus === 0" type="danger">{{$t('manage.usermanage.usermessage.unRead')}}</el-tag>
          <el-tag v-else type="success">{{$t('manage.usermanage.usermessage.read')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.usermanage.usermessage.createTime')">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        :label="$t('manage.usermanage.usermessage.operation')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row.id)">{{$t('manage.usermanage.usermessage.detailButton')}}</el-button>
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
    <!-- 弹窗, 详情 -->
    <usermessage-detail v-if="userMessageDetailVisible" ref="userMessageDetail" @refreshDataList="getDataList"></usermessage-detail>
  </div>
</template>

<script>
  import { usermessage } from '@/action/usermessage'
  import UsermessageDetail from './usermessage-detail'
  export default {
    data () {
      return {
        dataForm: {
          title: '',
          readStatus: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        userMessageDetailVisible: false
      }
    },
    components: {
      UsermessageDetail
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
          title: this.dataForm.title,
          readStatus: this.dataForm.readStatus
        }
        usermessage.list(params).then(({data}) => {
          if (data && data.code === 200) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            console.log(this.dataList)
            console.log(data.page.list)
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
      // 详情
      detailHandler (id) {
        this.userMessageDetailVisible = true
        this.$nextTick(() => {
          this.$refs.userMessageDetail.init(id)
        })
      }
    }
  }
</script>
