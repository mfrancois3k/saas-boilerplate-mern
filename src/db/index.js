import mongodb from 'mongodb'

export default async function makeDb () {
  const MongoClient = mongodb.MongoClient
  const url = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : 'mongodb://localhost:27017'
  const dbName = process.env.NODE_ENV === 'production' ? process.env.MONGO_DB_NAME : 'saas-boilerplate'
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect()
  const db = await client.db(dbName)
  db.makeId = makeIdFromString
  return db
}
function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}