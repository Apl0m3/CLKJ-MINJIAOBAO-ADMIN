import http from '../utils/httpRequest'
import isInteger from 'lodash/isInteger'
export const userAccount = {
  // 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/user/userAccount/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
  }),
  deliveryList: (params) => http({
    url: http.adornUrl('/manage/user/userAccount/deliveryList'),
    method: 'get',
    params: http.adornParams(params, 'get')
  }),
  settledDeliveryList: (params) => http({
    url: http.adornUrl('/manage/user/userAccount/settledDeliveryList'),
    method: 'get',
    params: http.adornParams(params, 'get')
  }),
  // 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/user/userAccount/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, 'get')
  }),
// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/user/userAccount/save'),
    method: 'post',
    data: http.adornData(params)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/user/userAccount/update'),
    method: 'post',
    data: http.adornData(params)
  }),
// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/userAccount/delete'),
    method: 'post',
    data: http.adornData(params, false)
  }),
  // 结算金额
  settlement: (params) => http({
    url: http.adornUrl('/manage/user/userAccount/settleAccounts'),
    method: 'post',
    data: http.adornData(params, false)
  })

}
