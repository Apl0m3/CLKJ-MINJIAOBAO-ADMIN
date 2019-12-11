//订单表格多语言
module.exports = {
  // 表单
  form: require("./order_form"),
  orderDetails: require("./orderDetails"),
  delivery: require("./delivery"),
  deliverOrder: require("./deliverOrder"),
  confirmedPaidVue: require("./confirmedPaidVue"),
  ship: require("./ship"),
  transactionId: 'Número de pedido',
  userName: 'Correo electrónico',
  name: 'Nombre',
  totalAmount: 'Importe total',
  type: 'Tipo de pedido',
  couponAmount: 'Cupón',
  rate: 'Tasa de impuestos',
  discount: 'Descuento',
  amount: 'Cantidad de pago',
  integral: 'Usar puntos',
  integralDeductionAmount: 'Cantidad de deducción de puntos',
  status: 'Estado del pedido',
  createTime: 'Creado',
  detail: 'Detalle',
  drawback: 'Reembolso',
  send: 'Envío',
  //验证
  validate: require("./validate"),
  confirmedPaid: 'Confirmar recibo',
  deliveryOrder: 'Procesamiento de pedidos',
  reviewManuscript: 'Revisión de archivo',
  confirmedPaidReminder: '¿El pedido[transactionId]recibe el importe del pago? Si no es así, envíe un mensaje para recordarle al usuario que vuelva a pagar',
  confirmedDeliver: 'Asignar un pedido a [name]',





}
