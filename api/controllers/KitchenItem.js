import {
  calcPredictedValue,
  createNewItem,
  updateItem,
  getAllItems,
  getItemByName,
  getItemById,
  createAndFillWorkbook
} from '../utils'

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
