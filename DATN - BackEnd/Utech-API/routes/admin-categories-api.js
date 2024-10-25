var express = require('express')
var router = express.Router()

//Thiết lập nơi lưu trữ và tên file
const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
//Kiểm tra file upload
function checkFileUpLoad (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Bạn chỉ được upload file ảnh'))
  }
  cb(null, true)
}
//Upload file
let upload = multer({ storage: storage, fileFilter: checkFileUpLoad })

// const categories = [
//     { id: 1, name: "category 1", img: "dm1.jpg"},
//     { id: 2, name: "category 2", img: "dm2.jpg"},
//     { id: 3, name: "category 3", img: "dm3.jpg"},
//     ];

//Thực hiện gọi đến model db
const connectDb = require('../models/db')

//Hiển thị trang danh mục sản phẩm
router.get('/', async (req, res, next) => {
  const db = await connectDb()
  const categoriesCollection = db.collection('categories')
  const categories = await categoriesCollection.find().toArray()
  res.render('category', {categories})
})

//Thêm danh mục
//Hiện trang thêm danh mục 
router.get('/add', function (req, res,next) {
  res.render('addCate')
})

//Chức năng thêm danh mục 
router.post('/add', upload.single('img'),async (req, res, next) => {
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  let {name} = req.body;
  let img = req.file.originalname;
  let lastCate = await categoriesCollection.find().sort({id:-1}).limit(1).toArray();
  let id = lastCate[0] ? lastCate[0].id + 1 :1;
  let newCate={id,name,img};
  await categoriesCollection.insertOne(newCate);
  res.redirect('/categories')
})

//Chức năng sửa danh mục
//Get để hiển thị sửa danh mục
router.get('/edit/:id', async (req, res,next) => {
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  const id = req.params.id;
  const category = await categoriesCollection.findOne({id:parseInt(id)});
  res.render('editCate', { category })
})
//Post để sửa danh mục từ form
router.post('/edit', upload.single('img'), async (req, res,next) => {
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  let {id,name} = req.body;
  let img = req.file ? req.file.originalname:req.body.imgOld;
  let editCatgory={name,img};
  await categoriesCollection.updateOne({id:parseInt(id)},{$set:editCatgory});
  res.redirect('/categories')
})

//Chức năng xóa danh mục
router.get('/delete/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb();
  const categoriesCollection = db.collection('categories');
  await categoriesCollection.deleteOne({id:parseInt(id)})
  res.redirect('/categories')
})
module.exports = router
