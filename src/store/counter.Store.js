//编写mobx实例代码

import { makeAutoObservable } from 'mobx'

class CounterStore {
  //1.定义state 
  count = 0
  list = [1, 2, 4, 3, 4, 6, 5, 5, 7]
  constructor() {
    //2.把数据弄成响应式的
    makeAutoObservable(this)
  }

  //定义计算属性
  get filterList () {
    return this.list.filter(item => item > 2)
  }

  //push list
  addList = () => {
    this.list.push(7, 8, 90)
  }

  //3.定义action函数 修改数据的
  addCount = () => {
    this.count++
  }

}

//4.实例化
const Counter = new CounterStore()
export default Counter
//export { CounterStore }
