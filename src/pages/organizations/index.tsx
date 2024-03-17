import { Heading } from '@/shared'
import { OrganizationsModal } from './modal'
import { OrganizationsTable } from './table'
import { useActions } from '@/features/hooks/useActions'

const Organizations = () => {
  const { setOrganizationsModalOpen } = useActions()

  return (
    <div className="flex flex-col gap-y-10">
      <Heading title="Организации" event={() => setOrganizationsModalOpen(true)} />
      <OrganizationsTable />
      <OrganizationsModal />
    </div>
  )
}

export { Organizations }
