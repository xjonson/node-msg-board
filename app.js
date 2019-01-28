const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const passport = require('passport')
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = new express()

// 使用body-parser中间件 要放到 使用router之前
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 使用session、cookie中间件 要放到route之前
app.use(cookieParser());
app.use(session({
  secret: 'secret', // 用来对session数据进行加密的字符串.这个属性值为必须指定的属性。
  name: 'name', // 表示cookie的name，默认cookie的name是：connect.sid
  cookie: {
    maxAge: 60000 // cookie过期时间，毫秒。
  },
  resave: false, // 是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。
  saveUninitialized: true, // 是指无论有没有session cookie，每次请求都设置个session cookie，默认给个标示为 connect.sid。
}));


// 链接mongodb
const mongoUrl = keys.mongoUrl
mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(res => {
  console.log('MongoDB Connect!')
}).catch(err => {
  console.error(err);
})

// 路由
const user = require('./routes/api/user')
app.use('/api/user', user)
const msg = require('./routes/api/msg')
app.use('/api/msg', msg)
const captcha = require('./routes/api/captcha')
app.use('/api/captcha', captcha)
const upload = require('./routes/api/upload')
app.use('/api/upload', upload)


// passport 初始化
app.use(passport.initialize())
// 将passport传递过去
require('./config/passport')(passport)


// listen 端口
const port = 4000

app.listen(port, () => {
  console.log(`server is running at ${port}`)
})