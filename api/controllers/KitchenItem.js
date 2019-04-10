import { KitchenItem } from '../models'
import XLSX from 'xlsx'

// Simple version, without validation or sanitation
export const KitchenItemController = {
  placeOrder: async (data) => {
    let item = await getItemByName(data)
    let response = null
    if (item) {
      item.quantity = Number(item.quantity) + Number(data.quantity)
      response = await updateItem(item)
    } else {
      response = await createNewItem(data)
    }
    return response
  },
  getAll: async function () {
    let items = await getAllItems()
    return items.map(value => {
      return {
        id: value._id,
        name: value.name,
        quantity: value.quantity,
        createdTillNow: value.createdTillNow,
        predictedValue: calcPredictedValue(value)
      }
    })
  },
  getPredictedValues: async function (options) {
    let items = []
    if (options.id) {
      items.push(await getItemById(options.id))
    } else {
      items = await getAllItems()
    }
    return items.map(calcPredictedValue)
  },
  markAsDone: async function (options) {
    let item = await getItemById(options.id)
    let response = null
    if (item.quantity >= 1) {
      item.quantity = Number(item.quantity) - 1
      item.createdTillNow = Number(item.createdTillNow) + 1
      response = await updateItem(item)
    } else {
      response = 'No Order to Mark'
    }
    return response
  },
  getReport: async function () {
    const allItems = await this.getAll()
    return createAndFillWorkbook(allItems)
  }
}
const createAndFillWorkbook = (items) => {
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
  return workbook
}
const calcPredictedValue = (data) => {
  const mSecInDay = 86400000
  const mSecPassedToday = Date.now() - (new Date()).setHours(0, 0, 0, 0)
  let predictedValue = data.createdTillNow / mSecPassedToday
  predictedValue = predictedValue * mSecInDay
  predictedValue = Math.round(predictedValue * 100) / 100
  return predictedValue
}
const createNewItem = (data) => {
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
const updateItem = (data) => {
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
const getAllItems = () => {
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
const getItemByName = (data) => {
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
const getItemById = (id) => {
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
