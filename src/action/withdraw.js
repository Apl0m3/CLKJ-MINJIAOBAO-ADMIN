import isInteger from 'lodash/isInteger'
import http from '../utils/httpRequest'

export const withdraw={
    // 获取列表
   list:(params) => http({
    url:  http.adornUrl('/withdraw/withdraw/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
   }),
    // 获取信息
    info:(id) =>http({
        url:  http.adornUrl('/withdraw/withdraw/info' + (isInteger(id) ? `/${id}` : '')),
        method: 'get',
        params: http.adornParams({}, 'get')
    }),
// 添加
    add:(params) =>http({
        url:  http.adornUrl('/withdraw/withdraw/save'),
        method: 'post',
        data: http.adornData(params)
    }),

// 修改
  update:(params) =>http({
    url:  http.adornUrl('/withdraw/withdraw/update'),
    method: 'post',
    data: http.adornData(params)
    }),


// 删除
 del:(params) =>http({
        url: http.adornUrl('/withdraw/withdraw/delete'),
        method: 'post',
        data: http.adornData(params, 'post', false)
    })

}
