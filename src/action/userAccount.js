import http from '../utils/httpRequest'
import isInteger from 'lodash/isInteger'
export const userAccount = {
  // 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/user/userAccount/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, 'get')
  }),
// 修改
  update: (params) => http({
    url: http.adornUrl('/manage/userAccount/update'),
    method: 'post',
    data: http.adornData(params)
  }),
// 删除
  del: (params) => http({
    url: http.adornUrl('/manage/userAccount/delete'),
    method: 'post',
    data: http.adornData(params, false)
  }),

}
