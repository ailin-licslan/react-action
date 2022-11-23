import { CounterStore } from './store/counter.Store.js'
//导入中间件 连接 mobx + react 完成响应式变化
import { observer } from 'mobx-react-lite'
function AppV2 () {
  return (
    <div>appV2 count:
      {CounterStore.count}
      {/* 使用计算属性 */}
      <br></br>
      {CounterStore.filterList.join('-')}
      <button onClick={CounterStore.addCount}>+1</button>
      <br></br>
      <button onClick={CounterStore.addList}>修改数组</button>
    </div>
  )
}
export default observer(AppV2)