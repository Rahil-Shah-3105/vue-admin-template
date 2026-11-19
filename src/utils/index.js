const logger = console;
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
logger.error(`>>> Entering parseTime(time=${time},cFormat=${cFormat})`, { "event.action": "parseTime", "logrite.time": time, "logrite.cFormat": cFormat });
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
logger.error(`parseTime(time=${time},cFormat=${cFormat}): format → ${format}`, { "event.action": "parseTime", "logrite.time": time, "logrite.cFormat": cFormat });
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
logger.error(`parseTime(time=${time},cFormat=${cFormat}): time_str → ${time_str}`, { "event.action": "parseTime", "logrite.time": time, "logrite.cFormat": cFormat });
logger.warn(`<<< Exiting parseTime(time=${time},cFormat=${cFormat})`, { "event.action": "parseTime", "logrite.time": time, "logrite.cFormat": cFormat });
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
logger.error(`>>> Entering formatTime(time=${time},option=${option})`, { "event.action": "formatTime", "logrite.time": time, "logrite.option": option });
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

logger.error(`formatTime(time=${time},option=${option}): d → ${d}`, { "event.action": "formatTime", "logrite.time": time, "logrite.option": option });
  const diff = (now - d) / 1000
logger.error(`formatTime(time=${time},option=${option}): diff → ${diff}`, { "event.action": "formatTime", "logrite.time": time, "logrite.option": option });

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
	logger.warn(`<<< Exiting formatTime(time=${time},option=${option})`, { "event.action": "formatTime", "logrite.time": time, "logrite.option": option });
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
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
