import isInteger from 'lodash/isInteger'
import http from '../utils/httpRequest'

export const cashBack={
    // 获取列表
   list:(params) => http({
    url:  http.adornUrl('/cashBack/thirdpartycashback/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
   }),
    // 获取信息
    info:(id) =>http({
        url:  http.adornUrl('/cashBack/thirdpartycashback/info' + (isInteger(id) ? `/${id}` : '')),
        method: 'get',
        params: http.adornParams({}, 'get')
    }),
// 添加
    add:(params) =>http({
        url:  http.adornUrl('/cashBack/thirdpartycashback/save'),
        method: 'post',
        data: http.adornData(params)
    }),

// 修改
  verify:(params) =>http({
    url:  http.adornUrl('/cashBack/thirdpartycashback/verify'),
    method: 'post',
    data: http.adornData(params)
    }),


// 删除
 del:(params) =>http({
        url: requestUrl('/cashBack/thirdpartycashback/delete'),
        method: 'post',
        data: http.adornData(params, 'post', false)
    })

}
