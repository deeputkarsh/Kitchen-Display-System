"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KitchenItem = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const schemaDef = new _mongoose.Schema({
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