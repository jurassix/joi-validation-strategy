"use strict";

exports.__esModule = true;
exports["default"] = isEmpty;

function isEmpty(obj) {
  if (obj === undefined || obj === null) return true;
  return Object.keys(obj).length === 0;
}

module.exports = exports["default"];