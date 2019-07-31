import request from '@/utils/request'


// 获取待售企业列表
export function getBusinessList (data) {
  return request({
    url: '/api/business/list',
    method: 'post',
    data
  })
}
// 获取筛选指定经纪人列表
export function getBusinessbrokersList (data) {
  return request({
    url: '/api/business/brokers',
    method: 'post',
    data
  })
}
// 获取筛选指定经纪人列表
export function changeBusinessbrokerSave (data) {
  return request({
    url: '/api/account/business/owner',
    method: 'post',
    data
  })
}
// 买家中介获取待售企业列表-level one
export function buyerGetBusinessOneList (data) {
  return request({
    url: '/api/business/buyer/list/level/one',
    method: 'post',
    data
  })
}
// 买家中介获取待售企业列表-level two
export function buyerGetBusinessTwoList (data) {
  return request({
    url: '/api/business/buyer/list/level/two',
    method: 'post',
    data
  })
}
// 买家中介查看待售企业-level one
export function showLevelOne (data) {
  return request({
    url: '/api/business/buyer/show/level/one',
    method: 'post',
    data
  })
}
// 买家中介查看待售企业-level two
export function showLevelTwo (data) {
  return request({
    url: '/api/business/buyer/show/level/two',
    method: 'post',
    data
  })
}
// 添加待售企业
export function addBusiness (data) {
  return request({
    url: '/api/business/add',
    method: 'post',
    data
  })
}
// 修改待售企业-英文
export function editBusiness (data) {
  return request({
    url: '/api/business/update',
    method: 'post',
    data
  })
}
// 修改待售企业-中文
export function editBusinessZh (data) {
  return request({
    url: '/api/business/zh/update',
    method: 'post',
    data
  })
}
// 查看待售企业信息-英文
export function showBusinessEn (data) {
  return request({
    url: '/api/business/show',
    method: 'post',
    data
  })
}
// 查看待售企业信息-中文
export function showBusinessZh (data) {
  return request({
    url: '/api/business/zh/show',
    method: 'post',
    data
  })
}
// 修改待售企业状态
export function changeStatus (data) {
  return request({
    url: '/api/business/status',
    method: 'post',
    data
  })
}
// 删除待售企业
export function delBusiness (data) {
  return request({
    url: '/api/business/del',
    method: 'post',
    data
  })
}
// 买家中介设置意向企业时，加载买家列表
export function getBuyers () {
  return request({
    url: '/api/buyer/query',
    method: 'post',
  })
}
// 买家中介设置意向企业 提交
export function setAttentionBusiness (data) {
  return request({
    url: '/api/buyer/attention/pay',
    method: 'post',
    data
  })
}
// 企业卖家获取有意向买家列表
export function getAttentionBuyerList (data) {
  return request({
    url: '/api/business/attention/list',
    method: 'post',
    data
  })
}
//获取地址三级联动数据
export function getLocation (data) {
  return request({
    url: '/api/location/query',
    method: 'post',
    data
  })
}
