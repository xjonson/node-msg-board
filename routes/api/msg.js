const express = require('express')
const Router = express.Router()
const resTpl = require('../../config/resTpl')
// 
const User = require('../../model/User')
const Msg = require('../../model/Msg')
// passport 验证token
const passport = require('passport')
// 
const validatorAddMsg = require('../../validation/addMsg')

/**
 * @description 获取全部留言
 * @method get /api/msg
 * @access public
 */
Router.get('/', (req, res) => {
  Msg.find().then(msg => {

    res.json(resTpl(0, msg, '获取成功'))
  }).catch(err => {
    console.log(err);
  })
})

/**
 * @description 获取指定留言信息
 * @method get /api/msg/:mid
 * @access public
 */
Router.get('/:mid', (req, res) => {
  const mid = req.params.mid
  Msg.findOne({ _id: mid }).then(msg => {
    if (msg) {
      res.json(resTpl(0, msg, '获取成功'))
    } else {
      res.json(resTpl(1, '', '没有找到留言信息'))
    }
  }).catch(err => {
    console.log(err);
  })
})


/**
 * @description 添加一条留言
 * @method post /api/msg
 * @param uid 用户id
 * @param content 留言内容
 * @access private
 */
Router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { msg, isValid } = validatorAddMsg(req.body)
  // 验证不通过
  if (!isValid) return res.json(resTpl(1, null, msg))
  const body = req.body
  User.findOne({ _id: body.uid }).then(user => {
    const msg = new Msg({
      name: user.name,
      content: body.content
    })
    msg.save().then(msg => {
      res.json(resTpl(0, null, '留言成功'))
    }).catch(err => {
      console.log(err);
    })
  }).catch(err => {
    res.json(resTpl(1, null, '未找到用户'))
    console.log(err);
  })
})

/**
 * @description 回复留言
 * @method put /api/msg
 * @param uid 用户id
 * @param content 回复内容
 * @param mid 留言的id
 * @access private
 */
Router.put('/:mid', passport.authenticate('jwt', { session: false }), (req, res) => {
  const body = req.body
  const mid = req.params.mid
  const { msg, isValid } = validatorAddMsg(req.body)
  // 验证不通过
  if (!isValid) return res.json(resTpl(1, null, msg))
  // 查询用户
  User.findOne({ _id: body.uid }).then(user => {
    // 查询留言并更新
    const newMsg = new Msg({
      name: user.name,
      avatar: user.avatar,
      sex: user.sex,
      content: body.content,
    })

    Msg.findOneAndUpdate({ _id: mid }, { $push: { "replies": newMsg } }, { new: true }).then(msg => {
      res.json(resTpl(0, msg, ''))
    }).catch(err => {
      res.json(resTpl(1, null, '未找到留言'))
    })
  }).catch(err => {
    res.json(resTpl(1, null, '未找到用户'))
  })
})


/**
 * @description 删除留言
 * @method delete /api/msg/:mid
 * @access private
 */
Router.delete('/:mid', passport.authenticate('jwt', { session: false }), (req, res) => {
  const mid = req.params.mid
  if (!mid) {
    res.json(resTpl(1, '', '请上传留言id'))
  }
  // 验证通过
  Msg.findOne({ _id: mid }).then(msg => {
    console.log(msg);
    if (msg) {
      Msg.deleteOne({ _id: mid }).then(msg => {
        res.json(resTpl(0, '', '删除成功'))
      })
    } else {
      // 已删除留言不存在
      res.json(resTpl(0, '', '留言不存在'))
    }
  })
})


module.exports = Router