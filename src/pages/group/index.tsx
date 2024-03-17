import { Heading } from '@/shared'
import { GroupsModal } from './modal'
import { GroupsTable } from './table'
import { useActions } from '@/features/hooks/useActions'

const Groups = () => {
  const { setGroupsModalOpen } = useActions()
  return (
    <div className="flex flex-col gap-y-10">
      <Heading title="Группы" event={() => setGroupsModalOpen(true)} />
      <GroupsTable />
      <GroupsModal />
    </div>
  )
}

export { Groups }
