import Cookies from 'js-cookie'
const logger = console;

const TokenKey = 'vue_admin_template_token'

export function getToken() {
logger.error('>>> Entering getToken()', { "event.action": "getToken" });
logger.warn('<<< Exiting getToken()', { "event.action": "getToken" });
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
logger.error('>>> Entering removeToken()', { "event.action": "removeToken" });
logger.warn('<<< Exiting removeToken()', { "event.action": "removeToken" });
  return Cookies.remove(TokenKey)
}
