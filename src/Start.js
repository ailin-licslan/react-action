import Layout from "./pages/Layout"
import Login from "./pages/Login"
//// https://github.com/remix-run/react-router/issues/8264
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom"
//处理 token 失效  401  // https://github.com/remix-run/react-router/issues/8264
import { history } from "./utils/history"
import { AuthRoute } from "./components/AuthComponent"
import Publish from './pages/Publish'
import Article from "./pages/Article"
import Home from "./pages/Home"


//实战项目 
function Start () {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>


          {/* 需要登录鉴权的组件 */}

          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>

            {/* 定义二级路由入口默认路由  index */}
            <Route index element={<Home />}></Route>

            {/* 定义二级路由 入口 */}
            <Route path="/publish" element={<Publish />}></Route>
            <Route path="/article" element={<Article />}></Route>

          </Route>

          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}
export default Start