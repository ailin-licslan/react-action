//组合子模块
//封装统一导出供业务使用的方法

import React from "react"
import Counter from "./counter.Store"
import { ListStroe } from "./list.Store"
import { TaskStore } from './task.Store'
import LoginStore from './login.Store'
import UserStore from "./user.Store"

class RootStore {
  constructor() {

    //对子模块实例化 rootStore has two filed listStroe counterStroe
    this.listStore = new ListStroe()
    this.counterStore = Counter
    this.taskStore = new TaskStore()
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
  }
}

//使用react context机制  完成统一方法封装
const rootStore = new RootStore()
//useContext() 查找机制： 优先从provider value 开始查找 如果找不到就会找默认的从createContext 传过来的参数！
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)
export { useStore }
