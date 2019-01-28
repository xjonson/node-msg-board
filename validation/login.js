const Validator = require('validator')
const isEmpty = require('../utils/isEmpty')

module.exports = function validatorLogin(data) {
  let msg = ''

  // 判断是否为空
  data.name = isEmpty(data.name) ? '' : data.name
  data.password = isEmpty(data.password) ? '' : data.password
  data.captcha = isEmpty(data.captcha) ? '' : data.captcha

  if(Validator.isEmpty(data.password)) {
    msg = '密码不能为空'
  }
  if(Validator.isEmpty(data.name)) {
    msg = '用户名不能为空'
  }
  if(Validator.isEmpty(data.captcha)) {
    msg = '验证码不能为空'
  }

  return {
    msg,
    isValid: isEmpty(msg)
  }
}

