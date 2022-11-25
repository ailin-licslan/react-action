
//下面注释的是未配置路由懒加载的代码
// import Layout from "./pages/Layout"
// import Login from "./pages/Login"
// //// https://github.com/remix-run/react-router/issues/8264
// import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from "react-router-dom"
// //处理 token 失效  401  // https://github.com/remix-run/react-router/issues/8264
// import { history } from "@/utils/history"
// import { AuthRoute } from "./components/AuthComponent"
// import Publish from './pages/Publish'
// import Article from "./pages/Article"
// import Home from "./pages/Home"

// //实战项目 
// function Start () {
//   return (
//     <HistoryRouter history={history}>
//       <div className="App">
//         <Routes>


//           {/* 需要登录鉴权的组件 */}

//           <Route path="/" element={
//             <AuthRoute>
//               <Layout />
//             </AuthRoute>
//           }>

//             {/* 定义二级路由入口默认路由  index */}
//             <Route index element={<Home />}></Route>

//             {/* 定义二级路由 入口 */}
//             <Route path="/publish" element={<Publish />}></Route>
//             <Route path="/article" element={<Article />}></Route>

//           </Route>

//           <Route path="/login" element={<Login />}></Route>
//         </Routes>
//       </div>
//     </HistoryRouter>
//   )
// }



//配置路由懒加载的数据


//// https://github.com/remix-run/react-router/issues/8264
//处理 token 失效  401  // https://github.com/remix-run/react-router/issues/8264
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom'
import { history } from './utils/history'
import { AuthRoute } from './components/AuthComponent'
import { lazy, Suspense } from "react"


//按需导入组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))



//实战项目   按需加载哈
function Start () {
  return (

    <HistoryRouter history={history}>



      <div className="App">




        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              lazy loading ...
            </div>
          }
        >

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

        </Suspense>
      </div>
    </HistoryRouter>
  )
}












export default Start