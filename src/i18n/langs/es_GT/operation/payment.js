module.exports = {
  id: 'ID',
  name: 'Método de pago',
  status: 'Estado',
  status1:'Normal',
  status2:'Deshabilitar',
  paymentType:'Tipo de método de pago',
  wx:'Pago en wechat',
  wxAndIntegral:'Pago en wechat + puntos',
  df:'Contrareembolso',
  createTime:'Creado',
  edit:'Editar',
  delete:'Eliminar',
  image:'Imagen',
  bankAccount:'Transferencia bancaria',
  rule:{
    name:'El nombre no puede estar vacío y no puede exceder 50 caracteres',
    image:'Imagen no puede estar vacía',
    appId:'wx appId no puede estar vacío',
    mchId:'wx mch id no puede estar vacío',
    status:'Estado no puede estar vacío',
    paymentType:'El tipo de método de pago no puede estar vacío',
    appKey:'wx app key no puede estar vacío',
    key:'Cuenta bancaria no puede estar vacía',
    keyRule:'请输入正确的账号格式'
  }
}
