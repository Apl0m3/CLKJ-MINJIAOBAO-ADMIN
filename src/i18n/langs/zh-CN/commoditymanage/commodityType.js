module.exports = {
  id: '编号',
  name: '商品分类名称',
  image: '商品分类图片',
  commission:'设计师佣金',

  createSysUserName: '创建人',
  createTime: '创建时间',
  operation: '操作',
  addOrUpdate: {
    addTitle: '新增商品分类',
    updateTitle: '修改商品分类',
    commodityTypeNamePlaceholder: '请输入商品分类名称',
    commissionPlaceholder:'请输入佣金',
    dataRule: {
      nameMsg: '商品分类名称不能为空',
      maxNameMsg: '不能超过10个字符',
      imageMsg: '请上传商品分类图片',
      commissionRule:'请输入有效数字,可保留两位小数',
    }
  }
}
