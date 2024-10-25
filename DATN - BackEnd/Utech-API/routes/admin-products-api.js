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

// const products = [
//     { id: 1, name: "product 1", price: 100, categoryId: 1,img: "1.jpg", description: "Description 1"},
//     { id: 2, name: "product 2", price: 200, categoryId: 2,img: "2.jpg", description: "Description 2"},
//     { id: 3, name: "product 3", price: 300, categoryId: 3,img: "3.jpg", description: "Description 3"},
//     { id: 4, name: "product 4", price: 400, categoryId: 1,img: "4.jpg", description: "Description 4"},
//     { id: 5, name: "product 5", price: 500, categoryId: 2,img: "5.jpg", description: "Description 5"},
//     { id: 6, name: "product 6", price: 600, categoryId: 3,img: "6.jpg", description: "Description 6"},
//   ];
/* GET users listing. */

//Thực hiện gọi đến model db
const connectDb = require('../models/db')

//Hiển thị trang sản phẩm
router.get('/', async (req, res, next) => {
  const db = await connectDb()
  const productsCollection = db.collection('products')
  const products = await productsCollection.find().toArray()
  res.render('product', { products })
})


//Thêm sản phẩm
//Hiện trang thêm sản phẩm
router.get('/add', function (req, res,next) {
  res.render('addPro')
})
//Chức năng thêm sản phẩm
router.post('/add', upload.single('img'), async(req, res,next) => {
  const db = await connectDb();
  const productsCollection = db.collection('products');
  let {name,price,categoryId,description} = req.body;
  let img = req.file.originalname;
  let lastProduct = await productsCollection.find().sort({id:-1}).limit(1).toArray();
  let id = lastProduct[0] ? lastProduct[0].id + 1 :1;
  let newProduct={id,name,price,categoryId,img,description};
  await productsCollection.insertOne(newProduct);
  res.redirect('/products')
})

//Sửa sản phẩm
//Get để hiển thị sản phẩm
router.get('/edit/:id', async(req, res, next) => {
  const db = await connectDb();
  const productsCollection = db.collection('products');
  const id = req.params.id;
  const product = await productsCollection.findOne({id:parseInt(id)});
  res.render('editPro', {product})
})

//Post để sửa sản phẩm từ form
router.post('/edit',upload.single('img'), async (req, res, next) => {
  const db = await connectDb();
  const productsCollection = db.collection('products');
  let {id,name,price,categoryId,description} = req.body;
  let img = req.file ? req.file.originalname:req.body.imgOld;
  let editProduct={name,price,categoryId,img,description};
  await productsCollection.updateOne({id:parseInt(id)},{$set:editProduct});
  res.redirect('/products')
})

//Chức năng xóa sản phẩm
router.get('/delete/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb();
  const productsCollection = db.collection('products');
  await productsCollection.deleteOne({id:parseInt(id)})
  res.redirect('/products')
})

//Hiện chi tiết sản phẩm
// router.get('/chitietsp/:id', function (req, res, next) {
//   let id = req.params.id
//   let product = products.find(p => p.id == id)
//   res.send(`
//   <h2>Chi tiết sản phẩm</h2>
//   <h4>${product.name}</h4>
//   <h4>Giá: ${product.price}</h4>
//   <img src="../images/${product.img}" width="200px">
//   <h4>Mô tả: ${product.description}</h4>
//   `)
// })
module.exports = router
