<template>
  <el-dialog
    title="收藏记录" :visible.sync="visible">
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
        label="编号">
      </el-table-column>
      <el-table-column
        prop="images"
        header-align="center"
        align="center"
        label="商品图片">
        <template slot-scope="scope">
          <img :src="global.showUrl+scope.row.images" alt="" style="width: 50px;height: 50px"
               v-if="scope.row.images!==null">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="收藏时间">
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
            pageSize: this.pageSize,
            userId: this.userId
          };
          user.userCollectionList(params).then(({data}) => {
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
