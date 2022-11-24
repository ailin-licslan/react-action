import { makeAutoObservable, runInAction } from "mobx"
import { http } from '../utils'

class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }

  loadChannelList = async () => {

    const res = await http.get('/channels')
    console.log("res channelList is :", res)

    runInAction(() => {
      this.channelList = res.data.channels
    })

  }
}

export default ChannelStore