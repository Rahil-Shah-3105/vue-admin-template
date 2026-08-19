import Cookies from 'js-cookie'
const logger = console;

const TokenKey = 'vue_admin_template_token'

export function getToken() {
logger.debug('>>> Entering getToken()');
logger.debug('<<< Exiting getToken()');
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
logger.debug('>>> Entering removeToken()');
logger.debug('<<< Exiting removeToken()');
  return Cookies.remove(TokenKey)
}
