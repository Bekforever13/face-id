import { useLocation, useNavigate } from 'react-router-dom'
import { Button, DatePicker, Image, Table } from 'antd'
import { IHistoryData } from '@/app/store/history/index.types'
import { useState } from 'react'
import { useGetAllHistoryQuery } from '@/app/store/index.endpoints'
import type { TableProps, DatePickerProps } from 'antd'

const ClientHistory = () => {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState<string | string[]>('')
  const { state } = useLocation()
  const { data, isLoading } = useGetAllHistoryQuery({
    id: state,
    date: selectedDate,
    page,
  })

  const onChange: DatePickerProps['onChange'] = (_, dateString) =>
    setSelectedDate(dateString)

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
        <Button onClick={() => navigate('/users')} type="primary">
          Назад
        </Button>
        <div className='flex items-center gap-3'>
          Выберите дату
          <DatePicker placeholder="Выберите дату" onChange={onChange} />
        </div>
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

export { ClientHistory }
