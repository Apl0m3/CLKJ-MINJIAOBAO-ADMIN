import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const bet = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/bet/list'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/bet/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),

// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/bet/save'),
    method: 'post',
    data: http.adornData(params)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/bet/update'),
    method: 'post',
    data: http.adornData(params)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/bet/delete'),
    method: 'post',
    data: http.adornData(params, false)
  })
}
