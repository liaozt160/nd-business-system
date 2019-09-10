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
export function getBuyers (data) {
  return request({
    url: '/api/buyer/query',
    method: 'post',
    data
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
//获取企业分类数组数据
export function getBusinessCategoryArr (data) {
  return request({
    url: '/api/category/query',
    method: 'post',
    data
  })
}
//获取买家经纪人列表
export function getBuyerBrokersList (data) {
  return request({
    url: '/api/buyer/broker/query',
    method: 'post',
    data
  })
}
//推荐给买家经纪人添加待售企业清单保存
export function addRecommendSave (data) {
  return request({
    url: '/api/recommend/add',
    method: 'post',
    data
  })
}
//更改买家经纪人保存
export function changeBuyerBrokerSave (data) {
  return request({
    url: '/api/buyer/broker/change',
    method: 'post',
    data
  })
}
//获取提示推荐清单列表
export function getRecommendList (data) {
  return request({
    url: '/api/recommend/list',
    method: 'post',
    data
  })
}
//获取全部已有提示推荐清单列表
export function getAllRecommendList (data) {
  return request({
    url: '/api/recommend/query',
    method: 'post',
    data
  })
}
//提示推荐清单列表删除
export function recommendListDel (data) {
  return request({
    url: '/api/recommend/del',
    method: 'post',
    data
  })
}
//提示推荐清单详细企业删除
export function recommendListDetailDel (data) {
  return request({
    url: '/api/recommend/remove',
    method: 'post',
    data
  })
}
//已有提示推荐清单添加企业
export function haverecommendListAppend (data) {
  return request({
    url: '/api/recommend/append',
    method: 'post',
    data
  })
}
//获取提示推荐清单详情
export function getRecommendListDetail (data) {
  return request({
    url: '/api/recommend/details',
    method: 'post',
    data
  })
}
//更改发布状态
export function changePublic (data) {
  return request({
    url: 'api/business/public',
    method: 'post',
    data
  })
}
//添加到登录页展示
export function AddToLandingPage (data) {
  return request({
    url: 'api/business/LandingPage ',
    method: 'post',
    data
  })
}
// 根据所传business id，生成不同等级企业资料pdf文件，data.num---要打印的信息级别
export function businessGeneratePdf (data) {
  return request({
    url: '/api/account/business/pdf/'+data.num,
    method: 'post',
    responseType: 'blob',
    data:data.data
  })
}
// 根据所传recommend id，生成不同等级企业资料pdf文件，data.num---要打印的信息级别
export function recommendPdf (data) {
  return request({
    url: '/api/recommend/pdf/'+data.num,
    method: 'post',
    responseType: 'blob',
    data:data.data
  })
}
