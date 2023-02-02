import request from '@/utils/request'

// 获取spu列表
export const reqSpuList = ({ page, limit, category3Id }) => {
  return request({
    method: 'get',
    url: `/admin/product/${page}/${limit}`,
    params: {
      category3Id
    }
  })
}

// 平台销售属性 (整个平台销售属性一共有三个)
export const reqBaseSaleAttrList = () => {
  return request({
    method: 'get',
    url: '/admin/product/baseSaleAttrList'
  })
}

// 获取品牌信息列表
export const reqBaseTrademarkList = () => {
  return request({
    method: 'get',
    url: '/admin/product/baseTrademark/getTrademarkList'
  })
}

// 修改SPU||添加SPU 携带的都是skuInfo 唯一的区别是否带有id
export const reqAddOrUpdateSku = skuInfo => {
  // 携带的参数带有id 修改SPU
  if (skuInfo.id) {
    return request({
      method: 'post',
      url: '/admin/product/updateSpuInfo',
      data: skuInfo
    })
  } else {
    // 添加SPU
    return request({
      method: 'post',
      url: '/admin/product/saveSpuInfo',
      data: skuInfo
    })
  }
}

// 获取spu基本信息
export const reqSpu = spuId => {
  return request({
    method: 'get',
    url: `/admin/product/getSpuById/${spuId}`
  })
}

// 获取Spu图片的接口
export const reqSpuImageList = spuId => {
  return request({
    method: 'get',
    url: `/admin/product/spuImageList/${spuId}`
  })
}

// 获取销售属性的数据
export const reqSpuSaleAttrList = spuId => {
  return request({
    method: 'get',
    url: `/admin/product/spuSaleAttrList/${spuId}`
  })
}

// 获取平台属性的数据
export const reqSpuAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    method: 'get',
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  })
}

// 删除SPU
export const reqDeleteSpu = spuId => {
  return request({
    method: 'delete',
    url: `/admin/product/deleteSpu/${spuId}`
  })
}

// 添加sku
export const reqSaveSkuInfo = data => {
  return request({
    method: 'post',
    url: '/admin/product/saveSkuInfo',
    data
  })
}

// 获取sku列表的数据
export const reqSkuList = spuId => {
  return request({
    method: 'get',
    url: `/admin/product/findBySpuId/${spuId}`
  })
}
