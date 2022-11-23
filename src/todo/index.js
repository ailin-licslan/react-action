import './index.css'
import { useStore } from '../store/index'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import uuid from 'react-uuid'
function Task () {


  //useStroe
  const { taskStore } = useStore()

  console.log('taskStore is :', taskStore)

  //单选受控  函数组件 state  hook写法 绑onchange事件 e.target.value 赋值即可  下面的input 是多个此时这个方式不合适哈 
  //const [check,setCheck] = useState()

  //思想：  mobx Stroe去维护状态 input只需要把e.target.value交给store 让它来进行修改 

  function onchange (id, e) {
    console.log("============test====>", id, e.target.checked)
    taskStore.singleCheck(id, e.target.checked)
  }

  function allCheck (isDone) {
    taskStore.allCheck(isDone)
  }

  function delTask (id, e) {
    console.log('del exec ...', id, e)
    taskStore.delTask(id)
  }


  const [taksObj, setTaskObj] = useState('licslan')

  function addTask (e) {
    if (e.keyCode === 13) {
      taskStore.addTask(
        {
          id: uuid(),
          name: taksObj,
          isDone: false
        }
      )
      //clear input
      setTaskObj('')
    }


  }



  return (


    <section className="todoapp">
      <header className="header">
        <h1>LICSLAN</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          value={taksObj}
          placeholder="What needs to be done?"
          onChange={(e) => setTaskObj(e.target.value)}
          onKeyUp={addTask}
        />
      </header>



      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={(e) => allCheck(e.target.checked)}
        />
        <label htmlFor="toggle-all"></label>


        {/* 列表数据 */}
        <ul className="todo-list">
          {
            taskStore.list.map(item => (
              // completed 标识已经完成  动态渲染类名
              <li className={item.isDone ? 'todo completed' : 'todo'} key={item.id}>
                <div className="view">
                  {/* 单选框 受控组件 非受控组件 */}
                  <input
                    className="toggle"
                    type="checkbox"
                    checked={item.isDone}
                    onChange={(e) => onchange(item.id, e)} />
                  <label >{item.name}</label>

                  {/* delelte task */}
                  <button className="destroy" onClick={(e) => delTask(item.id, e)}></button>
                </div>
              </li>
            ))
          }

        </ul>

      </section>
      <footer className="footer">
        <span className="todo-count">
          任务总数: {taskStore.list.length} 已完成: {taskStore.isFinishedNum}
        </span>
      </footer>


    </section >
  )
}

export default observer(Task)