import request from '@/utils/request'
// 获取订单列表
export function getOrderList(data) {
  return request({
    url: '/api/order/list',
    method: 'post',
    data
  })
}
// 添加订单
export function addOrderApi(data) {
  return request({
    url: '/api/order/add',
    method: 'post',
    data
  })
}
// 更新订单
export function updateOrderApi(data) {
  return request({
    url: '/api/order/update',
    method: 'post',
    data
  })
}
// 删除
export function deleteOrderApi(id) {
  return request({
    url: '/api/order/del',
    method: 'post',
    params: { id }
  })
}
// 获取订单信息做修改
export function showOrderApi(id) {
  return request({
    url: '/api/order/show',
    method: 'post',
    params: { id }
  })
}
// 生成订单时获取所有可选企业列表
export function getAllBusinessApi(data) {
  return request({
    url: '/api/business/query',
    method: 'post',
    data
  })
}
// 修改订单状态
export function changeStatusApi(data) {
  return request({
    url: '/api/order/status',
    method: 'post',
    data
  })
}
// 修改订单审核状态
export function changeAuditApi(data) {
  return request({
    url: '/api/order/audit',
    method: 'post',
    data
  })
}
// 查看审核通过订单详情
export function viewAuditOrderApi(id) {
  return request({
    url: '/api/order/view',
    method: 'post',
    params: { id }
  })
}

