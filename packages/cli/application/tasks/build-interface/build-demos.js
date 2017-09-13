'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const _path = require('path');

const _path2 = _interopRequireDefault(_path);

const _fp = require('lodash/fp');

const _zenObservable = require('zen-observable');

const _zenObservable2 = _interopRequireDefault(_zenObservable);

const _build = require('./build');

const _build2 = _interopRequireDefault(_build);

const _getEnvSets = require('./get-env-sets');

const _getEnvSets2 = _interopRequireDefault(_getEnvSets);

const _getTargets = require('./get-targets');

const _getTargets2 = _interopRequireDefault(_getTargets);

const _writeEach = require('./write-each');

const _writeEach2 = _interopRequireDefault(_writeEach);

const _serverRequire = require('./server-require');

const _serverRequire2 = _interopRequireDefault(_serverRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; }  return Array.from(arr);  }

function _asyncToGenerator(fn) { return function () { const gen = fn.apply(this, arguments); return new Promise((resolve, reject) => { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then((value) => { step("next", value); }, (err) => { step("throw", err); }); } } return step("next"); }); }; }

// Const getPatternDemo = serverRequire('get-pattern-demo');

exports.default = buildDemos;


function buildDemos(datasets, target, context) {
  return new _zenObservable2.default(observer => {
    const app = context.app;
    const rewriter = context.rewriter;


    const envs = (0, _getEnvSets2.default)(datasets);
    const idPad = (0, _fp.padEnd)((0, _fp.max)(envs.map(env => env.id.length)));

    (0, _build2.default)(envs, {
      read: function read(set, sets, count) {
        return _asyncToGenerator(function* () {
          observer.next(`${context.verbose ? 'Demos: ' : ''}${idPad(set.id)} ${count}/${envs.length}`);
          return yield getPatternDemo(app, set.id, { environments: set.env }, set.env);
        })();
      },
      write: function write(demo, set, sets, count) {
        return _asyncToGenerator(function* () {
          const base = _path2.default.resolve.apply(_path2.default, [target].concat(_toConsumableArray(set.relative)));
          const baseName = set.name;
          (0, _writeEach2.default)(demo, (0, _getTargets2.default)(base, baseName, set), rewriter);
        })();
      },
      done: function done() {
        observer.next(`${context.verbose ? 'Demos: ' : ''}${envs.length}/${envs.length}`);
        observer.complete();
      }
    }).catch(err => observer.error(err));
  });
}
module.exports = exports.default;