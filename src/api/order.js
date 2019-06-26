import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/api/order/list',
    method: 'post',
    data
  })
}
export function addOrderApi(data) {
  return request({
    url: '/api/order/add',
    method: 'post',
    data
  })
}
export function updateOrderApi(data) {
  return request({
    url: '/api/order/update',
    method: 'post',
    data
  })
}
export function deleteOrderApi(data) {
  return request({
    url: '/api/order/del',
    method: 'post',
    data
  })
}

