import { Heading } from '@/shared'
import { UsersTable } from './table'
import { useActions } from '@/features/hooks/useActions'
import { UsersModal } from './modal'

const Users = () => {
  const { setUsersModalOpen } = useActions()
  return (
    <div className="flex flex-col gap-y-10">
      <Heading title="Пользователи" event={() => setUsersModalOpen(true)} />
      <UsersTable />
      <UsersModal />
    </div>
  )
}

export { Users }
