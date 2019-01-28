const Validator = require('validator')
const isEmpty = require('../utils/isEmpty')

module.exports = function validatorAddMsg(data) {
  let msg = ''

  // 判断是否为空
  data.uid = isEmpty(data.uid) ? '' : data.uid
  data.content = isEmpty(data.content) ? '' : data.content

  // 
  if(Validator.isEmpty(data.uid)) {
    msg = '用户id不能为空'
  }
  if(Validator.isEmpty(data.content)) {
    msg = '留言内容不能为空'
  }

  return {
    msg, 
    isValid: isEmpty(msg)
  }
}
