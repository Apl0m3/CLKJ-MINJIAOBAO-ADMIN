// 图片路径
// exports.ctx = 'http://192.168.0.6:8081/'
exports.ctx = (process.env.NODE_ENV !== 'prouction' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl);
exports.showUrl = this.ctx + '/common/file/download?storeFileName=';
exports.uploadUrl = this.ctx + '/common/file/uploadImg';
exports.uploadUEUrl= this.ctx + '/common/file/uploadUEImg';
exports.uploadKEUrl= this.ctx + '/common/file/uploadKEImg';
