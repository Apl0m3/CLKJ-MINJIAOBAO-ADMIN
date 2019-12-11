import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCookie from 'vue-cookie'
import locale from 'element-ui/lib/locale'
import cn from './langs/cn'
import es from './langs/es'
import esLocale from 'element-ui/lib/locale/lang/es'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
const i18n = new VueI18n({
  // 通过切换locale的值来实现语言切换
  locale: VueCookie.get('locale') || 'zh-CN',
  messages: {
    'zh-CN': Object.assign(cn, zhLocale),   // 中文语言包
    'es-GT': Object.assign(es, esLocale),   // 西班牙语言包
  }
});

locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换

export default i18n
