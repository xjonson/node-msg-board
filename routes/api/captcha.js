const express = require('express')
const Router = express.Router()
const resTpl = require('../../config/resTpl')

const svgCaptcha = require('svg-captcha');

Router.post('/', (req, res) => {
  const captcha = svgCaptcha.create();
  req.session.captcha = captcha.text.toLocaleUpperCase();
  res.type('svg');
  res.status(200).json(resTpl(0, captcha.data, ''));
})

module.exports = Router