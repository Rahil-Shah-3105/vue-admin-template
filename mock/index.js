const logger = console;
const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')

const mocks = [
  ...user,
  ...table
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
logger.debug('>>> Entering mockXHR()');
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
	logger.debug('>>> Entering function()');
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
	logger.debug('<<< Exiting function()');
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
	logger.debug(`>>> Entering XHR2ExpressReqWrap(respond=${respond})`);
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
	logger.debug(`<<< Exiting XHR2ExpressReqWrap(respond=${respond})`);
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
logger.debug('<<< Exiting mockXHR()');
}

module.exports = {
  mocks,
  mockXHR
}

