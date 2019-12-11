module.exports = {
  id: '编号',
  name: '支付方式名称',
  status: '状态',
  status1:'正常',
  status2:'禁用',
  paymentType:'支付方式类型',
  wx:'微信支付',
  wxAndIntegral:'微信支付+积分',
  df:'到付',
  createTime:'创建时间',
  edit:'编辑',
  delete:'删除',
  image:'图片',
  bankAccount:'银行账号',
  rule:{
    name:'名称不能为空,名称长度不能超过50',
    image:'图片不能为空',
    appId:'wx appId不能为空',
    mchId:'wx mch id不能为空',
    status:'状态不能为空',
    paymentType:'支付方式类型不能为空',
    appKey:'wx app key不能为空',
    key:'银行账号不能为空',
    keyRule:'请输入正确的账号格式'
  }
}
