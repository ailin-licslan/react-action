import { Layout, Menu, Popconfirm } from 'antd'

//Link 组件间跳转   Outlet 二级路由出口
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { useStore } from '../../store'
import { useEffect } from 'react'

//数据改变立即连接视图  同步数据变化
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const LinLayout = () => {


  //结构userStore
  const { userStore, loginStore } = useStore()


  //空数组只执行一次！！！
  useEffect(() => {
    userStore.getUserInfo()
  }, [userStore])


  const location = useLocation()
  // 这里是当前浏览器上的路径地址
  const selectedKey = location.pathname


  //只能在函数组件里面  hook
  const navigate = useNavigate()
  const onConfirm = () => {
    loginStore.logout()
    //清空token 跳到登录页 
    navigate('/login')
  }


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          {/* 渲染用户名 */}

          <span className="user-name">{userStore.userInfo.name}</span>


          <span className="user-logout">

            {/* 退出 */}
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>

          </span>
        </div>
      </Header>


      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            // 高亮原理  defaultSelectedKeys ==== item key 
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to='/'>数据概览</Link>

            </Menu.Item>

            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to='/article'>内容管理</Link>

            </Menu.Item>

            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to='/publish'>发布文章</Link>

            </Menu.Item>

          </Menu>
        </Sider>


        {/* content */}
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>


    </Layout>
  )
}

export default observer(LinLayout)
