import { makeAutoObservable, runInAction } from "mobx"
import { http } from "../utils"

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  //获取用户信息
  getUserInfo = async () => {

    const res = await http.get('/user/profile')

    //存到用户信息中 解决控制台警告(runInAction)：  [MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify:
    runInAction(() => {
      this.userInfo = res.data
    })

  }
}

export default UserStore