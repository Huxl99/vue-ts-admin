import { defineStore } from 'pinia'

import { reqHasTrademark } from '@/api/product/trademark/index'
//@ts-ignore
import { ElMessage } from 'element-plus'

const productStore = defineStore('Product', {
  state: () => {
    return {
      pageNo: 1,
      limit: 5,
      total: 0,
      trademarkArr: [],
    }
  },
  //异步|逻辑
  actions: {
    async getHasTrade() {
      const res = await reqHasTrademark(this.pageNo, this.limit)
      //console.log(res)
      if (res.code == 200) {
        this.total = res.data.total
        //@ts-ignore
        this.trademarkArr = res.data.records
        return res
      }
      ElMessage.error('服务器发生错误')
      // console.log(this.total)
    },
  },

  getters: {},
})

export default productStore
