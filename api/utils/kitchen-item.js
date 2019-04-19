import XLSX from 'xlsx'
import { KitchenItem } from '../models'
import { createFile } from './common-functions'
import { reportPath } from '../constants'

export const createAndFillWorkbook = (items) => {
  let workbook = XLSX.utils.book_new()
  let sheetHeader = {
    header: ['Dish_name', 'Produced', 'Predicted']
  }
  let sheetData = []
  items.forEach(item => {
    sheetData.push({
      'Dish_name': item.name,
      'Produced': item.createdTillNow,
      'Predicted': item.predictedValue
    })
  })
  const workSheet = XLSX.utils.json_to_sheet(sheetData, sheetHeader)
  XLSX.utils.book_append_sheet(workbook, workSheet, 'My sheet')
  const fileName = 'latest-kitchen-report.xlsx'
  createFile(fileName)
  const filePath = reportPath + fileName
  XLSX.writeFile(workbook, filePath, { type: 'buffer', bookType: 'xlsx' })
  return filePath
}
export const calcPredictedValue = (data) => {
  const mSecInDay = 86400000
  const mSecPassedToday = Date.now() - (new Date()).setHours(0, 0, 0, 0)
  let predictedValue = data.createdTillNow / mSecPassedToday
  predictedValue = predictedValue * mSecInDay
  predictedValue = Math.round(predictedValue * 100) / 100
  return predictedValue
}
export const createNewItem = (data) => {
  let newItem = new KitchenItem({
    name: data.dishName,
    quantity: data.quantity,
    createdTillNow: 0
  })
  return new Promise((resolve, reject) => {
    newItem.save((err) => {
      if (err) {
        reject(err)
      } else {
        resolve('Item Created')
      }
    })
  })
}
export const updateItem = (data) => {
  return new Promise((resolve, reject) => {
    KitchenItem.findByIdAndUpdate(data._id, data, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve('Item Updated')
      }
    })
  })
}
export const getAllItems = () => {
  return new Promise((resolve, reject) => {
    KitchenItem.find({}, (err, items) => {
      if (err) {
        reject(err)
      } else {
        resolve(items)
      }
    })
  })
}
export const getItemByName = (data) => {
  return new Promise((resolve, reject) => {
    KitchenItem.findOne({ name: data.dishName }, (err, item) => {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}
export const getItemById = (id) => {
  return new Promise((resolve, reject) => {
    KitchenItem.findById(id, (err, item) => {
      if (err) {
        reject(err)
      } else {
        resolve(item)
      }
    })
  })
}
