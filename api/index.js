"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initApp = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _routes = require("./routes");

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initApp = async () => {
  // Initiate express
  const app = (0, _express.default)(); // Parse incoming request body

  app.use(_bodyParser.default.json({
    limit: '5mb'
  }));
  app.use(_bodyParser.default.urlencoded({
    limit: '5mb',
    extended: true,
    parameterLimit: 50
  })); // Create MongoDB connection

  await (0, _config.connectMongo)(); // Initiate all routes

  (0, _routes.Routes)(app); // Application level error handler

  app.use(_config.errorHandler);
  return app;
};

exports.initApp = initApp;