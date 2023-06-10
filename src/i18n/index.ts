//@ts-ignore
import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'

const messages = {
  en: {
    ...EN,
  },
  zh: {
    ...ZH,
  },
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  localStorage.setItem('lang', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true, //全局生效$t
  locale: getCurrentLanguage() || 'zh',
  messages: messages,
})

export default i18n
