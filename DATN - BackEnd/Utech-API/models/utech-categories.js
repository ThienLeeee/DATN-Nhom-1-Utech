// Thư viện MongoClient giúp kết nối với MongoDB
const MongoClient = require('mongodb').MongoClient
// URL của cơ sở dữ liệu MongoDB
const url = 'mongodb://localhost:27017'
// Tên database và collection
const dbName = 'Utech-DB'
// Mảng danh mục
const danhMuc = [
  { id: 1, tendm: 'Laptop', hinhanh: '.png'},
  { id: 2, tendm: 'PC', hinhanh: '.png'},
  { id: 3, tendm: 'Màn hình', hinhanh: '.png'},
  { id: 4, tendm: 'Chuột', hinhanh: '.png'},
  { id: 5, tendm: 'Bàn phím', hinhanh: '.png'},
]
// Hàm kết nối với MongoDB và thực hiện các thao tác
async function main () {
  // Kết nối với database
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db(dbName)
  await db.createCollection('danhMuc')
  await db.collection('danhMuc').insertMany(danhMuc)
  client.close()
}
// Gọi hàm main
main().catch(console.error)
