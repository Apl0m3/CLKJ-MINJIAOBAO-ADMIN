import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const advertisement = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/advertisement/list'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/advertisement/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),

// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/advertisement/save'),
    method: 'post',
    data: http.adornData(params)
  }),
  // 添加
  getCommodity: (params) => http({
    url: http.adornUrl('/manage/commodity/getCommodityByName'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/advertisement/update'),
    method: 'post',
    data: http.adornData(params)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/advertisement/delete'),
    method: 'post',
    data: http.adornData(params, false)
  }),

  getTypeList: () => http({
    url: http.adornUrl('/manage/advertisement/getTypeList'),
    method: 'post',
    // data: http.adornData(params, 'post', false)
  })
};
