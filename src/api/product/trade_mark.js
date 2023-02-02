import request from '@/utils/request'

// 获取品牌列表
export const reqTrademarkList = (page, limit) => {
  return request({
    method: 'get',
    url: `/admin/product/baseTrademark/${page}/${limit}`
  })
}

// 添加或 修改 品牌
// 添加品牌: url: /admin/product/baseTrademark/save  method:post  data:{logoUrl: '',tmName: ''}
// 修改品牌: url: /admin/product/baseTrademark/update method:put data:{id:1,logoUrl: '',tmName: ''}
// 合并两个接口
export const reqAddOrUpdateTrademark = trademark => {
  if (trademark.id) {
    return request({
      method: 'put',
      url: '/admin/product/baseTrademark/update',
      data: trademark
    })
  } else {
    return request({
      method: 'post',
      url: '/admin/product/baseTrademark/save',
      data: trademark
    })
  }
}

// 删除品牌 method: delete   url: /admin/product/baseTrademark/remove/{id}
export const reqDeleteTrademark = id => {
  return request({
    method: 'delete',
    url: `/admin/product/baseTrademark/remove/${id}`
  })
}
