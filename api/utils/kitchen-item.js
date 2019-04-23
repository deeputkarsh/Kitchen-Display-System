"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemById = exports.getItemByName = exports.getAllItems = exports.updateItem = exports.createNewItem = exports.calcPredictedValue = exports.createAndFillWorkbook = void 0;

var _xlsx = _interopRequireDefault(require("xlsx"));

var _models = require("../models");

var _commonFunctions = require("./common-functions");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createAndFillWorkbook = items => {
  let workbook = _xlsx.default.utils.book_new();

  let sheetHeader = {
    header: ['Dish_name', 'Produced', 'Predicted']
  };
  let sheetData = [];
  items.forEach(item => {
    sheetData.push({
      'Dish_name': item.name,
      'Produced': item.createdTillNow,
      'Predicted': item.predictedValue
    });
  });

  const workSheet = _xlsx.default.utils.json_to_sheet(sheetData, sheetHeader);

  _xlsx.default.utils.book_append_sheet(workbook, workSheet, 'My sheet');

  const fileName = 'latest-kitchen-report.xlsx';
  (0, _commonFunctions.createFile)(fileName);
  const filePath = _constants.reportPath + fileName;

  _xlsx.default.writeFile(workbook, filePath, {
    type: 'buffer',
    bookType: 'xlsx'
  });

  return filePath;
};

exports.createAndFillWorkbook = createAndFillWorkbook;

const calcPredictedValue = data => {
  const mSecInDay = 86400000;
  const mSecPassedToday = Date.now() - new Date().setHours(0, 0, 0, 0);
  let predictedValue = data.createdTillNow / mSecPassedToday;
  predictedValue = predictedValue * mSecInDay;
  predictedValue = Math.round(predictedValue * 100) / 100;
  return predictedValue;
};

exports.calcPredictedValue = calcPredictedValue;

const createNewItem = data => {
  let newItem = new _models.KitchenItem({
    name: data.dishName,
    quantity: data.quantity,
    createdTillNow: 0
  });
  return new Promise((resolve, reject) => {
    newItem.save(err => {
      if (err) {
        reject(err);
      } else {
        resolve('Item Created');
      }
    });
  });
};

exports.createNewItem = createNewItem;

const updateItem = data => {
  return new Promise((resolve, reject) => {
    _models.KitchenItem.findByIdAndUpdate(data._id, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve('Item Updated');
      }
    });
  });
};

exports.updateItem = updateItem;

const getAllItems = () => {
  return new Promise((resolve, reject) => {
    _models.KitchenItem.find({}, (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
};

exports.getAllItems = getAllItems;

const getItemByName = data => {
  return new Promise((resolve, reject) => {
    _models.KitchenItem.findOne({
      name: data.dishName
    }, (err, item) => {
      if (err) {
        reject(err);
      } else {
        resolve(item);
      }
    });
  });
};

exports.getItemByName = getItemByName;

const getItemById = id => {
  return new Promise((resolve, reject) => {
    _models.KitchenItem.findById(id, (err, item) => {
      if (err) {
        reject(err);
      } else {
        resolve(item);
      }
    });
  });
};

exports.getItemById = getItemById;