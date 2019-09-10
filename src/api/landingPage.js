import request from '@/utils/request'


// 无需权限获取登录页展示企业列表
export function getLandingPageData (data) {
  return request({
    url: '/api/landing/business',
    method: 'post',
    data
  })
}
// 管理员获取登录页展示企业列表
export function adminGetLandingPageData (data) {
  return request({
    url: '/api/account/landing/business/details',
    method: 'post',
    data
  })
}
// 添加企业到登录页展示列表
export function appendLandingPageBusiness (data) {
  return request({
    url: '/api/account/landing/business/append',
    method: 'post',
    data
  })
}
//登录页展示列表删除企业
export function removeLandingPageBusiness (data) {
  return request({
    url: '/api/account/landing/business/remove',
    method: 'post',
    data
  })
}
