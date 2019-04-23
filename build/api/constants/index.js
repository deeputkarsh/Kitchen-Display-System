"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpstatuscodes = require("./httpstatuscodes");

Object.keys(_httpstatuscodes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _httpstatuscodes[key];
    }
  });
});

var _common = require("./common");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});