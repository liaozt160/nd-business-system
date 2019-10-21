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
export function showBuyer (data) {
  return request({
    url: '/api/buyer/show',
    method: 'post',
    data
  })
}
// 删除买家
export function delBuyer (data) {
  return request({
    url: '/api/buyer/del',
    method: 'post',
    data
  })
}
// 买家中介获取买家意向企业列表
export function buyerAttentionList (data) {
  return request({
    url: '/api/buyer/attention/list',
    method: 'post',
    data
  })
}
// 删除买家意向企业
export function delBuyerAttention (data) {
  return request({
    url: '/api/buyer/attention/del',
    method: 'post',
    data
  })
}
// 修改是否支付服务费
export function changeServiceCharge (data) {
  return request({
    url: '/api/account/buyer/services/pay',
    method: 'post',
    data
  })
}
// 管理员获取买家意向企业列表
export function adminGetBuyerAttentionList (data) {
  return request({
    url: '/api/account/attention/list',
    method: 'post',
    data
  })
}
// 根据所传business id，生成一级企业资料pdf文件
export function attentionPdf (data) {
  return request({
    url: '/api/buyer/attention/pdf',
    method: 'post',
    // responseType: 'blob',
    data
  })
}
// 根据所传buyer_id，发送给指定买家
export function attentionEmailPdf (data) {
  return request({
    url: '/api/buyer/attention/pdf/email',
    method: 'post',
    data
  })
}
// 获取当前账号管理的买家，发送邮件给指定买家
export function getSendBuyerList (data) {
  return request({
    url: '/api/buyer/query/email',
    method: 'post',
    data
  })
}
