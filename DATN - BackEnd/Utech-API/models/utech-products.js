// Thư viện MongoClient giúp kết nối với MongoDB
const MongoClient = require('mongodb').MongoClient
// URL của cơ sở dữ liệu MongoDB
const url = 'mongodb://localhost:27017'
// Tên database và collection
const dbName = 'Utech-DB'
// Mảng sản phẩm
const sanPham = [
  {
    id: 1,  
    id_danhMuc: 1,
    id_baohanh: '',
    tensp: 'Sản phẩm Laptop 1',
    giasp: '2.850.000',
    hinhanh: 'Laptop-Dell-Vostro-3530.png',
    mota: 'Mota 1',
    thoigianbaohanh: '',
  },
  {
    id: 2,  
    id_danhMuc: 2,
    id_baohanh: '',
    tensp: 'Sản phẩm PC 2',
    giasp: '2.850.000',
    hinhanh: 'PC-Dell-Vostro-3020T-6FM7X11.png',
    mota: 'Mota 2',
    thoigianbaohanh: '',
  },
  {
    id: 3,  
    id_danhMuc: 3,
    id_baohanh: '',
    tensp: 'Sản phẩm màn hình 3',
    giasp: '2.850.000',
    hinhanh: 'spmanhinh3.png',
    mota: 'Mota 3',
    thoigianbaohanh: '',
  },
  {
    id: 4,  
    id_danhMuc: 4,
    id_baohanh: '',
    tensp: 'Sản phẩm chuột 4',
    giasp: '2.850.000',
    hinhanh: 'spchuot4.png',
    mota: 'Mota 4',
    thoigianbaohanh: '',
  },
  {
    id: 5,  
    id_danhMuc: 5,
    id_baohanh: '',
    tensp: 'Sản phẩm bàn phím 5',
    giasp: '2.850.000',
    hinhanh: 'spbanphim5.png',
    mota: 'Mota 5',
    thoigianbaohanh: '',
  },
 
  
  
]
// Hàm kết nối với MongoDB và thực hiện các thao tác
async function main () {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db(dbName)
  await db.createCollection('sanPham')
  await db.collection('sanPham').insertMany(sanPham)
  client.close()
}
// Gọi hàm main
main().catch(console.error)
