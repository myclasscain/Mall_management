import * as attr from './product/attr'
import * as trade_mark from './product/trade_mark'
import * as spu from './product/spu'
import * as sku from './product/sku'

// 引入权限相关的接口文件
import * as user from './acl/user'
import role from './acl/role'
import permission from './acl/permission'

// 对外暴露
export default {
  trade_mark,
  attr,
  spu,
  sku,
  user,
  role,
  permission
}
