import request from '@/utils/request'


// 获取买家列表
export function getBuyerList (data) {
  return request({
    url: '/api/buyer/list',
    method: 'post',
    data
  })
}
// 添加买家列表
export function addBuyer (data) {
  return request({
    url: '/api/buyer/add',
    method: 'post',
    data
  })
}
// 修改买家
export function editBuyer (data) {
  return request({
    url: '/api/buyer/update',
    method: 'post',
    data
  })
}
// 查看买家信息
export function showBuyer (id) {
  return request({
    url: '/api/buyer/show',
    method: 'post',
    params: { id }
  })
}
// 删除买家
export function delBuyer (id) {
  return request({
    url: '/api/buyer/del',
    method: 'post',
    params: { id }
  })
}
// 买家意向企业列表
export function buyerAttentionList (data) {
  return request({
    url: '/api/buyer/attention/list',
    method: 'post',
    data
  })
}
// 删除买家意向企业
export function delBuyerAttention (id) {
  return request({
    url: '/api/buyer/attention/del',
    method: 'post',
    params: { id }
  })
}
