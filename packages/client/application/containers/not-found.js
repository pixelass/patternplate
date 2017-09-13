'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const _reactRedux = require('react-redux');

const _documentation = require('../components/documentation');

const _documentation2 = _interopRequireDefault(_documentation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reactRedux.connect)((state) => {
  return {
    base: state.base,
    id: state.id,
    docs: {
      contents: selectNotFound(state)
    }
  };
})(_documentation2.default);


function selectNotFound(state) {
  const url = state.routing.locationBeforeTransitions.pathname;
  return '\n# Nothing found\n\n> Pretty sure these aren\'t the hypertext documents you are looking for.\n\nWe looked everywhere and could not find a single thing at `' + url + '`.\n\nYou might want to navigate back to [Home](/) or use the search.\n\n---\n\nHelp us to make this message more helpful on [GitHub](https://github.com/sinnerschrader/patternplate)\n';
}