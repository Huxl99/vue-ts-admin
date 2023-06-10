export const getTime = () => {
  // 引入国际化组件动态翻译方法
  let message = ''
  let hours = new Date().getHours()
  if (hours <= 9) {
    message = '早上'
  } else if (hours <= 13) {
    message = '中午'
  } else if (hours <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
