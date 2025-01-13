const { MongoClient } = require('mongodb')
const url = 'mongodb://127.0.0.1:27017/Utech-DB'
const dbName = 'Utech-DB'
async function connectDb () {
  const client = new MongoClient(url)
  await client.connect()
  console.log('Kết nối thành công đến server')
  return client.db(dbName)
}
module.exports = connectDb
