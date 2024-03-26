import { FaHistory } from 'react-icons/fa'
import { MdChildCare } from 'react-icons/md'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { FaChild, FaLayerGroup } from 'react-icons/fa6'

const { Content, Sider } = Layout

const menuItems: MenuProps['items'] = [
  // { key: '/', icon: <MdChildCare />, label: 'Главная' },
  { key: '/organizations', icon: <MdChildCare />, label: 'Организации' },
  { key: '/group', icon: <FaLayerGroup />, label: 'Группы' },
  { key: '/users', icon: <FaChild />, label: 'Пользователи' },
  { key: '/history', icon: <FaHistory />, label: 'История' },
]

const AdminLayout: FC = () => {
  const { pathname } = useLocation()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const navigate = useNavigate()

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <h1 className="text-white text-3xl text-center my-10">LOGO</h1>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          selectedKeys={[pathname]}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export { AdminLayout }
