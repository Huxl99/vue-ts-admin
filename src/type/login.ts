//登录
export interface LoginFromInt {
  username: string
  password: string
}

export interface Rules {
  username: (
    | {
        required: boolean
        message: string
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
  password: (
    | {
        required: boolean
        message: string
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
}

//注册
export interface Register {
  name: string
  email: string
  password: string
  password2: string
  role: string
}

export interface RegisterRules {
  name: (
    | {
        required: boolean
        message: string
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
  email: (
    | {
        required: boolean
        message: string
        trigger: string
        type?: undefined
      }
    | {
        type: string
        message: string
        trigger: string
        required?: undefined
      }
  )[]
  password: (
    | {
        required: boolean
        message: string
        trigger: string
        min?: undefined
        max?: undefined
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
        required?: undefined
      }
  )[]
  password2: (
    | {
        required: boolean
        message: string
        trigger: string
      }
    | {
        min: number
        max: number
        message: string
        trigger: string
      }
    | {
        validator: (rule: RegisterRules, value: string, callback: any) => void
        trigger: string
      }
  )[]
}
