/*
export default {
  "prompt-title": "提示",
  "name": "名称",
  "prompt-delete": "确定进行[删除]操作"
}
*/
/*
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

const cn = {
  message: {
    'name1': '名称',
  },
  ...zhLocale
}

export default cn;
*/
// 注意：一定是 exports，不是 export，否则会报错，报错信息是下列的中的内容不是 string
module.exports = {
  sys: {
    role: require('./zh-CN/role/role'), // 角色管理
    menu: require('./zh-CN/sys/menu/menu'),
    // 管理员
    user: require('./zh-CN/manager/manager'),

  },
  manage: {
    statistics:{
      sales: require('./zh-CN/statistics/sales'),
      design: require('./zh-CN/statistics/design'),
      supply: require('./zh-CN/statistics/supply'),
    },
    commodity: {
      commodityType: require('./zh-CN/commoditymanage/commodityType'), // 商品分类
      commodity1: require('./zh-CN/commoditymanage/commodity'),
      commodityAttrAdd:  require('./zh-CN/commoditymanage/commodityAttrAdd'),
      commodityAttrDetail: require('./zh-CN/commoditymanage/commodityAttrDetail'),
      commodityAttrValue: require('./zh-CN/commoditymanage/commodityAttrValue'),
      commodityDetail: require('./zh-CN/commoditymanage/commodityDetail'),
      commodityExpect: require('./zh-CN/commoditymanage/commodityExpect'),
      commodityInfoDetail: require('./zh-CN/commoditymanage/commodityInfoDetail'),
      commodityLadder: require('./zh-CN/commoditymanage/commodityLadder'),
      commodityNumberAttrAdd: require('./zh-CN/commoditymanage/commodityNumberAttrAdd'),
      commodityNumberDetail: require('./zh-CN/commoditymanage/commodityNumberDetail'),
      commodityComment: require('./zh-CN/commoditymanage/commodityComment'),
    },
    usermanage: {
      usermessage: require('./zh-CN/usermanage/usermessage'),
      userdesignerapplication: require('./zh-CN/usermanage/userdesignerapplication'),
      usersupplierapplication: require('./zh-CN/usermanage/usersupplierapplication'),
      userAgent: require('./zh-CN/usermanage/userAgent'),
      integral: require('./zh-CN/usermanage/integral'),
      useraccount: require('./zh-CN/usermanage/useraccount'),
    },
    operation: {
      sendsmslog: require('./zh-CN/operation/syssendsmslog'),
      greement: require('./zh-CN/operation/termsagreement'),
      advertisement: require('./zh-CN/operation/advertisement'),
      commonProblem: require('./zh-CN/operation/commomProblem'),
      retrunReason: require('./zh-CN/operation/retrunReason'),
      partner: require('./zh-CN/operation/partner'),
      project: require('./zh-CN/operation/project'),
      payment: require('./zh-CN/operation/payment'),
      rate: require('./zh-CN/operation/rate'),
      integralRules: require('./zh-CN/operation/integralRules'),
      message: require('./zh-CN/operation/message'),
      operateFeedback: require('./zh-CN/operation/operateFeedback'),
    },
    //用户
    user: require("./zh-CN/manage/user/user"),
    // 优惠卷
    coupon: require("./zh-CN/manage/coupon/coupon"),
    // 热词
    hotWords: require("./zh-CN/manage/hotWords/hotWords"),
    // 订单
    trRecord: require("./zh-CN/manage/userTransactionRecord/order"),
    //售后服务
    transactionService: require("./zh-CN/manage/transactionService/transactionService"),
    //登录
    login: require("./zh-CN/manage/login/login"),
  },
  //公共按钮的多语言
  common: require("./zh-CN/common/common"),
  prompt: require("./zh-CN/prompt"),
  //左边主菜单
  menu: require("./zh-CN/menu"),
  //左边子菜单
  submenu: require("./zh-CN/submenu"),
}
