
//React 核心包
import React from 'react'

//ReactDOM 专门做渲染相关的包
import ReactDOM from 'react-dom/client'

//全局样式文件
import '../src/basic/index.css'


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
