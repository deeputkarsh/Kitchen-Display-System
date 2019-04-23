"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _utils = require("../utils");

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post('/placeOrder', (0, _utils.asyncMiddleware)(async (req, res) => {
  const data = req.body;

  const responseData = _controllers.KitchenItemController.placeOrder(data);

  return res.send({
    isSuccess: true,
    data: responseData
  });
}));
router.get('/getAll', (0, _utils.asyncMiddleware)(async (req, res) => {
  const data = await _controllers.KitchenItemController.getAll();
  return res.send({
    isSuccess: true,
    data
  });
}));
router.all('/getPredictedValues', (0, _utils.asyncMiddleware)(async (req, res) => {
  const option = req.body || {};
  const data = await _controllers.KitchenItemController.getPredictedValues(option);
  return res.send({
    isSuccess: true,
    data
  });
}));
router.post('/markAsDone', (0, _utils.asyncMiddleware)(async (req, res) => {
  const option = req.body || {};
  const data = await _controllers.KitchenItemController.markAsDone(option);
  return res.send({
    isSuccess: true,
    data
  });
}));
router.get('/getReport', (0, _utils.asyncMiddleware)(async (req, res) => {
  const filePath = await _controllers.KitchenItemController.createReportXlsx();
  res.download(filePath);
}));
var _default = router;
exports.default = _default;