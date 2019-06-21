import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(data) {
  return request({
    url: '/transaction/list',
    method: 'get',
    data
  })
}
