import request from '@/utils/request'


// 获取用户列表
export function getAccountsList (data) {
  return request({
    url: '/api/account/list',
    method: 'post',
    data
  })
}
// 添加用户列表
export function addAccount (data) {
  return request({
    url: '/api/account/add',
    method: 'post',
    data
  })
}
// 修改用户
export function editAccount (data) {
  return request({
    url: '/api/account/update',
    method: 'post',
    data
  })
}
// 启用、禁用用户
export function statusAccount (data) {
  return request({
    url: '/api/account/status',
    method: 'post',
    data
  })
}
// 删除用户
export function delAccount (id) {
  return request({
    url: '/api/account/del',
    method: 'post',
    params: { id }
  })
}
// 获取当前用户信息
export function getAccount (id) {
  return request({
    url: '/api/profile',
    method: 'post',
    params: { id }
  })
}
// 修改当前用户信息
export function changeAccount (data) {
  return request({
    url: '/api/account/update',
    method: 'post',
    data
  })
}
// 修改当前用户密码
export function changeAccountPassword(data) {
  return request({
    url: '/api/profile/password',
    method: 'post',
    data
  })
}
// 管理员获取分配买家可查看企业列表
export function getAssignList (id) {
  return request({
    url: '/api/account/assign/list',
    method: 'post',
    params: { id }
  })
}
// 管理员保存分配买家可查看企业列表
export function setAssignList (data) {
  return request({
    url: '/api/account/assign',
    method: 'post',
    data
  })
}

