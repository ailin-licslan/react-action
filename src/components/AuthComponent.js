//路由鉴权实现


//自己封装 AuthRoute 路由鉴权高阶组件，实现未登录拦截，并跳转到登录页面
//思路为：判断本地是否有token，如果有，就返回子组件，否则就重定向到登录Login
//高阶组件: 把一个组件当作另一个组件的参数传入  然后通过一定的判定  返回新的组件



// 实现步骤
// 1. 在 components 目录中，创建 AuthRoute/index.js 文件
// 2. 判断是否登录
// 3. 登录时，直接渲染相应页面组件
// 4. 未登录时，重定向到登录页面
// 5. 将需要鉴权的页面路由配置，替换为 AuthRoute 组件渲染

import { getToken } from '../utils/token'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}

// <AuthComponent> <Layout/> </AuthComponent>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

export { AuthRoute }