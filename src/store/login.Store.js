import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '../utils/index'


//login 业务
class LoginStore {
  token = getToken() || ''
  constructor() {

    makeAutoObservable(this)

  }

  //登录
  getToken = async ({ mobile, code }) => {
    const res = await http.post('/authorizations', {
      mobile,
      code
    })


    console.log('token is ========>', res.data.token)
    this.token = res.data.token

    //set Token to local store
    setToken(this.token)
  }

  logout = () => {
    //清空本地token 
    this.token = ''
    //清除 localstore token
    removeToken()
  }
}

export default LoginStore