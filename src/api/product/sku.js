import request from '@/utils/request'

// sku列表的请求接口
export const reqSkuList = (page, limit) => {
  return request({
    method: 'get',
    url: `/admin/product/list/${page}/${limit}`
  })
}

// 下架接口
export const reqCancelSale = skuId => {
  return request({
    method: 'get',
    url: `/admin/product/cancelSale/${skuId}`
  })
}

// 上架接口
export const reqOnSale = skuId => {
  return request({
    method: 'get',
    url: `/admin/product/onSale/${skuId}`
  })
}

// 获取sku详情
export const reqSkuInfo = skuId => {
  return request({
    method: 'get',
    url: `/admin/product/getSkuById/${skuId}`
  })
}

// 删除sku
export const reqDeleteSku = skuId => {
  return request({
    method: 'delete',
    url: `/admin/product/deleteSku/${skuId}`
  })
}
