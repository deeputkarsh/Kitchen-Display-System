"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectmongo = require("./connectmongo");

Object.keys(_connectmongo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _connectmongo[key];
    }
  });
});

var _errorhandler = require("./errorhandler");

Object.keys(_errorhandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errorhandler[key];
    }
  });
});