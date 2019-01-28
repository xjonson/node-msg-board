const express = require('express')
const Router = express.Router()
const resTpl = require('../../config/resTpl')
const multer = require('multer')
const fs = require('fs')
const path = require('path')



const upload = multer({
  // 文件限制
  limits: {
    // 限制文件大小1200kb
    fileSize: 1200 * 1000,
    // 限制文件数量
    // files: 5
  },
  // 自定义文件格式限制
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[1]
    // 只能为以下格式的图片
    if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
      cb(null, true);
    } else {
      cb(null, false)
      cb(new Error('只能上传.png或.jpg或.jpeg格式的图片'))
    }
  },
  // 储存
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // 如果没有upload文件夹则自动创建
      // if (!fs.existsSync(path.join(__dirname, './upload'))) {
      //   fs.mkdir('./upload')
      // }
      cb(null, './upload/');
    },
    filename: (req, file, cb) => {
      const fileType = file.mimetype.split('/')[1]
      const changedName = (new Date().getTime()) + '.' + fileType;
      cb(null, changedName);
    }
  })
});

/**
 * @description 图片上传
 * 
 */
const singleUpload = upload.single('files');
Router.post('/img', (req, res) => {
  singleUpload(req, res, (err) => {
    if (err || err instanceof multer.MulterError) {
      // limit中限制的
      res.json(resTpl(1, null, err.message))
    } else {
      res.json(resTpl(0, req.file.path, '上传成功'))
    }
  })
})


// 获取图片
Router.get('/:name', (req, res) => {
  const name = req.params.name
  res.sendFile(path.resolve(__dirname, `../../upload/${name}`))
})



module.exports = Router