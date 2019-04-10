import mongoose from 'mongoose'
import debug from 'debug'

const log = debug('app')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
  log('ERROR: ' + error)
  process.exit(1)
})

mongoose.set('debug', process.env.MONGO_DEBUG)

const connectMongo = async () => {
  let authstr = process.env.MONGO_USER && process.env.MONGO_PASS ? `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` : ''
  let replicaSet = process.env.MONGO_REPLICA_SET ? `?replicaSet=${process.env.MONGO_REPLICA_SET}` : ''
  let connectionuri = `mongodb://${authstr}${process.env.MONGO_HOSTS}/${process.env.MONGO_DBNAME}${replicaSet}`

  log(connectionuri)

  await mongoose.connect(connectionuri, {
    autoReconnect: true,
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
}

export { connectMongo }
