import request from '@/utils/request'


// 获取买家经纪人网络列表
export function getBuyerBrokerNetList (data) {
  return request({
    url: '/api/account/buyer/net/list',
    method: 'post',
    data
  })
}
// 添加买家经纪人网络
export function addBuyerBrokerNet (data) {
  return request({
    url: '/api/account/buyer/net/add',
    method: 'post',
    data
  })
}
// 获取单个买家经纪人网络信息
export function getBuyerBrokerNet (data) {
  return request({
    url: '/api/account/buyer/net/show',
    method: 'post',
    data
  })
}
// 修改买家经纪人网络
export function editBuyerBrokerNet (data) {
  return request({
    url: '/api/account/buyer/net/update',
    method: 'post',
    data
  })
}
// 删除买家经纪人网络
export function delBuyerBrokerNet (data) {
  return request({
    url: '/api/account/buyer/net/del',
    method: 'post',
    data
  })
}
// 获取可选买家经纪人列表
export function getBuyerBrokerList(data) {
  return request({
    url: '/api/account/buyer/net/brokers',
    method: 'post',
    data
  })
}
// 获取买家经纪人网络成员列表
export function getBuyerBrokerMembersList(data) {
  return request({
    url: '/api/account/buyer/net/members',
    method: 'post',
    data
  })
}
// 获取买家经纪人网络成员列表
export function setBuyerMembersRole(data) {
  return request({
    url: '/api/account/buyer/net/manager',
    method: 'post',
    data
  })
}
