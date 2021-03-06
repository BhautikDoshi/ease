#!/usr/bin/env node
'use strict';

var _setpath = require('./setpath');

var _setpath2 = _interopRequireDefault(_setpath);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _module2 = require('module');

var _module3 = _interopRequireDefault(_module2);

var _module_patch = require('./module_patch');

var _module_patch2 = _interopRequireDefault(_module_patch);

var _utils = require('./utils');

var _babelCore = require('babel-core');

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var entry = _path2.default.resolve(process.argv[2]);

var transformer = function transformer(content, filename) {
  _utils.log.debug('Processing file: ' + filename);
  if (!(0, _utils.standard_transformer_filter)(filename)) {
    return content;
  }

  var key = _utils.cache.hash(content);
  try {
    return _utils.cache.get(key);
  } catch (err) {}

  var code = _fs2.default.readFileSync(filename).toString();
  _utils.babel_opts.filename = filename;

  var transpiled = (0, _babelCore.transform)(code, _utils.babel_opts);
  _utils.cache.put(key, transpiled.code);
  return transpiled.code;
};

(0, _module_patch2.default)(transformer, _utils.standard_resolver);

process.argv = process.argv.slice(1);

require(entry);