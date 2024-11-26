var express = require('express')
var router = express.Router()

/* GET userM page. */

//Thực hiện gọi đến model db
const connectDb = require('../models/db')

//Hiển thị trang quản lý account
router.get('/', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('accounts')
  const accounts = await accountsCollection.find().toArray()
  res.render('accountPage', { accounts })
})
//Hiển thị trang đăng ký
router.get('/register', function (req, res, next) {
  res.render('registerPage')
})
router.post('/register', async (req, res, next) => {
  try {
    // Kết nối với cơ sở dữ liệu
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await client.connect()
    const db = client.db(dbName)

    // Lấy thông tin người dùng từ yêu cầu
    const { name, email, password } = req.body

    // Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await db.collection('accounts').findOne({ email })
    if (existingUser) {
      return res.status(400).send('Người dùng đã tồn tại')
    }

    // Thêm người dùng mới vào cơ sở dữ liệu
    await db.collection('accounts').insertOne({ name, email, password })

    // Đóng kết nối với cơ sở dữ liệu
    await client.close()

    // Chuyển hướng người dùng đến trang đăng nhập
    res.redirect('/accounts/login')
  } catch (error) {
    console.error(error)
    res.status(500).send('Đã xảy ra lỗi khi đăng ký')
  }
})
//Sau khi đăng kí sẽ lưu vào collection của mongodb và show dữ liệu table của accountPage

router.get('/login', function (req, res, next) {
  res.render('loginPage')
})
//Thêm account
//Hiện trang thêm account
router.get('/add', function (req, res, next) {
  res.render('addAccount')
})
//Chức năng thêm account
router.post('/add', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('accounts')
  let { name, password, email, role } = req.body
  let lastAccount = await accountsCollection
    .find()
    .sort({ id: -1 })
    .limit(1)
    .toArray()
  let id = lastAccount[0] ? lastAccounts[0].id + 1 : 1
  let newAccount = { id, name, password, email, role }
  await usersCollection.insertOne(newAccount)
  res.redirect('/accounts')
})
//Sửa thông tin account
//Get để hiển thị thông tin account
router.get('/edit/:id', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('accounts')
  const id = req.params.id
  const account = await accountsCollection.findOne({ id: parseInt(id) })
  res.render('editAccounts', { account })
})

//Post để sửa account từ form
router.post('/edit', async (req, res, next) => {
  const db = await connectDb()
  const accountsCollection = db.collection('users')
  let { id, name, password, email, role } = req.body
  let editAccount = { name, password, email, role }
  await accountsCollection.updateOne(
    { id: parseInt(id) },
    { $set: editAccount }
  )
  res.redirect('/accounts')
})

//Chức năng xóa user
router.get('/delete/:id', async (req, res) => {
  let id = req.params.id
  const db = await connectDb()
  const accountsCollection = db.collection('accounts')
  await accountsCollection.deleteOne({ id: parseInt(id) })
  res.redirect('/accounts')
})

module.exports = router
