
//React 核心包
import React from 'react'

//ReactDOM 专门做渲染相关的包
import ReactDOM from 'react-dom/client'

//全局样式文件
import '../src/basic/index.css'


//引入根组件 
import App from './App'
//import Appv2 from './AppV2'
//import Appv3 from './AppV3'
//import Appv4 from './AppV4'



//渲染根组件App
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    //<Appv4 />
    // <Appv3 />
    //<Appv2 />
    <App />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
