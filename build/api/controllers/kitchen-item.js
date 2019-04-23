"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KitchenItemController = void 0;

var _utils = require("../utils");

// Simple version, without validation or sanitation
const KitchenItemController = {
  placeOrder: async data => {
    let item = await (0, _utils.getItemByName)(data);
    let response = null;

    if (item) {
      item.quantity = Number(item.quantity) + Number(data.quantity);
      response = await (0, _utils.updateItem)(item);
    } else {
      response = await (0, _utils.createNewItem)(data);
    }

    return response;
  },
  getAll: async function () {
    let items = await (0, _utils.getAllItems)();
    return items.map(value => {
      return {
        id: value._id,
        name: value.name,
        quantity: value.quantity,
        createdTillNow: value.createdTillNow,
        predictedValue: (0, _utils.calcPredictedValue)(value)
      };
    });
  },
  getPredictedValues: async function (options) {
    let items = [];

    if (options.id) {
      items.push((await (0, _utils.getItemById)(options.id)));
    } else {
      items = await (0, _utils.getAllItems)();
    }

    return items.map(_utils.calcPredictedValue);
  },
  markAsDone: async function (options) {
    let item = await (0, _utils.getItemById)(options.id);
    let response = null;

    if (item.quantity >= 1) {
      item.quantity = Number(item.quantity) - 1;
      item.createdTillNow = Number(item.createdTillNow) + 1;
      response = await (0, _utils.updateItem)(item);
    } else {
      response = 'No Order to Mark';
    }

    return response;
  },
  createReportXlsx: async function () {
    const allItems = await this.getAll();
    return (0, _utils.createAndFillWorkbook)(allItems);
  }
};
exports.KitchenItemController = KitchenItemController;