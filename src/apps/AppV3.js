import { observer } from 'mobx-react-lite'
import { useStore } from "../store/index"

function AppV3 () {
  const rootStore = useStore()
  console.log("=========>", rootStore)
  return (
    <div>appV3 count:
      {rootStore.counterStore.count}
      <button onClick={rootStore.counterStore.addCount}>+1</button>
    </div>
  )
}
export default observer(AppV3)