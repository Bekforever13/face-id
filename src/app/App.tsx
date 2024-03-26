import {
  ClientGroup,
  ClientHistory,
  ClientMain,
  ClientUnidentified,
  ClientUsers,
  Groups,
  History,
  Home,
  Organizations,
  Users,
} from '@/pages'
import { AdminLayout, ClientLayout } from '@/widgets/layout'
import { Route, Routes } from 'react-router-dom'
import ruRU from 'antd/lib/locale/ru_RU'
import { ConfigProvider } from 'antd'

const App = () => {
  return (
    <ConfigProvider locale={ruRU}>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<ClientMain />} />
          <Route path="/groups" element={<ClientGroup />} />
          <Route path="/users" element={<ClientUsers />} />
          <Route path="/unidentified" element={<ClientUnidentified />} />
          <Route path="/history" element={<ClientHistory />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/organizations" element={<Organizations />} />
          <Route path="/admin/group" element={<Groups />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/history" element={<History />} />
        </Route>
      </Routes>
    </ConfigProvider>
  )
}

export { App }
