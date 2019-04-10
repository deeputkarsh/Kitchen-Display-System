import express from 'express'
import { Routes } from './routes'
import { connectMongo } from './config/connectmongo'
import { errorHandler } from './config/errorhandler'
import bodyParser from 'body-parser'

// Initiate express
const app = express()

// Parse incoming request body
app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50 }))

// Create MongoDB connection
connectMongo()

// Initiate all routes
Routes(app)

// Application level error handler
app.use(errorHandler)

export { app }
