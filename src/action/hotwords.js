import http from '../utils/httpRequest'
//
// import isInteger from 'lodash/isInteger'

export const hotWords = {
  // 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/hotWords/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
  })
}
