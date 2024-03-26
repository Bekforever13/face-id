import type { MenuProps } from 'antd'
import { ConfigProvider, Layout, Menu, theme } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useGetAllOrganizationsQuery } from '@/app/store/index.endpoints'
import { useActions } from '@/features/hooks/useActions'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '@/shared/img/logo.svg'
import { useWindowSize } from '@/features/hooks/useWindowSize'

const { Content, Sider, Header } = Layout

const ClientLayout: FC = () => {
  const { mainSelectedOrganization } = useSelectors()
  const { data, isSuccess } = useGetAllOrganizationsQuery()
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const { setMainSelectedOrganization } = useActions()
  const [width] = useWindowSize()
  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    if (data) {
      const mapped = data.data.map((el) => ({ key: el.id, label: el.name }))
      setMenuItems(mapped)
    }
  }, [isSuccess])

  useEffect(() => {
    if (!mainSelectedOrganization) {
      setMainSelectedOrganization(menuItems?.[0]?.key as string)
    }
  }, [menuItems])

  return (
    <Layout hasSider>
      <Sider
        style={
          width < 1000
            ? {
                display: 'none',
              }
            : {
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                background: '#fff',
              }
        }
      >
        <Link
          to="/"
          className="text-black flex flex-col items-center gap-3 text-3xl my-10"
        >
          <img src={logo} alt="logo" width="75" height="75" /> FACE ID
        </Link>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemBg: '#5356FF',
              },
            },
          }}
        >
          <Menu
            theme="light"
            mode={width < 1000 ? 'horizontal' : 'vertical'}
            items={menuItems}
            onClick={({ key }) => {
              navigate('/')
              setMainSelectedOrganization(key)
            }}
            selectedKeys={[mainSelectedOrganization]}
          />
        </ConfigProvider>
      </Sider>
      <Header style={width > 1000 ? {display: 'none'} : {display: 'block'}}>
        <Link
          to="/"
          className="text-black flex flex-col items-center gap-3 text-3xl my-10"
        >
          <img src={logo} alt="logo" width="75" height="75" /> FACE ID
        </Link>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkItemBg: '#5356FF',
              },
            },
          }}
        >
          <Menu
            theme="light"
            mode={width < 1000 ? 'horizontal' : 'vertical'}
            items={menuItems}
            onClick={({ key }) => {
              navigate('/')
              setMainSelectedOrganization(key)
            }}
            selectedKeys={[mainSelectedOrganization]}
          />
        </ConfigProvider>
      </Header>
      <Layout style={{ marginLeft: 200, minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: '95vh',
            }}
          >
            <Outlet />
          </div>
        </Content>
        H
      </Layout>
    </Layout>
  )
}

export { ClientLayout }
