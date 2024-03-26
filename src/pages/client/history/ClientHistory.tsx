import { useLocation, useNavigate } from 'react-router-dom'
import { Button, DatePicker, Image, Table } from 'antd'
import { IHistoryData } from '@/app/store/history/index.types'
import { useState } from 'react'
import { useGetAllHistoryQuery } from '@/app/store/index.endpoints'
import type { TableProps, DatePickerProps } from 'antd'

const ClientHistory = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string | string[]>('')
  const { state } = useLocation()
  const { data, isLoading } = useGetAllHistoryQuery({
    id: state,
    date: selectedDate,
  })

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    console.log(dateString)
    setSelectedDate(dateString)
  }

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
        <Button onClick={() => navigate(-1)} type="primary">
          Назад
        </Button>
        <DatePicker placeholder="Выберите дату" onChange={onChange} />
      </div>
      <Table
        loading={isLoading}
        scroll={{ x: true }}
        columns={columns}
        rowKey={(el) => el.id}
        style={{ width: '100%' }}
        dataSource={data?.data}
      />
    </div>
  )
}

export { ClientHistory }
