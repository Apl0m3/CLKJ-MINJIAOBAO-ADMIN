import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const user = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/user/list'),
    method: 'post',
    data: http.adornData(params, false)
  }),
  // 获取注册举办者列表
  examineList: (params) => http({
    url: http.adornUrl('/manage/user/examineList'),
    method: 'get',
    params: http.adornParams(params, false)
  }),
  // 获取活跃用户列表
  activeUserList: (params) => http({
    url: http.adornUrl('/manage/user/activeUserList'),
    method: 'get',
    params: http.adornParams(params, false)
  }),
// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/user/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),
  // 获取信息举办者详情
  examineUser: (params) => http({
    url: http.adornUrl('/manage/user/examineUser'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/user/save'),
    method: 'post',
    data: http.adornData(params, false)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/user/update'),
    method: 'post',
    data: http.adornData(params, false)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/user/delete'),
    method: 'post',
    params: http.adornParams(params, false)
  }),
  // 禁用 启用
  enableDisable: (params) => http({
    url: http.adornUrl('/manage/user/enableDisable'),
    method: 'post',
    params: http.adornParams(params, false)
  }),
  // 禁用 启用
  updateUserRoleId: (params) => http({
    url: http.adornUrl('/manage/user/updateUserRoleId'),
    method: 'post',
    params: http.adornParams(params, false)
  }),
  // 重置密码
  restPwd: (params) => http({
    url: http.adornUrl('/manage/user/restPwd'),
    method: 'post',
    params: http.adornParams(params, false)
  }),
  // 获取当天及当月的注册人数
  peopleCount: () => http({
    url: http.adornUrl('/manage/user/peopleCount'),
    method: 'get',
    params: http.adornParams({}, false)
  }),


}
