//先把所有工具函数导出模块这里导入  再统一导出
import { http } from './http'
import {
  setToken,
  getToken,
  removeToken
} from './token'


export {
  http, setToken,
  getToken,
  removeToken
}



