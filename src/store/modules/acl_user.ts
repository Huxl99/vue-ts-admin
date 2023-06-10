import { defineStore } from 'pinia'
import { reqUserInfo } from '@/api/acl/user/index'
import { aclUsers } from './type/type'
//@ts-ignore
import { ElMessage } from 'element-plus'

const aclUser = defineStore('aclUsers', {
  state: (): aclUsers => {
    return {
      //分页器当前页码
      pageNo: 1,
      //每一页展示几条数据
      pageSize: 7,
      //用户总个数
      total: 0,
      //存储全部用户的数组
      userArr: [],
      //收集用户信息的响应式数据
      keyword: '',
    }
  },
  //异步|逻辑
  actions: {
    //获取全部已有的用户信息
    async getHasUser() {
      const res = await reqUserInfo(this.pageNo, this.pageSize, this.keyword)
      //console.log(res)
      if (res.code == 200) {
        this.total = res.data.total
        this.userArr = res.data.records
        return res
      }
      ElMessage.error('服务器发送错误,请稍后在试!')
    },
  },

  getters: {},
})

export default aclUser
