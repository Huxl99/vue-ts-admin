import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  buttons: string[]
  avatar: string
}

export interface tabs {
  tabsList: Array<Itab>
  contextMenuTabId: String
}
export type Itab = {
  path: string
  title: string
  icon: any
}
//定义分类仓库state对象的ts类型
export interface CategoryState {
  c1Id: string | number
  c1Arr: CategoryObj[]
  c2Arr: CategoryObj[]
  c2Id: string | number
  c3Arr: CategoryObj[]
  c3Id: string | number
}

export interface roleUser {
  //分页器当前页码
  pageNo: number
  //每一页展示几条数据
  limit: number
  //用户总个数
  total: number
  //存储全部用户的数组
  roleArr: any[]
  //收集用户信息的响应式数据
  keyword: string
}
export interface aclUsers {
  //分页器当前页码
  pageNo: number
  //每一页展示几条数据
  pageSize: number
  //用户总个数
  total: number
  //存储全部用户的数组
  userArr: any[]
  //收集用户信息的响应式数据
  keyword: string
}
