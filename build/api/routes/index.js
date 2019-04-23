"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;

var _kitchenItem = _interopRequireDefault(require("./kitchen-item"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RouteData = [{
  path: '/kitchenItem',
  router: _kitchenItem.default
}];

const Routes = app => {
  // Setting application routes
  app.get('/', (req, res) => res.sendFile('/index.html', {
    root: _constants.publicPath
  }));
  RouteData.forEach(route => app.use(route.path, route.router)); // Version Route

  app.get('/api/version', (req, res, next) => {
    return res.json({
      statusCode: _constants.httpStatus.OK,
      message: 'OK',
      data: process.env.APP_VERSION
    });
  }); // Health check route

  app.get('/api/health-check', (req, res, next) => {
    return res.json({
      statusCode: _constants.httpStatus.OK,
      message: 'OK'
    });
  }); // If not found 404 route

  app.use(function (req, res, next) {
    return res.status(_constants.httpStatus.NOT_FOUND).json({
      statusCode: _constants.httpStatus.NOT_FOUND,
      message: 'No route found'
    });
  });
};

exports.Routes = Routes;