import { makeAutoObservable } from "mobx"

class ListStroe {
  list = ['react', 'vue']
  constructor() {
    makeAutoObservable(this)
  }
  addList = () => {
    this.list.push('javasrcipt')
  }
}

export { ListStroe }