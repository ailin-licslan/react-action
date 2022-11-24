//封装http请求

import axios from 'axios'
import { getToken } from './token'
import { history } from './history'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
http.interceptors.request.use((config) => {

  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  if (error.response.status === 401) {
    //跳回登录  然而 react 并不支持 react Router 在组件之外完成路由跳转  
    //参考： // https://github.com/remix-run/react-router/issues/8264
    console.log("status ========> ", error.response.status)
    history.push('/login')
  }

  return Promise.reject(error)
})

export { http }