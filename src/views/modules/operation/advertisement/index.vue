<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
       <!--&lt;!&ndash;广告标题&ndash;&gt; <el-input v-model="dataForm.title" :placeholder="$t('manage.operation.advertisement.title')" clearable></el-input>-->
        <el-select v-model="position" clearable :placeholder="$t('manage.operation.advertisement.title')">
          <el-option
            v-for="item in positionList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item>
        <!--查询--><el-button @click="getDataList()">{{$t('manage.operation.advertisement.query')}}</el-button>
        <!--新增--><el-button v-if="isAuth('manage:advertisement:save')" type="primary" @click="addOrUpdateHandle()">{{$t('manage.operation.advertisement.newAdd')}}</el-button>
<!--        <el-button v-if="isAuth('manage:advertisement:delete')" type="danger" @click="deleteHandle()"-->
<!--                   :disabled="dataListSelections.length <= 0">批量删除-->
<!--        </el-button>-->
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">

      <!--编号-->
<!--      <el-table-column-->
<!--        prop="id"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        :label="$t('manage.operation.advertisement.id')">-->
<!--      </el-table-column>-->
      <!--广告标题-->
<!--      <el-table-column-->
<!--        prop="title"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        :label="$t('manage.operation.advertisement.title')">-->
<!--      </el-table-column>-->
      <!--位置--><el-table-column
      prop="position"
      header-align="center"
      align="center"
      :label="$t('manage.operation.advertisement.position')">
      <template slot-scope="scope">
        <!--模板跳转--><el-tag v-if="scope.row.position === 3" size="small" >{{$t('manage.operation.advertisement.position3')}}</el-tag>
        <!--外部跳转--><el-tag v-if="scope.row.position === 2" size="small" >{{$t('manage.operation.advertisement.position2')}}</el-tag>
        <!--详情--><el-tag v-if="scope.row.position === 1" size="small">{{$t('manage.operation.advertisement.position1')}}</el-tag>
      </template>
    </el-table-column>
      <!--广告图片--><el-table-column
        prop="image"
        header-align="center"
        align="center"
        :label="$t('manage.operation.advertisement.image')">
        <template slot-scope="scope">
          <img :src="global.showUrl+scope.row.image" alt="" style="width: 50px;height: 50px"
               v-if="scope.row.image!==null">
        </template>
      </el-table-column>
      <!--跳转方式--><el-table-column
        prop="jumpMode"
        header-align="center"
        align="center"
        :label="$t('manage.operation.advertisement.jumpMode')">
        <template slot-scope="scope">
          <!--模板跳转--><el-tag v-if="scope.row.jumpMode === 3" size="small" >{{$t('manage.operation.advertisement.jumpMode3')}}</el-tag>
          <!--外部跳转--><el-tag v-if="scope.row.jumpMode === 2" size="small" >{{$t('manage.operation.advertisement.jumpMode2')}}</el-tag>
          <!--详情--><el-tag v-if="scope.row.jumpMode === 1" size="small">{{$t('manage.operation.advertisement.jumpMode1')}}</el-tag>
        </template>
      </el-table-column>

<!--      <el-table-column-->
<!--        prop="url"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="广告链接">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag size="small">{{getUrl(scope.row.url,scope.row.type,scope.row.jumpMode)}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="createSysUserName"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="创建用户">-->
<!--      </el-table-column>-->
      <!--创建时间--><el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.operation.advertisement.createTime')">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="updateSysUserName"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="修改用户">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="updateTime"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="修改时间">-->
<!--      </el-table-column>-->
      <!--操作--><el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        :label="$t('manage.operation.advertisement.operation')">
        <template slot-scope="scope">
          <!--修改--><el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{$t('manage.operation.advertisement.modify')}}</el-button>
          <!--删除--><el-button type="text" size="small" @click="deleteHandle(scope.row.id)">{{$t('manage.operation.advertisement.delete')}}</el-button>
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
  import {advertisement} from '@/action/advertisement'
  import AddOrUpdate from './add-or-update'

  export default {
    data () {
      return {
        dataForm: {
          title: ''
        },
        positionList: [{
          value: 1,
          label: '首页'
        }, {
          value: 2,
          label: '商品列表页'
        }, {
          value: 3,
          label: '积分商品页'
        }
        ],
        position: null,
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
          title: this.dataForm.title,
          position: this.position
        }
        advertisement.list(params).then(({data}) => {
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
      getUrl (url, type, jumpMode) {
        return this.$t('manage.operation.advertisement.stop')
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        let deletePrompt = this.$t('prompt.delete') // 删除提示
        let title = this.$t('prompt.title') // 提示
        this.$confirm(deletePrompt, title, {
          confirmButtonText: this.$t('manage.operation.advertisement.confirm'),
          cancelButtonText: this.$t('manage.operation.advertisement.cancel'),
          type: 'warning'
        }).then(() => {
          advertisement.del(ids).then(({data}) => {
            if (data && data.code === 200) {
              this.$message({
                message: this.$t('manage.operation.advertisement.success'),
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
