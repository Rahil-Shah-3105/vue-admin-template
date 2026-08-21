import request from '@/utils/request'
const logger = console;

export function login(data) {
logger.debug(`>>> Entering login(data=${data})`);
logger.debug(`<<< Exiting login(data=${data})`);
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
logger.debug('>>> Entering logout()');
logger.debug('<<< Exiting logout()');
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
