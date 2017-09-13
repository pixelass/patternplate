'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const _createClass = function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _classnames = require('classnames');

const _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const Headline = function (_Component) {
  _inherits(Headline, _Component);

  function Headline() {
    let _ref;

    let _temp, _this, _ret;

    _classCallCheck(this, Headline);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Headline.__proto__ || Object.getPrototypeOf(Headline)).call.apply(_ref, [this].concat(args))), _this), _this.displayName = 'Headline', _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Headline, [{
    key: 'render',
    value: function render() {
      const TagName = 'h' + this.props.order;
      const className = (0, _classnames2.default)('h', 'h' + (this.props.display || this.props.order), this.props.className);

      return _react2.default.createElement(
        TagName,
        { className },
        this.props.children
      );
    }
  }]);

  return Headline;
}(_react.Component);

Headline.defaultProps = {
  children: 'Headline',
  order: 1
};
exports.default = Headline;