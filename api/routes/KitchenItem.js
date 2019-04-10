import express from 'express'
import { asyncMiddleware } from '../utils'
import { KitchenItemController } from '../controllers'

const router = express.Router()

router.post('/placeOrder', asyncMiddleware(async (req, res) => {
  const data = req.body
  const responseData = KitchenItemController.placeOrder(data)
  return res.send({ isSuccess: true, data: responseData })
}))
router.get('/getAll', asyncMiddleware(async (req, res) => {
  const data = await KitchenItemController.getAll()
  return res.send({ isSuccess: true, data })
}))
router.all('/getPredictedValues', asyncMiddleware(async (req, res) => {
  const option = req.body || {}
  const data = await KitchenItemController.getPredictedValues(option)
  return res.send({ isSuccess: true, data })
}))
router.post('/markAsDone', asyncMiddleware(async (req, res) => {
  const option = req.body || {}
  const data = await KitchenItemController.markAsDone(option)
  return res.send({ isSuccess: true, data })
}))
router.get('/getReport', asyncMiddleware(async (req, res) => {
  const filePath = await KitchenItemController.createReportXlsx()
  res.download(filePath)
}))

export default router
