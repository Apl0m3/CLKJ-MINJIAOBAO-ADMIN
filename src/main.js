import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
// import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import {isAuth} from '@/utils'
import global from '@/utils/global'
import elementUI from 'element-ui'
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'
import i18n from './i18n/i18n'
import filter from './utils/filter'
import arrayUtil from './utils/arrayUtil'
Vue.prototype.$ArrayUtil = arrayUtil

Vue.use(VueKindEditor)
Vue.use(VueCookie)
Vue.use(elementUI)
Vue.config.productionTip = false
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}
// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
Vue.prototype.global = global     // 通用配置
/* eslint-disable no-new */
// 编辑器
// eslint-disable-next-line import/first
import '../static/js/ueditor.config.js'
import '../static/js/ueditor.all.min.js'
import '../static/js/zh-cn.js'
import '../static/js/ueditor.parse.min.js'
// import '../static/css/ueditor.css'

new Vue({
  el: '#app',
  router,
  store,
  i18n, // 别忘记
  template: '<App/>',
  components: {App}
})
