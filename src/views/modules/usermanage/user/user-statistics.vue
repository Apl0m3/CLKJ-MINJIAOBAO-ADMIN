<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" :rules="dataRule" >
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
<!--        width="50"-->
<!--        :label="$t('common.num')">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="avatar"
        header-align="center"
        align="center"
        :label="$t('manage.user.avatar')">
        <template slot-scope="scope">
          <img :src="global.showUrl+scope.row.avatar" alt="" style="width: 50px;height: 50px"
               v-if="scope.row.avatar!==null">
          <img style="width: 50px;height: 50px" src="../../../../../static/img/head.png"  v-else>
        </template>
      </el-table-column>
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
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.user.createTime')">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        :label="$t('manage.user.status')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===0">{{$t("manage.user.normal")}}</el-tag>
          <el-tag type="danger" v-if="scope.row.status===1">{{$t("manage.user.forbidden")}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        :label="$t('common.operation')">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">{{$t('common.update')}}
          </el-button>
          <el-button type="text" size="small" @click="enableDisable(scope.row)">
            {{scope.row.status===0 ? $t('manage.user.forbidden') : $t('manage.user.enable')}}
          </el-button>
          <el-button type="text" size="small" @click="restPwd(scope.row)">{{$t('manage.user.resetPass')}}</el-button>
          <el-button type="text" size="small" v-if="scope.row.userRoleId==2||scope.row.userRoleId==3" @click="updateCustomerService(scope.row)" >{{scope.row.userRoleId==2?'设为客服':'取消客服'}}</el-button>
          <el-button type="text" size="small" @click="amountAdded(scope.row)"  >添加余额</el-button>
          <!--          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>-->
          <!--<el-button type="text" size="small" @click="userIntegralLog(scope.row.id)">-->
            <!--{{$t('manage.user.integralRecord')}}-->
          <!--</el-button>-->
          <!--<el-button type="text" size="small" @click="userCollection(scope.row.id)">{{$t('manage.user.userCollection')}}</el-button>-->

          <!--<el-button type="text" size="small" @click="invitationUserHandle(scope.row.id)">{{$t('manage.user.invitation')}}</el-button>-->
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
    <user-account v-if="userAccountVisible" ref="userAccount" @refreshDataList="getDataList"></user-account>
    <!--&lt;!&ndash;用户钱包&ndash;&gt;-->
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
            // var checkMail = (rule, value, callback) => {
            //     let reg=/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            //     if(value){
            //         if ( !reg.test(value)) {
            //             return callback(new Error(this.$t('manage.user.validate.correctMail')));
            //         }
            //     }else {
            //         callback();
            //     }
            //
            // };
            return {
                dataForm: {
                    userName: '',
                    userRoleId: '',
                    gender: null,
                    period: []
                },
                dataRule: {
                    // userName: [
                    //     // {required: false, message: this.$t('manage.user.validate.userName'), trigger: 'blur'},
                    //     {validator: checkMail, trigger: 'blur'}
                    // ],

                },
                dataList: [],
                // options: [{
                //     value: this.$t('manage.user.pthy'),
                //     label: '1'
                // }, {
                //     value: this.$t('manage.user.fxhy'),
                //     label: '2'
                // }],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                userAccountVisible:false,
                // pickerOptions: {
                //     shortcuts: [{
                //         text: this.$t('manage.user.dataPickerOptions.text1'),
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: this.$t('manage.user.dataPickerOptions.text2'),
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }, {
                //         text: this.$t('manage.user.dataPickerOptions.text3'),
                //         onClick(picker) {
                //             const end = new Date();
                //             const start = new Date();
                //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                //             picker.$emit('pick', [start, end]);
                //         }
                //     }]
                // },

            }
        },
        components: {
            AddOrUpdate,
            UserAccount
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
                    userName: this.dataForm.userName,
                    userRoleId: this.dataForm.userRoleId,
                    startTime: startTime,
                    endTime: endTime,

                };
                user.list(params).then(({data}) => {
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
                this.addOrUpdateVisible = true;
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
          // 添加金额
          amountAdded(row) {
            let id, status, name;
            if (!row)
              id = row.id;
            name = row.nickName;
            status = row.status;
            if(status==1){
              return  this.$message.error("请先取消用户禁用状态")
            }
            this.userAccountVisible = true;
            this.$nextTick(() => {
              this.$refs.userAccount.init(row.id)
            })
          },


            // 删除
            deleteHandle(row) {
                let id, name;
                if (row) {
                    id = row.id;
                    name = row.nickName;
                }
                let ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.id
                });
                let names = name ? [name] : this.dataListSelections.map(item => {
                    return item.nickName
                });
                let params = {
                    'ids': ids
                };
                this.$confirm(this.$t("manage.user.buttonOperation.deleteOption"), this.$t("manage.user.buttonOperation.tips"), {
                    confirmButtonText: this.$t("common.comfirm"),
                    cancelButtonText: this.$t("common.cancel"),
                    type: 'warning'
                }).then(() => {
                    user.del(params).then(({data}) => {
                        if (data && data.code === 200) {
                            this.$message({
                                message: this.$t("common.success"),
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    }).catch(err => {
                        this.$message.error(err)
                    })
                }).catch(err => {

                })
            },
          // 禁用或启用
            enableDisable(row) {
                let id, status, name,userRoleId;
                if (!row)
                    id = row.id;
                name = row.nickName;
              userRoleId=row.userRoleId
                status = row.status;
              if(row.userRoleId==3){
                return this.$message.error("请先取消用户客服身份")
              }
                let message;
                if(status == 0){
                    message = this.$t("manage.user.forbiddenSuccess")
                }else {
                    message =this.$t("manage.user.enableSuccess")
                }
                let params = {
                    'id': row.id
                };
                user.enableDisable(params).then(({data}) => {
                    if (data && data.code === 200) {
                        this.$message({
                            message: message,
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
                // let content1 = this.$t('manage.user.buttonOperation.content1')
                // content1 = content1.replace("name", name);
                // content1 = content1.replace("status", status === 0 ? this.$t('manage.user.enable') : this.$t('manage.user.forbidden'));
                // this.$confirm(content1, this.$t("manage.user.buttonOperation.tips"), {
                //     confirmButtonText: this.$t("common.comfirm"),
                //     cancelButtonText: this.$t("common.cancel"),
                //     type: 'warning'
                // }).then(() => {
                //     user.enableDisable(params).then(({data}) => {
                //         if (data && data.code === 200) {
                //             this.$message({
                //                 message: this.$t("common.success"),
                //                 type: 'success',
                //                 duration: 1500,
                //                 onClose: () => {
                //                     this.getDataList()
                //                 }
                //             })
                //         } else {
                //             this.$message.error(data.msg)
                //         }
                //     })
                // });
            },
          // 设置与取消客服
          updateCustomerService(row) {
            let id, status, userRoleId;
            if (!row)
              id = row.id;
            userRoleId = row.userRoleId;
            status = row.status;
            let message;
            if(status==1){
              return  this.$message.error("请先取消用户禁用状态")
            }
            if(row.userRoleId == 2){
              message = "设置成功"
            }else {
              message = "取消成功"
            }
            let params = {
              'id': row.id
            };
            user.updateUserRoleId(params).then(({data}) => {
              if (data && data.code === 200) {
                this.$message({
                  message: message,
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

          },


          // 重置登录密码
            restPwd(row) {
                let id = row.id;
                let name = row.name;
                let content2 = this.$t('manage.user.buttonOperation.content2')
                content2 = content2.replace('name', name)
                this.$confirm(content2, this.$t("manage.user.buttonOperation.tips"), {
                    confirmButtonText: this.$t("common.comfirm"),
                    cancelButtonText: this.$t("common.cancel"),
                    type: 'warning'
                }).then(() => {
                    let params = {
                        'id': id
                    };
                    user.restPwd(params).then(({data}) => {
                        if (data && data.code === 200) {
                            // this.$message({
                            //     message: this.$t("manage.user.buttonOperation.restPwdMes") + data.msg,
                            //     type: 'success',
                            //     duration: 1500,
                            //     onClose: () => {
                            //         this.getDataList()
                            //     }
                            // })
                            this.$notify({
                                title: this.$t('common.success'),
                                message: this.$t("manage.user.buttonOperation.restPwdMes") + data.msg,
                                duration: 5000,
                                type: 'success',
                                onClose: () => {
                                    this.getDataList()
                                }
                            });


                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                });
            },
        }
    }
</script>
