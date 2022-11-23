import { makeAutoObservable } from 'mobx'
class TaskStore {


  // mobx 业务状态数据 可能来之后端

  list = [
    {
      id: 1,
      name: '学习react~~~',
      isDone: true
    },
    {
      id: 2,
      name: '搞定mobx',
      isDone: false
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }


  // mobx 下面都是业务状态操作逻辑  计算属性 +  操作方法等


  //计算属性  只有所有选项是选中时候 才是选中状态
  get isAll () {
    return this.list.every(item => item.isDone)
  }

  //计算属性  只有所有选项是选中时候 才是选中状态
  get isFinishedNum () {
    return this.list.filter(item => item.isDone === true).length
  }

  //单选
  singleCheck = (id, isDone) => {

    const item = this.list.find(item => item.id === id)

    console.log('isDone is :', isDone)

    item.isDone = isDone

    console.log('modify item is: ', item.isDone)
  }

  //全选
  allCheck = (isDone) => {
    //all isDone 改成传入的值修改
    this.list.forEach(item => {
      item.isDone = isDone
    })
  }

  //delete
  delTask (id) {
    this.list = this.list.filter(item => item.id !== id)
  }

  //add
  addTask (task) {
    this.list.push(task)
  }

}
export { TaskStore } 