module.exports = {
  id: 'ID',
  name: 'Nombre de categoría',
  image: 'Imagen de categoría',
  commission:'Comisión de diseño',

  createSysUserName: 'Creador',
  createTime: 'Creado',
  operation: 'Operación',
  addOrUpdate: {
    addTitle: 'Nueva categoría',
    updateTitle: 'Modificar categoría',
    commodityTypeNamePlaceholder: 'Introduce un nombre de categoría de producto',
    commissionPlaceholder:'Ingrese una comisión',
    dataRule: {
      nameMsg: 'El nombre de la categoría del producto no puede estar vacío',
      maxNameMsg: 'No puede superar los 10 caracteres',
      imageMsg: 'Sube una imagen de categoría de producto',
      commissionRule:'Ingrese un número válido para mantener dos decimales',
    }
  }
}
