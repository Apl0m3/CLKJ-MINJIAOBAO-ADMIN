<template>
  <div class="mod-config">
    <el-tag>当月注册人数：{{this.dataForm.monthlyCount}}</el-tag>
    <el-tag>当天注册人数：{{this.dataForm.dayCount}}</el-tag>
    <el-tag>现有用户人数：{{this.dataForm.totalCount}}</el-tag>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" :rules="dataRule" >
    </el-form>
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
        prop="userRoleId"
        header-align="center"
        align="center"
        :label="$t('manage.user.memberType')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userRoleId === 1">举办者</el-tag>
          <el-tag v-if="scope.row.userRoleId === 2">教职工</el-tag>
          <el-tag v-if="scope.row.userRoleId === 3">兼职客服</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        :label="$t('manage.user.name')">
      </el-table-column>
      <el-table-column
        prop="sex"
        header-align="center"
        align="center"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.user.createTime')">
      </el-table-column>
      <el-table-column
        prop="cards"
        header-align="center"
        align="center"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="parentName"
        header-align="center"
        align="center"
        label="所属机构">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="status"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--:label="$t('manage.user.status')">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag v-if="scope.row.status===0">{{$t("manage.user.normal")}}</el-tag>-->
          <!--<el-tag type="danger" v-if="scope.row.status===1">{{$t("manage.user.forbidden")}}</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column-->
        <!--fixed="right"-->
        <!--header-align="center"-->
        <!--align="center"-->
        <!--width="200"-->
        <!--:label="$t('common.operation')">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{$t('common.update')}}-->
          <!--</el-button>-->
          <!--<el-button type="text" size="small" @click="enableDisable(scope.row)">-->
            <!--{{scope.row.status===0 ? $t('manage.user.forbidden') : $t('manage.user.enable')}}-->
          <!--</el-button>-->
          <!--<el-button type="text" size="small" @click="restPwd(scope.row)">{{$t('manage.user.resetPass')}}</el-button>-->
          <!--<el-button type="text" size="small" v-if="scope.row.userRoleId==2||scope.row.userRoleId==3" @click="updateCustomerService(scope.row)" >{{scope.row.userRoleId==2?'设为客服':'取消客服'}}</el-button>-->
          <!--<el-button type="text" size="small" @click="amountAdded(scope.row)"  >添加余额</el-button>-->
          <!--&lt;!&ndash;          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="text" size="small" @click="userIntegralLog(scope.row.id)">&ndash;&gt;-->
            <!--&lt;!&ndash;{{$t('manage.user.integralRecord')}}&ndash;&gt;-->
          <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button type="text" size="small" @click="userCollection(scope.row.id)">{{$t('manage.user.userCollection')}}</el-button>&ndash;&gt;-->

          <!--&lt;!&ndash;<el-button type="text" size="small" @click="invitationUserHandle(scope.row.id)">{{$t('manage.user.invitation')}}</el-button>&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
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

    <!--<user-integral-log v-if="userIntegralLogVisible" ref="userIntegralLog"-->
                       <!--@refreshDataList="getDataList"></user-integral-log>-->
    <!--  查看用户收藏记录-->
    <!--<user-collection v-if="userCollectionVisible" ref="userCollection"-->
    <!--@refreshDataList="getDataList"></user-collection>-->
    <!--&lt;!&ndash;  修改分销用户及积分&ndash;&gt;-->
    <!--<update-user-integral v-if="updateUserIntegralVisible" ref="updateUserIntegral"-->
    <!--@refreshDataList="getDataList"></update-user-integral>-->
    <!--&lt;!&ndash;  修改分销用户及积分&ndash;&gt;-->
    <!--<invitation-user v-if="invitationUserVisible" ref="invitationUser"-->
    <!--@refreshDataList="getDataList"></invitation-user>-->
  </div>
</template>

<script>
    import {user} from '@/action/user'
    import AddOrUpdate from './add-or-update'
    import UserAccount from './user-account'
    // import UserIntegralLog from './user-integral-log'
    import {message} from "../../../../action/message";

    export default {
        data() {
            return {
                dataForm: {
                    userName: '',
                    userRoleId: '',
                    gender: null,
                    period: [],
                  monthlyCount:0,
                  dayCount:0,
                  totalCount:0
                },
                dataRule: {

                },
                dataList: [],

                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],


            }
        },
        components: {

        },
        activated() {
            this.getDataList()
        },
        methods: {
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true;
                if(this.dataForm.period != null){
                   var startTime = this.dataForm.period.length >= 1 ? this.dataForm.period[0] : '';
                   var endTime = this.dataForm.period.length == 2 ? this.dataForm.period[1] : '';
                }
                let params = {
                    page: this.pageIndex,
                    limit: this.pageSize,
                };
                user.activeUserList(params).then(({data}) => {
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
              user.peopleCount().then(({data})=>{
                if (data && data.code === 200) {
                  this.dataForm.dayCount=data.dayCount
                  this.dataForm.monthlyCount=data.monthlyCount
                  this.dataForm.totalCount=data.totalCount
                }
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








        }
    }
</script>
