import { useGetAllUsersQuery } from '@/app/store/index.endpoints'
import { Button, Image, Table } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import type { TableProps } from 'antd'
import { IUserData } from '@/app/store/user/index.types'
import { BsArrowRight } from 'react-icons/bs'

const ClientUsers = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { data: allUsersOfOrganization, isLoading } = useGetAllUsersQuery(state)

  const columns: TableProps<IUserData>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'first_name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'last_name',
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      render: (_, rec) => rec?.group?.name,
    },
    {
      title: 'Изображение',
      dataIndex: 'images',
      render: (_, rec) => (
        <Image src={rec?.images?.[0]?.url} width={100} height={150} />
      ),
    },
    {
      title: 'Сегодня присуствует',
      dataIndex: 'images',
      render: () => 'Да',
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      render: (_, rec) => (
        <Button
          className="flex items-center gap-3"
          type="primary"
          onClick={() => navigate('/history', { state: rec.id })}
        >
          Смотреть
          <BsArrowRight size="20" />
        </Button>
      ),
    },
  ]

  return (
    <div className="flex flex-col items-start gap-10">
      <div className="flex items-center justify-between w-full">
        <Button onClick={() => navigate('/')} type="primary">
          Назад
        </Button>
        <div>
          <b>Сегодня:</b> {new Date().toLocaleDateString()}
        </div>
      </div>
      <Table
        loading={isLoading}
        scroll={{ x: true }}
        columns={columns}
        rowKey={(el) => el.id}
        style={{ width: '100%' }}
        dataSource={allUsersOfOrganization?.data}
      />
    </div>
  )
}

export { ClientUsers }
