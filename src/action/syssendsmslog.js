import http from '../utils/httpRequest'

export const syssendsmslog = {
  // 获取列表
  list: (params) => http({
    url: http.adornUrl('/manage/syssendsmslog/list'),
    method: 'get',
    params: http.adornParams(params, false)
  }),

// 获取信息
  info: (id) => http({
    url: http.adornUrl('/manage/syssendsmslog/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: http.adornParams({}, false)
  }),


// 添加
  add: (params) => http({
    url: http.adornUrl('/manage/syssendsmslog/save'),
    method: 'post',
    data: http.adornParams(params)
  }),


// 修改
  update: (params) => ({
    url: http.adornUrl('/manage/syssendsmslog/update'),
    method: 'post',
    data: http.adornParams(params)
  }),


// 删除
  del: (params) =>
    http({
      url: http.adornUrl('/manage/syssendsmslog/delete'),
      method: 'post',
      data: http.adornParams(params, false)
    })

}




