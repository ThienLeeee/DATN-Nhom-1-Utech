var express = require('express')
var router = express.Router()

//Gọi thư viện bcryptjs
const bcrypt = require('bcryptjs')

//Gọi thư viện để sử dụng đc token
const jwt = require('jsonwebtoken')

//Thiết lập nơi lưu trữ và tên file
const multer = require('multer')

//Thực hiện gọi đến model db
const connectDb = require('../models/db')

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

//show danh mục
router.get('/danhMuc', async (req, res, next) => {
  const db = await connectDb()
  const danhMucCollection = db.collection('danhMuc')
  const danhMuc = await danhMucCollection.find().toArray()
  if (danhMuc) {
    res.status(200).json(danhMuc)
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục !' })
  }
})

//Hiển thị 1 danh mục theo id
router.get('/danhMuc/:id', async (req, res, next) => {
  let id = req.params.id
  const db = await connectDb()
  const danhMucCollection = db.collection('danhMuc')
  const danhmuc = await danhMucCollection.findOne({ id: parseInt(id) })
  if (danhmuc) {
    res.status(200).json(danhmuc)
  } else {
    res.status(404).json({ message: 'Không tìm thấy danh mục !' })
  }
})

//Chức năng thêm danh mục
// router.post('/categories', upload.single('img'), async(req, res,next) => {
//   const db = await connectDb();
//   const categoriesCollection = db.collection('categories');
//   let {name} = req.body;
//   let img = req.file.originalname;
//   let lastCategory = await categoriesCollection.find().sort({id:-1}).limit(1).toArray();
//   let id = lastCategory[0] ? lastCategory[0].id + 1 :1;
//   let newCategory={id,name,img};
//   await categoriesCollection.insertOne(newCategory);
//   if(newCategory){
//     res.status(200).json(newCategory);
//   }else{
//     res.status(404).json({message:"Add category not successful"})
//   }
// })

//Chức năng thêm danh mục
router.post('/categories', async (req, res, next) => {
  const db = await connectDb()
  const categoriesCollection = db.collection('categories')
  let { name } = req.body
  let img = ''
  let lastCategory = await categoriesCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray()
  let id = lastCategory[0] ? lastCategory[0].id + 1 : 1
  let newCategory = { id, name, img }
  await categoriesCollection.insertOne(newCategory)
  if (newCategory) {
    res.status(200).json(newCategory)
  } else {
    res.status(404).json({ message: 'Add category not successful' })
  }
})

//Sửa danh mục
router.put('/categories/:id', async (req, res, next) => {
  let id = req.params.id //id là string
  const db = await connectDb()
  const categoriesCollection = db.collection('categories')
  let { name } = req.body
  if (req.file) {
    var img = req.file.originalname
  } else {
    //Lấy danh mục từ id để lấy img cũ ra
    let category = await categoriesCollection.findOne({ id: parseInt(id) })
    var img = category.img
  }
  let editCategory = { name, img }
  category = await categoriesCollection.updateOne(
    { id: parseInt(id) },
    { $set: editCategory }
  )
  if (category) {
    res.status(200).json(editCategory)
  } else {
    res.status(404).json({ message: 'Sửa ko thành công' })
  }
})

//xóa danh mục
router.delete('/categories/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb()
  const categoriesCollection = db.collection('categories')
  let category = await categoriesCollection.deleteOne({ id: parseInt(id) })
  if (category) {
    res.status(200).json({ message: 'Xóa thành công' })
  } else {
    res.status(404).json({ message: 'Xóa ko thành công' })
  }
})

//show sp
router.get('/sanPham', async (req, res, next) => {
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')
  const sanPham = await sanPhamCollection.find().toArray()
  if (sanPham) {
    res.status(200).json(sanPham)
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm !' })
  }
})

//show 12 sp
// router.get('/products',async (req, res, next) => {
//   const db = await connectDb();
//   const productsCollection = db.collection('products');

//   // Limit query to retrieve only 12 products
//   const limit = parseInt(req.query.limit) || 50; // Default to 8 if no limit specified

//   try {
//     const products = await productsCollection.find().limit(limit).toArray();

//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(204).json({ message: 'No products found' }); // Use 204 for no content
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error retrieving products' });
//   }
// });

//Chức năng thêm sản phẩm
router.post('/products', upload.single('img'), async (req, res, next) => {
  const db = await connectDb()
  const productsCollection = db.collection('products')
  let { name, price, categoryId, description } = req.body
  let img = req.file
  let lastProduct = await productsCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray()
  let id = lastProduct[0] ? lastProduct[0].id + 1 : 1
  let newProduct = { id, name, price, categoryId, img, description }
  await productsCollection.insertOne(newProduct)
  if (newProduct) {
    res.status(200).json(newProduct)
  } else {
    res.status(404).json({ message: 'Add product not successful' })
  }
})

//sửa sp
router.put('/products/:id', upload.single('img'), async (req, res, next) => {
  let id = req.params.id //id là string
  const db = await connectDb()
  const productsCollection = db.collection('products')
  let { name, price, categoryId, description } = req.body
  if (req.file) {
    var img = req.file.originalname
  } else {
    //lấy sản phẩm từ id để lấy img cũ ra
    let product = await productsCollection.findOne({ id: parseInt(id) })
    var img = product.img
  }
  let editProduct = { name, price, categoryId, img, description }
  product = await productsCollection.updateOne(
    { id: parseInt(id) },
    { $set: editProduct }
  )
  if (product) {
    res.status(200).json(editProduct)
  } else {
    res.status(404).json({ message: 'Sửa ko thành công' })
  }
})

//xóa sản phẩm
router.delete('/products/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb()
  const productsCollection = db.collection('products')
  let product = await productsCollection.deleteOne({ id: parseInt(id) })
  if (product) {
    res.status(200).json({ message: 'Xóa thành công' })
  } else {
    res.status(404).json({ message: 'Xóa ko thành công' })
  }
})

//Lấy sản phẩm theo mã danh mục
router.get('/sanPham/id_danhmuc/:id', async (req, res, next) => {
  const id = parseInt(req.params.id)
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')

  try {
    const sanPham = await sanPhamCollection.find({ id_danhmuc: id }).toArray()
    if (sanPham.length > 0) {
      res.status(200).json(sanPham)
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm !' })
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).send('error')
  }
})

//Lấy sản phẩm theo thương hiệu
router.get('/sanPham/thuong_hieu/:thuong_hieu', async (req, res, next) => {
  const thuong_hieu = req.params.thuong_hieu

  try {
    const db = await connectDb() // Kết nối đến database
    const sanPhamCollection = db.collection('sanPham')

    const sanPham = await sanPhamCollection
      .find({
        thuong_hieu: { $regex: thuong_hieu, $options: 'i' } // Tìm kiếm không phân biệt hoa thường
      })
      .toArray() // Chuyển đổi cursor thành mảng

    res.json(sanPham)
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm theo thương hiệu:', error)
    res.status(500).json({ message: 'Đã xảy ra lỗi trong quá trình tìm kiếm' })
  }
})

//Lấy sản phẩm theo tên danh mục
router.get('/products/categoryname/:name', async (req, res, next) => {
  const name = req.params.name
  const db = await connectDb()
  const productsCollection = db.collection('products')
  const categoriesCollection = db.collection('categories')
  try {
    let category = await categoriesCollection.findOne({ name: name })
    let cateId = category.id
    const products = await productsCollection
      .find({ categoryId: cateId.id })
      .toArray()
    if (products.length > 0) {
      res.status(200).json(products)
    } else {
      res.status(404).json({ message: 'Product not found.' })
    }
  } catch (error) {
    console.log('error', error)
    req.status(500).send('error!')
  }
})

//Lấy sản phẩm "nóng"
router.get('/products/hot', authenToken, async (req, res, next) => {
  const db = await connectDb()
  const productCollection = db.collection('products')
  const product = await productCollection.find({ hot: 1 }).toArray()
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({ message: "Product 'CHÁY' not found " })
  }
})

//Hiển thị 1 sản phẩm theo id
router.get('/sanPham/:id', async (req, res, next) => {
  let id = req.params.id
  const db = await connectDb()
  const sanPhamCollection = db.collection('sanPham')
  const sanPham = await sanPhamCollection.findOne({ id: parseInt(id) })
  if (sanPham) {
    res.status(200).json(sanPham)
  } else {
    res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
  }
})

//Tìm kiếm sản phẩm
router.get('/products/search/:name', async (req, res) => {
  let name = req.params.name
  const db = await connectDb()
  const productCollection = db.collection('products')
  const product = await productCollection
    .find({ name: { $regex: name, $options: 'i' } })
    .toArray()
  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).json({ message: "Product 'CHÁY' not found " })
  }
})

//show tài khoản
router.get('/accounts', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('accounts')
  const accounts = await accountsCollection.find().toArray()
  if (accounts) {
    res.status(200).json(accounts)
  } else {
    res.status(404).json({ message: 'Account not found' })
  }
})

//API đăng ký tài khoản
router.post(
  '/accounts/register',
  upload.single('img'),
  async (req, res, next) => {
    let { username, email, password, repassword } = req.body
    const db = await connectDb()
    const accountCollection = db.collection('accounts')
    let account = await accountCollection.findOne({ email: email })
    if (account) {
      res.status(409).json({ message: 'Email đã tồn tại' })
    } else {
      let lastAccount = await accountCollection
        .find()
        .sort({ id: -1 })
        .limit(1)
        .toArray()
      let id = lastAccount[0] ? lastAccount[0].id + 1 : 1
      const salt = bcrypt.genSaltSync(10)
      let hashPassword = bcrypt.hashSync(password, salt)
      let newAccount = {
        id: id,
        username,
        email,
        password: hashPassword,
        repassword: hashPassword,
        role: 0
      }
      try {
        let result = await accountCollection.insertOne(newAccount)
        console.log(result)
        res.status(200).json({ message: 'Đăng ký oke!' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Thêm tài khoản lỗi!' })
      }
    }
  }
)

//API đăng nhập tài khoản có sử dụng token
router.post('/accounts/login', upload.single('img'), async (req, res, next) => {
  const db = await connectDb()
  const accountCollection = db.collection('accounts')
  let { username, password } = req.body
  const account = await accountCollection.findOne({ username: username })
  if (account) {
    if (bcrypt.compareSync(password, account.password)) {
      const token = jwt.sign(
        { username: account.username, role: account.role },
        'secretkey',
        { expiresIn: '60s' }
      )
      res.status(200).json({ token: token })
    } else {
      res.status(403).json({ message: 'password ko đúng' })
    }
  } else {
    res.status(403).json({ message: 'tên tk hoặc mk ko đúng' })
  }
})

//Hàm xác thực token
function authenToken (req, res, next) {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.status(403).json({ message: 'Không có quyền truy cập' })
      } else {
        next()
      }
    })
  } else {
    res.status(403).json({ message: 'Không có quyền truy cập' })
  }
}

module.exports = router
