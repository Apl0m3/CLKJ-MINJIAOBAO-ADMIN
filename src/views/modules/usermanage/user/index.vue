<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" :rules="dataRule" >
      <el-form-item prop="userName">
        <el-input v-model="dataForm.userName" :placeholder="$t('manage.user.mailNum')" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.userRoleId" :clearable="true" :placeholder="$t('manage.user.memberType_ph')">
          <el-option :value="'1'" :label="$t('manage.user.pthy')"></el-option>
          <el-option :value="'2'" :label="$t('manage.user.dls')"></el-option>
          <el-option :value="'3'" :label="$t('manage.user.sjs')"></el-option>
          <el-option :value="'4'" :label="$t('manage.user.gys')"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="dataForm.period"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="-"
          value-format="yyyy-MM-dd HH:mm:ss"
          :start-placeholder="$t('manage.user.startDate')"
          :end-placeholder="$t('manage.user.endDate')"
          align="right">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">{{$t('common.select')}}</el-button>
        <!--        <el-button v-if="isAuth('manage:adminuser:save')" type="primary" @click="addOrUpdateHandle()">{{$t('common.add')}}</el-button>-->
        <!--        <el-button v-if="isAuth('manage:adminuser:delete')" type="danger" @click="deleteHandle()"-->
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
          <el-tag v-if="scope.row.userRoleId === 1">{{$t("manage.user.pthy")}}</el-tag>
          <el-tag v-if="scope.row.userRoleId === 2">{{$t("manage.user.dls")}}</el-tag>
          <el-tag v-if="scope.row.userRoleId === 3">{{$t("manage.user.sjs")}}</el-tag>
          <el-tag v-if="scope.row.userRoleId === 4">{{$t("manage.user.gys")}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        :label="$t('manage.user.name')">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="birthday"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        :label="$t('manage.user.birthday')">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="gender"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        :label="$t('manage.user.gender')">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag v-if="scope.row.gender === 3">{{$t("manage.user.secret")}}</el-tag>-->
<!--          <el-tag v-if="scope.row.gender === 2">{{$t("manage.user.female")}}</el-tag>-->
<!--          <el-tag v-if="scope.row.gender === 1">{{$t("manage.user.male")}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :label="$t('manage.user.createTime')">
      </el-table-column>
      <el-table-column
        prop="integral"
        header-align="center"
        align="center"
        :label="$t('manage.user.integral')">
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
          <el-tag v-if="scope.row.status===0">{{$t("manage.user.normal")}}</el-tag>
          <el-tag type="danger" v-if="scope.row.status===1">{{$t("manage.user.forbidden")}}</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="sumPay"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--:label="$t('manage.user.sumPay')">-->
      <!--</el-table-column>-->

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
          <!--          <el-button type="text" size="small" @click="deleteHandle(scope.row)">删除</el-button>-->
          <el-button type="text" size="small" @click="userIntegralLog(scope.row.id)">
            {{$t('manage.user.integralRecord')}}
          </el-button>
          <!--<el-button type="text" size="small" @click="userCollection(scope.row.id)">{{$t('manage.user.userCollection')}}</el-button>-->
          <el-button type="text" size="small" @click="updateUserIntegral(scope.row.id)"
                     v-if="scope.row.memberType === 2">{{$t('manage.user.integralUpdate')}}
          </el-button>
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

    <!--  查看用户积分记录-->
    <user-integral-log v-if="userIntegralLogVisible" ref="userIntegralLog"
                       @refreshDataList="getDataList"></user-integral-log>
    <!--用户钱包-->
    <user-integral-log v-if="userIntegralLogVisible" ref="userIntegralLog"
                       @refreshDataList="getDataList"></user-integral-log>
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
    import UserIntegralLog from './user-integral-log'
    import UserCollection from './user-collection'
    import UpdateUserIntegral from './update-user-integral'
    import InvitationUser from './invitation-user'
    import {message} from "../../../../action/message";

    export default {
        data() {
            var checkMail = (rule, value, callback) => {
                let reg=/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
                if(value){
                    if ( !reg.test(value)) {
                        return callback(new Error(this.$t('manage.user.validate.correctMail')));
                    }
                }else {
                    callback();
                }

            };
            return {
                dataForm: {
                    userName: '',
                    userRoleId: '',
                    gender: null,
                    period: []
                },
                dataRule: {
                    userName: [
                        // {required: false, message: this.$t('manage.user.validate.userName'), trigger: 'blur'},
                        {validator: checkMail, trigger: 'blur'}
                    ],

                },
                dataList: [],
                options: [{
                    value: this.$t('manage.user.pthy'),
                    label: '1'
                }, {
                    value: this.$t('manage.user.fxhy'),
                    label: '2'
                }],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                userIntegralLogVisible: false,
                userCollectionVisible: false,
                updateUserIntegralVisible: false,
                invitationUserVisible: false,
                pickerOptions: {
                    shortcuts: [{
                        text: this.$t('manage.user.dataPickerOptions.text1'),
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: this.$t('manage.user.dataPickerOptions.text2'),
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: this.$t('manage.user.dataPickerOptions.text3'),
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },

            }
        },
        components: {
            AddOrUpdate,
            UserIntegralLog,
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
            // 积分
            userIntegralLog(id) {
                this.userIntegralLogVisible = true;
                this.$nextTick(() => {
                    this.$refs.userIntegralLog.init(id)
                })
            },// 修改积分
            updateUserIntegral(id) {
                this.updateUserIntegralVisible = true;
                this.$nextTick(() => {
                    this.$refs.updateUserIntegral.init(id)
                })
            },// 收藏
            userCollection(id) {
                this.userCollectionVisible = true;
                this.$nextTick(() => {
                    this.$refs.userCollection.init(id)
                })
            },// 邀请
            invitationUserHandle(id) {
                this.invitationUserVisible = true;
                this.$nextTick(() => {
                    this.$refs.invitationUser.init(id)
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
            },  // 禁用或启用
            enableDisable(row) {
                let id, status, name;
                if (!row)
                    id = row.id;
                name = row.nickName;
                status = row.status;
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
            },  // 重置登录密码
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
