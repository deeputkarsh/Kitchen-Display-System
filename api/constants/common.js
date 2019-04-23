"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportPath = exports.publicPath = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const publicPath = _path.default.join(__dirname, '../../', process.env.PUBLIC_PATH);

exports.publicPath = publicPath;

const reportPath = _path.default.join(__dirname, '../../', process.env.REPORTS_PATH);

exports.reportPath = reportPath;