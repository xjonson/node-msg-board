/**
 * response的返回模板
 * @param code 状态码 0正常 1错误
 * @param data 数据
 * @param msg 信息
 */
module.exports = function resTpl(code, data, msg) {
  return {
    code: code,
    data: data || '',
    msg: msg || ''
  }
}