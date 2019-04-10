const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const path = require('path')
const KitchenItem = require('./routes/KitchenItem.route')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mongoDB = process.env.MONGODB_URI || config.mongoUrl
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => res.sendFile('/index.html', { root: path.join(__dirname, config.publicPath) }))
app.use('/kitchenItem', KitchenItem)

app.listen(config.port, () => console.log(`Kitchen Display System running on port ${config.port}!`))
