<template>
  <div class="mod-config">
<!--    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">-->
<!--      <el-form-item>-->
<!--        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button @click="getDataList()">查询</el-button>-->
<!--&lt;!&ndash;        <el-button v-if="isAuth('manage:termsagreement:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-button v-if="isAuth('manage:termsagreement:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>&ndash;&gt;-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

<!--      &lt;!&ndash;编号&ndash;&gt;<el-table-column-->
<!--        prop="id"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        :label="$t('manage.operation.greement.id')">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="icon"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="图标">-->
<!--        <template slot-scope="scope">-->
<!--          <img width="100px" height="100px" :src="global.showUrl+scope.row.icon"/>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <!--标题--><el-table-column
        prop="title"
        header-align="center"
        align="center"
        :label="$t('manage.operation.greement.title')">
      </el-table-column>

      <!--类型--><el-table-column
        prop="type"
        header-align="center"
        align="center"
        :label="$t('manage.operation.greement.type')">
        <template slot-scope="scope">
          <!--注册协议--> <el-tag v-if="scope.row.type==1">{{$t('manage.operation.greement.RegistrationAgreement')}}</el-tag>
          <!--设计师申请协议--><el-tag v-if="scope.row.type==2">{{$t('manage.operation.greement.designerRule')}}</el-tag>
          <!--代理商协议--><el-tag v-if="scope.row.type==3">{{$t('manage.operation.greement.agentRule')}}</el-tag>
          <!--供应商协议 --><el-tag v-if="scope.row.type==4">{{$t('manage.operation.greement.supplyRule')}}</el-tag>
          <!--页面提示 --><el-tag v-if="scope.row.type==5">{{$t('manage.operation.greement.tip')}}</el-tag>
        </template>
      </el-table-column>

<!--      <el-table-column-->
<!--        prop="content"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="内容">-->
<!--      </el-table-column>-->
      <!--创建时间--><el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.operation.greement.createTime')">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="createSysUserId"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="updateTime"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="updateSysUserId"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="">-->
<!--      </el-table-column>-->
      <!--操作--><el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        :label="$t('manage.operation.greement.operation')">
        <template slot-scope="scope">
          <!--修改--><el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{$t('manage.operation.greement.modify')}}</el-button>
<!--          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
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
  import {termsagreement} from '../../../../../src/action/termsagreement'
  import AddOrUpdate from './add-or-update'
  export default {
    data () {
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
          key: this.dataForm.key
        }
        termsagreement.list(params).then(({data}) => {
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
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        let deletePrompt = this.$t('prompt.delete') // 删除提示
        let title = this.$t('prompt.title') // 提示
        this.$confirm(deletePrompt, title, {
          confirmButtonText: this.$t('manage.operation.greement.confirm'),
          cancelButtonText: this.$t('manage.operation.greement.cancel'),
          type: 'warning'
        }).then(() => {
          termsagreement.del(ids).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: this.$t('manage.operation.greement.success'),
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
        })
      }
    }
  }
</script>
