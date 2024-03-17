import { Heading } from '@/shared'
import { HistoryTable } from './table'

const History = () => {
  return (
    <div className="flex flex-col gap-y-10">
      <Heading title="История" />
      <HistoryTable />
    </div>
  )
}

export { History }
