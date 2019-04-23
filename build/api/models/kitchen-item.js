"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KitchenItem = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schemaDef = new _mongoose.default.Schema({
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
});

const KitchenItem = _mongoose.default.model('KitchenItem', schemaDef);

exports.KitchenItem = KitchenItem;