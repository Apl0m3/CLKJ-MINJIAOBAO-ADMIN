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
    title:'提示',
    delete:'确定进行[删除]操作',
}
