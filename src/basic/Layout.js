import { Outlet } from 'react-router-dom'

function Layout () {
  return <div>loyout
    {/* 二级路由出口 */}
    <Outlet />
  </div>
}

export default Layout