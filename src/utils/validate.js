const logger = console;
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
logger.debug(`>>> Entering isExternal(path=${path})`);
logger.debug(`<<< Exiting isExternal(path=${path})`);
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
logger.debug(`>>> Entering validUsername(str=${str})`);
  const valid_map = ['admin', 'editor']
logger.debug(`validUsername(str=${str}): valid_map → ${valid_map}`);
  return valid_map.indexOf(str.trim()) >= 0
}
