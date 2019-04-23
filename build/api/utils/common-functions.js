"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = exports.mongooseTransaction = exports.asyncMiddleware = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.asyncMiddleware = asyncMiddleware;

const mongooseTransaction = async fn => {
  const session = await _mongoose.default.startSession();
  session.startTransaction();
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fn(session);
      await session.commitTransaction();
      resolve(result);
    } catch (error) {
      if (session && session.abortTransaction) {
        await session.abortTransaction();
      }

      reject(error);
    }
  });
};

exports.mongooseTransaction = mongooseTransaction;

const createFile = filePath => {
  if (!_fs.default.existsSync(_constants.reportPath)) {
    _fs.default.mkdirSync(_constants.reportPath);
  }

  _fs.default.closeSync(_fs.default.openSync(_constants.reportPath + filePath, 'w'));
};

exports.createFile = createFile;