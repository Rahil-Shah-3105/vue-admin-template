const logger = console;
/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
logger.error(`>>> Entering param2Obj(url=${url})`, { "event.action": "param2Obj", "logrite.url": url });
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
	logger.error(`param2Obj(url=${url}): search → ${search}`, { "event.action": "param2Obj", "logrite.url": url });
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
logger.error(`param2Obj(url=${url}): searchArr → ${searchArr}`, { "event.action": "param2Obj", "logrite.url": url });
logger.warn(`<<< Exiting param2Obj(url=${url})`, { "event.action": "param2Obj", "logrite.url": url });
  return obj
}

module.exports = {
  param2Obj
}
