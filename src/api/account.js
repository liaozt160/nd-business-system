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
export function delAccount (data) {
  return request({
    url: '/api/account/del',
    method: 'post',
    data
  })
}
// 获取当前用户信息
export function getAccount (data) {
  return request({
    url: '/api/profile',
    method: 'post',
    data
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
// 管理员保存分配买家可查看企业列表
export function setAssignList (data) {
  return request({
    url: '/api/account/assign',
    method: 'post',
    data
  })
}
// 获取首页汇总数据l
export function getPanelDataApi () {
  return request({
    url: '/api/dashboard/index',
    method: 'post',
  })
}
//联系我们提交表单
export function contactUsApi (data) {
  return request({
    url: '/api/contact',
    method: 'post',
    data
  })
}
//联系我们表单列表
export function contactUsListApi () {
  return request({
    url: '/api/contact/list',
    method: 'post',
  })
}
//删除联系我们表单列表
export function delContactUsListApi (data) {
  return request({
    url: '/api/contact/del',
    method: 'post',
    data
  })
}

