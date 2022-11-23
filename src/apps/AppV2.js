import Counter from '../store/counter.Store'
//导入中间件 连接 mobx + react 完成响应式变化
import { observer } from 'mobx-react-lite'
function AppV2 () {

  return (
    <div>appV2 count:
      {Counter.count}
      <br></br>
      {/* 使用计算属性 */}
      {Counter.filterList.join('-')}
      <button onClick={Counter.addCount}>+1</button>
      <br></br>
      <button onClick={Counter.addList}>修改数组</button>
    </div>
  )
}
export default observer(AppV2)