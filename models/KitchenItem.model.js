const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KitchenItem = new Schema({
  name: {
    type: String,
    required: true,
    max: 100
  },
  quantity: {
    type: Number
  },
  createdTillNow: {
    type: Number
  }
}, {
  collection: 'KitchenItems'
})

module.exports = mongoose.model('KitchenItem', KitchenItem)
