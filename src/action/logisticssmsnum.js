import http from '../utils/httpRequest'
import isInteger from 'lodash/isInteger'


export const logisticssmsnum={
    // 获取列表
   list:(params) => http({
    url:  http.adornUrl('/manage/logisticssmsnum/list'),
    method: 'get',
    params: http.adornParams(params, 'get')
   }),
    // 获取信息
    info:(id) =>http({
        url:  http.adornUrl('/manage/logisticssmsnum/info' + (isInteger(id) ? `/${id}` : '')),
        method: 'get',
        params: http.adornParams({}, 'get')
    }), // 获取信息
  getLogisticsSmsNum:() =>http({
        url:  http.adornUrl('/manage/logisticssmsnum/getLogisticsSmsNum'),
        method: 'get',
        // params: http.adornParams({}, 'get')
    }),
// 添加
    add:(params) =>http({
        url:  http.adornUrl('/manage/logisticssmsnum/save'),
        method: 'post',
        data: http.adornData(params)
    }),

// 修改
  update:(params) =>http({
    url:  http.adornUrl('/manage/logisticssmsnum/update'),
    method: 'post',
    data: http.adornData(params)
    }),

// 修改
  updateLogisticsSmsNum:(params) =>http({
    url:  http.adornUrl('/manage/logisticssmsnum/updateLogisticsSmsNum'),
    method: 'post',
    data: http.adornData(params,false)
    }),


// 删除
 del:(params) =>http({
        url: requestUrl('/commodity/logisticssmsnum/delete'),
        method: 'post',
        data: http.adornData(params, 'post', false)
    })

}
