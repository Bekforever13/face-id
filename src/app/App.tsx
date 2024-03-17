import { Groups, History, Home, Organizations, Users } from '@/pages'
import { AppLayout } from '@/widgets/layout'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/group" element={<Groups />} />
        <Route path="/users" element={<Users />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}

export { App }
