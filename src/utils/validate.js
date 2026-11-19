const logger = console;
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
logger.error(`>>> Entering isExternal(path=${path})`, { "event.action": "isExternal", "logrite.path": path });
logger.warn(`<<< Exiting isExternal(path=${path})`, { "event.action": "isExternal", "logrite.path": path });
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
logger.error(`>>> Entering validUsername(str=${str})`, { "event.action": "validUsername", "logrite.str": str });
  const valid_map = ['admin', 'editor']
logger.error(`validUsername(str=${str}): valid_map → ${valid_map}`, { "event.action": "validUsername", "logrite.str": str });
logger.warn(`<<< Exiting validUsername(str=${str})`, { "event.action": "validUsername", "logrite.str": str });
  return valid_map.indexOf(str.trim()) >= 0
}
