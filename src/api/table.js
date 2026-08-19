import request from '@/utils/request'
const logger = console;

export function getList(params) {
logger.debug(`>>> Entering getList(params=${params})`);
logger.debug(`<<< Exiting getList(params=${params})`);
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
