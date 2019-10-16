import request from '@/utils/request'
// 获取日志列表
export function getLogList(data) {
  return request({
    url: '/api/log/index',
    method: 'post',
    data
  })
}
// 获取所有用户列表
export function getAccountList(data) {
  return request({
    url: '/api/account/query',
    method: 'post',
    data
  })
}

