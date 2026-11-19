import request from '@/utils/request'
const logger = console;

export function login(data) {
logger.error(`>>> Entering login(data=${data})`, { "event.action": "login" });
logger.warn(`<<< Exiting login(data=${data})`, { "event.action": "login" });
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
logger.error('>>> Entering logout()', { "event.action": "logout" });
logger.warn('<<< Exiting logout()', { "event.action": "logout" });
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
