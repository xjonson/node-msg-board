const Validator = require('validator')
const isEmpty = require('../utils/isEmpty')

module.exports = function validatorReg(data) {
  let msg = ''
  // 判断是否为空
  data.name = isEmpty(data.name) ? '' : data.name
  // data.email = isEmpty(data.email) ? '' : data.email
  data.password = isEmpty(data.password) ? '' : data.password
  data.password2 = isEmpty(data.password2) ? '' : data.password2
  // 
  if(!Validator.equals(data.password, data.password2)) {
    msg = '两次密码不一致'
  }
  if (!Validator.isLength(data.password, { min: 4, max: 10 })) {
    msg = '密码大于4位小于10位'
  }
  // if (!Validator.isEmail(data.email)) {
  //   msg = '请输入合法邮箱'
  // }
  if (Validator.isEmpty(data.password2)) {
    msg = '确认密码不能为空'
  }
  if (Validator.isEmpty(data.password)) {
    msg = '密码不能为空'
  }
  // if (Validator.isEmpty(data.email)) {
  //   msg = '邮箱不能为空'
  // }
  if (Validator.isEmpty(data.name)) {
    msg = '姓名不能为空'
  }

  return {
    msg,
    isValid: isEmpty(msg)
  }
}