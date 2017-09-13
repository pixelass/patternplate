'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startEnvironmentMiddleware;
function startEnvironmentMiddleware(application) {
  return function* environmentMiddleware(next) {
    this.set('X-Name', application.name);
    this.set('X-Environment', application.configuration.environment);
    yield next;
  };
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9hcHBsaWNhdGlvbi9taWRkbGV3YXJlcy9lbnZpcm9ubWVudC5qcyJdLCJuYW1lcyI6WyJzdGFydEVudmlyb25tZW50TWlkZGxld2FyZSIsImFwcGxpY2F0aW9uIiwiZW52aXJvbm1lbnRNaWRkbGV3YXJlIiwibmV4dCIsInNldCIsIm5hbWUiLCJjb25maWd1cmF0aW9uIiwiZW52aXJvbm1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUF3QkEsMEI7QUFBVCxTQUFTQSwwQkFBVCxDQUFvQ0MsV0FBcEMsRUFBaUQ7QUFDOUQsU0FBTyxVQUFVQyxxQkFBVixDQUFnQ0MsSUFBaEMsRUFBc0M7QUFDM0MsU0FBS0MsR0FBTCxDQUFTLFFBQVQsRUFBbUJILFlBQVlJLElBQS9CO0FBQ0EsU0FBS0QsR0FBTCxDQUFTLGVBQVQsRUFBMEJILFlBQVlLLGFBQVosQ0FBMEJDLFdBQXBEO0FBQ0EsVUFBTUosSUFBTjtBQUNELEdBSkQ7QUFLRCIsImZpbGUiOiJlbnZpcm9ubWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0YXJ0RW52aXJvbm1lbnRNaWRkbGV3YXJlKGFwcGxpY2F0aW9uKSB7XG4gIHJldHVybiBmdW5jdGlvbiogZW52aXJvbm1lbnRNaWRkbGV3YXJlKG5leHQpIHtcbiAgICB0aGlzLnNldCgnWC1OYW1lJywgYXBwbGljYXRpb24ubmFtZSk7XG4gICAgdGhpcy5zZXQoJ1gtRW52aXJvbm1lbnQnLCBhcHBsaWNhdGlvbi5jb25maWd1cmF0aW9uLmVudmlyb25tZW50KTtcbiAgICB5aWVsZCBuZXh0O1xuICB9O1xufVxuIl19