import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const awardset = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/awardset/list'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/awardset/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),

// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/awardset/save'),
    method: 'post',
    data: http.adornData(params)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/awardset/update'),
    method: 'post',
    data: http.adornData(params)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/awardset/delete'),
    method: 'post',
    data: http.adornData(params, false)
  })
}
