import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'

export const message = {
// 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/message/list'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/message/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),

// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/message/save'),
    method: 'post',
    params: http.adornParams(params)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/message/update'),
    method: 'post',
    params: http.adornParams(params)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/message/delete'),
    method: 'post',
    params: http.adornParams(params, false)
  }),
    // 获取用户信息
  getUser: (params) => http({
    url: http.adornUrl('/manage/user/getUserByPhone?phone='+params),
    method: 'get',
    // params: http.adornParams(params, false)
  })
}
