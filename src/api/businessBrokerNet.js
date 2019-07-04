import request from '@/utils/request'


// 获取卖家经纪人网络列表
export function getBusinessBrokerNetList (data) {
  return request({
    url: '/api/account/business/net/list',
    method: 'post',
    data
  })
}
// 添加卖家经纪人网络
export function addBusinessBrokerNet (data) {
  return request({
    url: '/api/account/business/net/add',
    method: 'post',
    data
  })
}
// 获取单个卖家经纪人网络信息
export function getBusinessBrokerNet (data) {
  return request({
    url: '/api/account/business/net/show',
    method: 'post',
    data
  })
}
// 修改卖家经纪人网络
export function editBusinessBrokerNet (data) {
  return request({
    url: '/api/account/business/net/update',
    method: 'post',
    data
  })
}
// 删除卖家经纪人网络
export function delBusinessBrokerNet (data) {
  return request({
    url: '/api/account/business/net/del',
    method: 'post',
    data
  })
}
// 获取可选企业经纪人列表
export function getBrokerList(data) {
  return request({
    url: '/api/account/business/net/brokers',
    method: 'post',
    data
  })
}
// 获取经纪人网络成员列表
export function getBrokerMembersList(net_id) {
  return request({
    url: '/api/account/business/net/members',
    method: 'post',
    params: { net_id }
  })
}
// 获取经纪人网络成员列表
export function setMembersRole(data) {
  return request({
    url: '/api/account/business/net/manager',
    method: 'post',
    data
  })
}
