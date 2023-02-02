import request from '@/utils/request'

// 获取一级分类列表
export const reqCategory1List = () => {
  return request({
    method: 'get',
    url: '/admin/product/getCategory1'
  })
}

// 获取二级分类列表
export const reqCategory2List = category1Id => {
  return request({
    method: 'get',
    url: `/admin/product/getCategory2/${category1Id}`
  })
}

// 获取三级分类列表
export const reqCategory3List = category2Id => {
  return request({
    method: 'get',
    url: `/admin/product/getCategory3/${category2Id}`
  })
}

// 获取平台属性列表
export const reqAttrList = ({ category1Id, category2Id, category3Id }) => {
  return request({
    method: 'get',
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
  })
}

// 添加或修改属性的接口
export const reqAddOrUpdateAttr = data => {
  return request({
    method: 'post',
    url: '/admin/product/saveAttrInfo',
    data
  })
}

// 删除属性接口
export const reqDeleteAttr = attrId => {
  return request({
    method: 'delete',
    url: `/admin/product/deleteAttr/${attrId}`
  })
}
