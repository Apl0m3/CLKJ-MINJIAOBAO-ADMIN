import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const user = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/user/list'),
    method: 'post',
    data: http.adornData(params, false)
  }),
  // 获取下属用户积分列表
  getInvitationUserLog: (params) => http({
    url: http.adornUrl('/manage/user/getInvitationUserLog'),
    method: 'post',
    data: http.adornData(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/user/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
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
  // 重置密码
  restPwd: (params) => http({
    url: http.adornUrl('/manage/user/restPwd'),
    method: 'post',
    params: http.adornParams(params, false)
  }),
  // 用户积分记录
  userIntegralLogList: (params) => http({
    url: http.adornUrl('/manage/user/userIntegralLogList'),
    method: 'get',
    params: http.adornParams(params, false)
  }),
  // 用户收藏记录
  userCollectionList: (params) => http({
    url: http.adornUrl('/manage/user/userCollectionList'),
    method: 'get',
    params: http.adornParams(params, false)
  }),
  // 修改分销用户积分
  updateUserIntegral: (params) => http({
    url: http.adornUrl('/manage/user/updateUserIntegral'),
    method: 'post',
    data: http.adornData(params, false)
  })
}
