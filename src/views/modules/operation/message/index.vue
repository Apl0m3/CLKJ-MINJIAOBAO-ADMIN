<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-form-item>
          <el-input v-model="dataForm.title" :placeholder="$t('manage.operation.message.titlePla')" clearable></el-input>
        </el-form-item>
        <el-select v-model="dataForm.type" :clearable="true" :placeholder="$t('manage.operation.message.typePla')">
            <el-option :label="$t('manage.operation.message.type1')" :value="1">{{$t('manage.operation.message.type1')}}</el-option>
            <el-option :label="$t('manage.operation.message.type2')" :value="2">{{$t('manage.operation.message.type2')}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">{{$t('common.select')}}</el-button>
        <el-button v-if="isAuth('manage:message:save')" type="primary" @click="addOrUpdateHandle()">{{$t('common.add')}}</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

<!--      <el-table-column-->
<!--        prop="id"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="编号">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="userName"
        header-align="center"
        align="center"
        :label="$t('manage.operation.message.userName')">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        :label="$t('manage.operation.message.type')">
        <template slot-scope="scope">
          <el-tag>{{scope.row.type===1?$t('manage.operation.message.type1'):$t('manage.operation.message.type2')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        header-align="center"
        align="center"
        :label="$t('manage.operation.message.title')">
      </el-table-column>
      <el-table-column
        prop="content"
        header-align="center"
        align="center"
        :label="$t('manage.operation.message.content')">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('common.createTime')">
      </el-table-column>
<!--      <el-table-column-->
<!--        fixed="right"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        width="150"-->
<!--        label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="text" size="small" @click="messagesDetailsHandle(scope.row.id)">详情</el-button>-->
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
<!--    &lt;!&ndash; 详情 &ndash;&gt;-->
<!--    <message-details v-if="messagesDetailsVisible" ref="messagesDetails" @refreshDataList="getDataList"></message-details>-->
  </div>
</template>

<script>
  import {message} from '@/action/message'
  import AddOrUpdate from './add-or-update'
  // import MessageDetails from './message-details'

  export default {
    data() {
      return {
        dataForm: {
          title: '',
          type:''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        messagesDetailsVisible: false
      }
    },
    components: {
      AddOrUpdate,
      // MessageDetails
    },
    activated() {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        var params = {
          page: this.pageIndex,
          limit: this.pageSize,
          title: this.dataForm.title,
          type: this.dataForm.type,

        }
        message.list(params).then(({data}) => {
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
      },
      // 新增 / 修改
      addOrUpdateHandle(id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 详情
      messagesDetailsHandle(id) {
        this.messagesDetailsVisible = true
        this.$nextTick(() => {
          this.$refs.messagesDetails.init(id)
        })
      },
      // 删除
      // deleteHandle(id) {
      //   var ids = id ? [id] : this.dataListSelections.map(item => {
      //     return item.id
      //   })
      //   this.$confirm(`确定进行[删除]操作?`, '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     message.del(ids).then(({data}) => {
      //       if (data && data.code === 200) {
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
