import http from '../utils/httpRequest'

import isInteger from 'lodash/isInteger'


export const operatefeedback={
    // 获取列表
   list:(params) => http({
    url:  http.adornUrl('/manage/operatefeedback/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
   }),
    // 获取信息
    info:(id) =>http({
        url:  http.adornUrl('/manage/operatefeedback/info' + (isInteger(id) ? `/${id}` : '')),
        method: 'get',
        params: http.adornParams({}, 'get')
    }),
// 添加
    add:(params) =>http({
        url:  http.adornUrl('/manage/operatefeedback/save'),
        method: 'post',
        data: http.adornData(params)
    }),

// 修改
  update:(params) =>http({
    url:  http.adornUrl('/manage/operatefeedback/update'),
    method: 'post',
    data: http.adornData(params)
    }),


// 删除
 del:(params) =>http({
        url: http.adornUrl('/manage/operatefeedback/delete'),
        method: 'post',
        data: http.adornData(params, 'post', false)
    }),
  // 删除
 reply:(params) =>http({
        url: http.adornUrl('/manage/operatefeedback/reply'),
        method: 'post',
        data: http.adornData(params, false)
    })

}
