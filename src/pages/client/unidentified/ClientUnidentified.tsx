import { useNavigate } from 'react-router-dom'
import { Button, Image, Table } from 'antd'
import { IHistoryData } from '@/app/store/history/index.types'
import { useState } from 'react'
import { useGetOrganizationUnknownPersonQuery } from '@/app/store/index.endpoints'
import type { TableProps } from 'antd'
import { useSelectors } from '@/features/hooks/useSelectors'

const ClientUnidentified = () => {
  const navigate = useNavigate()
  const { mainSelectedOrganization } = useSelectors()
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetOrganizationUnknownPersonQuery({
    kindergarten_id: mainSelectedOrganization,
    page,
  })

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

  return (
    <div className="flex flex-col items-start gap-10">
      <div className="flex items-center justify-between w-full">
        <Button onClick={() => navigate('/')} type="primary">
          Назад
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data}
        loading={isLoading}
        pagination={{
          total: data?.total,
          current: page,
          showSizeChanger: false,
          onChange: (e) => setPage(e),
        }}
        rowKey={(e) => e.id}
        scroll={{ x: true }}
        style={{ width: '100%' }}
      />
    </div>
  )
}

export { ClientUnidentified }
