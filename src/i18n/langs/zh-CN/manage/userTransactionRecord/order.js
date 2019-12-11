//订单表格多语言
module.exports = {
  // 表单
  form: require("./order_form"),
  orderDetails: require("./orderDetails"),
  delivery: require("./delivery"),
  deliverOrder: require("./deliverOrder"),
  confirmedPaidVue: require("./confirmedPaidVue"),
  ship: require("./ship"),
  transactionId: '订单号',
  userName: '邮箱',
  name: '名称',
  totalAmount: '总金额',
  type: '订单类型',
  couponAmount: '优惠劵',
  rate: '税率',
  discount: '折扣',
  amount: '支付金额',
  integral: '使用积分',
  integralDeductionAmount: '积分抵扣金额',
  status: '订单状态',
  createTime: '创建时间',
  detail: '详情',
  drawback: '退款',
  send: '发货',
  //验证
  validate: require("./validate"),
  confirmedPaid: '确认收款',
  deliveryOrder: '订单处理',
  reviewManuscript: '审核稿件',
  confirmedPaidReminder: '订单[transactionId]是否收到支付金额?如果否,发送信息提醒用户重新支付',
  confirmedDeliver: '是否指派订单给[name]',





}
