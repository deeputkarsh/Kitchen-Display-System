"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _httpstatuscodes = require("../constants/httpstatuscodes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = (0, _debug.default)('app');

const errorHandler = (err, req, res, next) => {
  log(err);
  if (err.name === 'AppError') return res.status(err.status || 500).json({
    error: err.message
  }); // Default handle error

  return res.status(_httpstatuscodes.httpStatus.INTERNAL_SERVER_ERROR).json({
    error: err.message || 'Something broke !'
  });
};

exports.errorHandler = errorHandler;