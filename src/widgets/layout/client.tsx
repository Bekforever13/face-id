import type { MenuProps } from 'antd'
import { Layout, theme } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useGetAllOrganizationsQuery } from '@/app/store/index.endpoints'
import { useActions } from '@/features/hooks/useActions'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Outlet } from 'react-router-dom'
import { useWindowSize } from '@/features/hooks/useWindowSize'
import { MdChildCare } from 'react-icons/md'
import { IoIosSchool } from 'react-icons/io'
import { ClientMenu } from './ClientMenu'

const { Content } = Layout

const ClientLayout: FC = () => {
  const { mainSelectedOrganization } = useSelectors()
  const { data, isSuccess } = useGetAllOrganizationsQuery()
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const { setMainSelectedOrganization } = useActions()
  const [width] = useWindowSize()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  useEffect(() => {
    if (data) {
      const mapped = data.data.map((el) => ({
        key: el.id,
        icon: +el.org === 1 ? <MdChildCare /> : <IoIosSchool />,
        label: el.name,
      }))
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
      <ClientMenu />
      <Layout
        className={`min-h-screen ${width < 1000 ? 'ml-0 mt-[100px]' : 'ml-[200px]'}`}
      >
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
      </Layout>
    </Layout>
  )
}

export { ClientLayout }
