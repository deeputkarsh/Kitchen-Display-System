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
  const { MONGO_USER, MONGO_PASS, MONGO_REPLICA_SET, MONGO_HOSTS, MONGO_DBNAME } = process.env
  const authstr = MONGO_USER && MONGO_PASS ? `${MONGO_USER}:${MONGO_PASS}@` : ''
  const replicaSet = MONGO_REPLICA_SET ? `?replicaSet=${MONGO_REPLICA_SET}` : ''
  const connectionuri = `mongodb://${authstr}${MONGO_HOSTS}/${MONGO_DBNAME}${replicaSet}`

  log(connectionuri)
  try {
    await mongoose.connect(connectionuri, {
      autoReconnect: true,
      connectTimeoutMS: 5000,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  } catch (error) {
    log("ERROR: Couldn't connect to mongo")
    process.exit(1)
  }
}

export { connectMongo }
