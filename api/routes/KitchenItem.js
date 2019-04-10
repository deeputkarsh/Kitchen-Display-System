import express from 'express'
import XLSX from 'xlsx'
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
  const workbook = await KitchenItemController.getReport()
  XLSX.writeFile(workbook, './reports/LatestKitchenReport.xlsx', { type: 'buffer', bookType: 'xlsx' })
  res.download('./reports/LatestKitchenReport.xlsx')
}))

export default router
