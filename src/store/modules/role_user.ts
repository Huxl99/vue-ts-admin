import { defineStore } from 'pinia'
import { reqAllRoleList } from '@/api/acl/role/index'
import { roleUser } from './type/type'

//@ts-ignore
import { ElMessage } from 'element-plus'

const roleUser = defineStore('roleUsers', {
  state: (): roleUser => {
    return {
      //分页器当前页码
      pageNo: 1,
      //每一页展示几条数据
      limit: 7,
      //用户总个数
      total: 0,
      //存储全部用户的数组
      roleArr: [],
      //收集用户信息的响应式数据
      keyword: '',
    }
  },
  //异步|逻辑
  actions: {
    //获取全部已有的用户信息
    async getHasRole() {
      const res = await reqAllRoleList(this.pageNo, this.limit, this.keyword)
      // console.log(res)
      if (res.code == 200) {
        this.total = res.data.total
        this.roleArr = res.data.records
        return res
      }
      ElMessage.error('服务器发送错误,请稍后在试!')
    },
  },

  getters: {},
})

export default roleUser
