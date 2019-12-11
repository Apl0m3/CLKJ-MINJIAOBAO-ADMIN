module.exports = {
  id: 'ID',
  roleName: 'Nombre de rol',
  remark: 'Observaciones',
  createTime: 'Creado',
  operation: 'Operación',
  addOrUpdate: {
    addTitle: 'Nuevo rol',
    updateTitle: 'Modificar rol',
    roleNamePlaceholder: 'Introduce el nombre de rol',
    remarkPlaceholder: 'Introduce las observaciones',
    authorization: 'Autorización',
    dataRule: {
      roleNameMsg: 'El nombre del rol no puede estar vacío',
      maxRoleNameMsg: 'El nombre del rol no puede tener más de 10 caracteres',
      maxRemarkMsg: 'Las observaciones no pueden superar los 100 caracteres.'
    }
  }
}
