
/*
export default {
  "prompt-title": "提示",
  "name": "name",
  "prompt-delete": "确定进行[删除]操作"
}
*/

/*import esLocale from 'element-ui/lib/locale/lang/es'

const en = {
  message: {
    'name1': 'name',
  },
  ...esLocale
}

export default en;*/
// 注意：一定是 exports，不是 export，否则会报错，报错信息是下列的中的内容不是 string
module.exports = {
  sys: {
    role: require('./es_GT/role/role'), // 角色管理
    menu: require('./es_GT/sys/menu/menu'),
    // 管理员
    user: require('./es_GT/manager/manager'),

  },
  message: {
    title: 'Sport Brands'
  },
  prompt: require("./es_GT/prompt"),
  placeholder: {
    enter: 'Please type in your favorite brand'
  },
  brands: {
    nike: 'Nike',
    adi: 'Adidas',
    nb: 'New Banlance',
    ln: 'LI Ning'
  },
  common: require("./es_GT/common/common"),
  //左边主菜单
  menu: require("./es_GT/menu"),
  //左边子菜单
  submenu: require("./es_GT/submenu"),



  manage: {
    statistics:{
      sales: require('./es_GT/statistics/sale'),
      design: require('./es_GT/statistics/design'),
      supply: require('./es_GT/statistics/supply'),
    },
    commodity: {
      commodityType: require('./es_GT/commoditymanage/commodityType'), // 商品分类
      commodity1: require('./es_GT/commoditymanage/commodity'),
      commodityAttrAdd:  require('./es_GT/commoditymanage/commodityAttrAdd'),
      commodityAttrDetail: require('./es_GT/commoditymanage/commodityAttrDetail'),
      commodityAttrValue: require('./es_GT/commoditymanage/commodityAttrValue'),
      commodityDetail: require('./es_GT/commoditymanage/commodityDetail'),
      commodityExpect: require('./es_GT/commoditymanage/commodityExpect'),
      commodityInfoDetail: require('./es_GT/commoditymanage/commodityInfoDetail'),
      commodityLadder: require('./es_GT/commoditymanage/commodityLadder'),
      commodityNumberAttrAdd: require('./es_GT/commoditymanage/commodityNumberAttrAdd'),
      commodityNumberDetail: require('./es_GT/commoditymanage/commodityNumberDetail'),
      commodityComment: require('./es_GT/commoditymanage/commodityComment'),
    },
    //会员管理
    usermanage: {
      usermessage: require('./es_GT/usermanage/usermessage'),
      userdesignerapplication: require('./es_GT/usermanage/userdesignerapplication'),
      usersupplierapplication: require('./es_GT/usermanage/usersupplierapplication'),
      userAgent: require('./es_GT/usermanage/userAgent'),
      integral: require('./es_GT/usermanage/integral'),
      useraccount: require('./es_GT/usermanage/useraccount'),
    },
    operation: {
      sendsmslog: require('./es_GT/operation/syssendsmslog'),
      greement: require('./es_GT/operation/termsagreement'),
      advertisement: require('./es_GT/operation/advertisement'),
      commonProblem: require('./es_GT/operation/commomProblem'),
      retrunReason: require('./es_GT/operation/retrunReason'),
      partner: require('./es_GT/operation/partner'),
      project: require('./es_GT/operation/project'),
      payment: require('./es_GT/operation/payment'),
      rate: require('./es_GT/operation/rate'),
      integralRules: require('./es_GT/operation/integralRules'),
      message: require('./es_GT/operation/message'),
      operateFeedback: require('./es_GT/operation/operateFeedback'),
    },
    // 优惠卷
    coupon: require("./es_GT/manage/coupon/coupon"),
    //用户管理
    user: require("./es_GT/manage/user/user"),
    // 热词
    hotWords: require("./es_GT/manage/hotWords/hotWords"),
    // 订单
    trRecord: require("./es_GT/manage/userTransactionRecord/order"),
    //售后服务
    transactionService: require("./es_GT/manage/transactionService/transactionService"),
    //登录
    login: require("./es_GT/manage/login/login"),
  }

}
