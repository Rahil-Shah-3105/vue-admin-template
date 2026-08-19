const logger = console;
/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
logger.debug(`>>> Entering param2Obj(url=${url})`);
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
	logger.debug(`param2Obj(url=${url}): search → ${search}`);
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
logger.debug(`param2Obj(url=${url}): searchArr → ${searchArr}`);
logger.debug(`<<< Exiting param2Obj(url=${url})`);
  return obj
}

module.exports = {
  param2Obj
}
