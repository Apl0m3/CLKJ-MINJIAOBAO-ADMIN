// 封装过滤器
export default {
  integerFilter: (value) => {
    if (value) {
      return parseFloat(value).toFixed(0)
    }
    return value;


  },
  doubleFilter: (value) => {
    // 截取当前数据到小数点后两位
    if (value) {
      return parseFloat(value).toFixed(2)
    }
    return value;
  }
}
