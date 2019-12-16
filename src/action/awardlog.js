import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const awardlog = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/awardlog/list'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/awardlog/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),

// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/awardlog/save'),
    method: 'post',
    data: http.adornData(params)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/awardlog/update'),
    method: 'post',
    data: http.adornData(params)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/awardlog/delete'),
    method: 'post',
    data: http.adornData(params,  false)
  })
}
