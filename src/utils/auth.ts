import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

//登录时设置时间

export const setTokenTime = () => {
  //@ts-ignore
  localStorage.setItem(TOKEN_TIME, Date.now())
}

//获取
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}
export const deleTokenTime = () => {
  return localStorage.removeItem(TOKEN_TIME)
}

//是否已过期
export const diffTokenTime = () => {
  const currentTime: any = Date.now()
  const tokenTime: any = getTokenTime()
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}
