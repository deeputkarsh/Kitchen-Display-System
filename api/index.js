import express from 'express'
import bodyParser from 'body-parser'
import { Routes } from './routes'
import { connectMongo, errorHandler } from './config'

export const initApp = async () => {
  // Initiate express
  const app = express()

  // Parse incoming request body
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50 }))

  // Create MongoDB connection
  await connectMongo()

  // Initiate all routes
  Routes(app)

  // Application level error handler
  app.use(errorHandler)
  return app
}
