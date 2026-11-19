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
logger.error('>>> Entering mockXHR()', { "event.action": "mockXHR" });
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
	logger.error('>>> Entering send()', { "event.action": "send" });
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
	logger.warn('<<< Exiting send()', { "event.action": "send" });
  }

  function XHR2ExpressReqWrap(respond) {
	logger.error(`>>> Entering XHR2ExpressReqWrap(respond=${respond})`, { "event.action": "XHR2ExpressReqWrap", "logrite.respond": respond });
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
	logger.warn(`<<< Exiting XHR2ExpressReqWrap(respond=${respond})`, { "event.action": "XHR2ExpressReqWrap", "logrite.respond": respond });
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
logger.warn('<<< Exiting mockXHR()', { "event.action": "mockXHR" });
}

module.exports = {
  mocks,
  mockXHR
}

