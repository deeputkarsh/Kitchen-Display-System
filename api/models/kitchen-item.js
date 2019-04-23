import mongoose from 'mongoose'

const schemaDef = new mongoose.Schema({
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
})

export const KitchenItem = mongoose.model('KitchenItem', schemaDef)
