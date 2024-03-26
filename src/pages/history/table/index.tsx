import { FC, useEffect } from 'react'
import { Image, Table } from 'antd'
import type { TableProps } from 'antd'
import { useGetAllHistoryQuery } from '@/app/store/index.endpoints'
import { IHistoryData } from '@/app/store/history/index.types'
import { useSelectors } from '@/features/hooks/useSelectors'
import { useActions } from '@/features/hooks/useActions'

const HistoryTable: FC = () => {
  const { selectedDate } = useSelectors()
  const { data, isLoading } = useGetAllHistoryQuery({date: selectedDate})
  const { setSelectedOrganizationID } = useActions()

  const columns: TableProps<IHistoryData>['columns'] = [
    {
      title: 'Пользователь',
      dataIndex: 'child',
      key: 'child',
      render: (_, rec) => rec.child.first_name + ' ' + rec.child.last_name,
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
      render: (_, rec) => rec.group.name,
    },
    {
      title: 'Схожесть в %',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Дата',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Изображения',
      dataIndex: 'images',
      key: 'images',
      render: (_, rec) => {
        return (
          <div className="flex gap-2 flex-wrap">
            {rec.images.map((el) => (
              <Image key={el.id} src={el.url} width={50} height={70} />
            ))}
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    setSelectedOrganizationID(0)
  }, [])

  return (
    <Table
      loading={isLoading}
      scroll={{ x: true }}
      columns={columns}
      rowKey={(el) => el.id}
      dataSource={data?.data}
    />
  )
}

export { HistoryTable }
