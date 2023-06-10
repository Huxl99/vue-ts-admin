import { defineStore } from 'pinia'

import { Itab, tabs } from './type/type'
const tabStore = defineStore('tab', {
  state: (): tabs => {
    return {
      tabsList: [],
      contextMenuTabId: '',
    }
  },
  //异步|逻辑
  actions: {
    //tabs动态
    addTabs(tab: Itab) {
      const isSome = this.tabsList.some((item) => item.path == tab.path)
      if (!isSome) {
        this.tabsList.push(tab)
      }
    },
    //删除teb
    closeCurrentTab(targetName: string) {
      const index = this.tabsList.findIndex((item) => item.path == targetName)
      this.tabsList.splice(index, 1)
    },
    //右键打开菜单保存path
    saveCurcontextTabId(curtextMenuTabId: String) {
      this.contextMenuTabId = curtextMenuTabId
    },

    //右键删除所有tab
    closeAllTabsbtn() {
      this.tabsList = []
      sessionStorage.removeItem('TABS_ROUTES')
    },
    //关闭其他
    closeOtherTabsbtn() {
      this.tabsList = this.tabsList.filter(
        (item) => item.path == this.contextMenuTabId,
      )
    },
  },

  getters: {},
})

export default tabStore
