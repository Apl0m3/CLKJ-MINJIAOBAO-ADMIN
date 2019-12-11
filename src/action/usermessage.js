import http from '../utils/httpRequest'
import isInteger from 'lodash/isInteger'

export const usermessage = {
    // 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/usermessage/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
  }),
    // 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/usermessage/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, 'get')
  }),
// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/usermessage/save'),
    method: 'post',
    data: http.adornData(params)
  }),

// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/usermessage/update'),
    method: 'post',
    data: http.adornData(params)
  }),

// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/usermessage/delete'),
    method: 'post',
    data: http.adornData(params, 'post', false)
  })

}
