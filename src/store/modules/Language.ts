import { defineStore } from 'pinia'

const Language = defineStore('Language', {
  state: () => {
    return {
      lang: localStorage.getItem('lang') || 'zh',
    }
  },
  //异步|逻辑
  actions: {
    changLang(lang: any) {
      this.lang = lang
    },
  },

  getters: {},
})

export default Language
