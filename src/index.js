
//React 核心包
import React from 'react'

//ReactDOM 专门做渲染相关的包
import ReactDOM from 'react-dom/client'

//全局样式文件
//import '../src/basic/index.css'

// 先导入 antd 样式文件
// 再导入全局样式文件，防止样式覆盖！
import './index.css'


//0.引入根组件 

//1.超级多的react 基础知识学习 
//import App from '../src/apps/App'

//2.mobx 学习 计算属性学习
//import Appv2 from '../src/apps/AppV2'

//3.mobx 学习 
//import Appv3 from '../src/apps/AppV3'

//4.Mobx 项目体验  TODO List dev
//import Appv4 from '../src/apps/AppV4'

//5.实战项目开始 
import Start from './Start'

// 实战项目目录说明
// /src
//   /assets         项目资源文件，比如，图片 等
//   /components     通用组件
//   /pages          页面
//   /store          mobx 状态仓库
//   /utils          工具，比如，token、axios 的封装等
//   Start.js        根组件
//   index.css       全局样式
//   index.js        项目入口



// ● 项目功能演示 
//   ○ 登录、退出
//   ○ 首页
//   ○ 内容（文章）管理：文章列表、发布文章、修改文章
// ● 技术 
//   ○ React 官方脚手架 create-react-app
//   ○ react hooks
//   ○ 状态管理：mobx
//   ○ UI 组件库：antd v5
//   ○ ajax请求库：axios
//   ○ 路由：react-router-dom 以及 history
//   ○ 富文本编辑器：react-quill
//   ○ CSS 预编译器：sass


//渲染根组件App
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Start />
    //<Appv4 />
    //<Appv3 />
    //<Appv2 />
    //<App />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
