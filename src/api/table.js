import request from '@/utils/request'
const logger = console;

export function getList(params) {
logger.error(`>>> Entering getList(params=${params})`, { "event.action": "getList" });
logger.warn(`<<< Exiting getList(params=${params})`, { "event.action": "getList" });
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
