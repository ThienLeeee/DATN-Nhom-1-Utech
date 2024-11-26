// Thư viện MongoClient giúp kết nối với MongoDB
const MongoClient = require('mongodb').MongoClient
// URL của cơ sở dữ liệu MongoDB
const url = 'mongodb://localhost:27017'
// Tên database và collection
const dbName = 'Utech-DB'
// Mảng user
const accounts = [
  {
    id: 1,
    username: 'user 1',
    email: "thien1@gmail.com",
    password: 123,
    role: 1
  },
  {
    id: 2,  
    username: 'user 2',
    email: "thien2@gmail.com",
    password: 456,
    role: 2
  },
  {
    id: 3,
    username: 'user 3',
    email: "thien3@gmail.com",
    password: 789,
    role: 1
  }
]
// Hàm kết nối với MongoDB và thực hiện các thao tác
async function main(){
  // Kết nối với database
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db(dbName)
  await db.createCollection('accounts')
  await db.collection('accounts').insertMany(accounts)
  client.close()
}
// Gọi hàm main
main().catch(console.error)
