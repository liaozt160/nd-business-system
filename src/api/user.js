import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

// 获取登录用户信息
export function getInfo(token) {
  return request({
    url: '/api/profile',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'get'
  })
}
