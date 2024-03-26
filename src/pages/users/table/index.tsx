import { FC, useEffect } from 'react'
import { Button, Popconfirm, Space, Table, message, Image } from 'antd'
import type { TableProps } from 'antd'
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '@/app/store/index.endpoints'
import { BsArrowRight, BsTrash } from 'react-icons/bs'
import { BsPencilSquare } from 'react-icons/bs'
import { useActions } from '@/features/hooks/useActions'
import { IUserData } from '@/app/store/user/index.types'
import { useSelectors } from '@/features/hooks/useSelectors'
import { useNavigate } from 'react-router-dom'

const UsersTable: FC = () => {
  const { selectedGroupID } = useSelectors()
  const [deleteUser, { isSuccess }] = useDeleteUserMutation()
  const { setUsersModalOpen, setUsersToEdit, setSelectedUserID } = useActions()
  const { data, isLoading } = useGetAllUsersQuery(selectedGroupID)
  const navigate = useNavigate()

  const handleDelete = (id: number) => deleteUser(id)

  const handleClickWatch = (id: number) => {
    setSelectedUserID(id)
    navigate('/admin/history')
  }

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
      title: 'Действия',
      render: (_, rec) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setUsersToEdit({
                id: rec.id,
                last_name: rec.last_name,
                first_name: rec.first_name,
                group_id: rec.group.id,
              })
              setUsersModalOpen(true)
            }}
            className="flex items-center"
          >
            <BsPencilSquare size="22" />
          </Button>
          <Popconfirm
            title="Вы действительно хотите удалить?"
            okText="Да"
            cancelText="Отмена"
            onConfirm={() => handleDelete(rec.id)}
          >
            <Button type="default" className="flex items-center">
              <BsTrash color="red" size="22" />
            </Button>
          </Popconfirm>
          <Button
            onClick={() => handleClickWatch(rec.id)}
            type="primary"
            className="flex items-center gap-2"
          >
            Смотреть
            <BsArrowRight size="22" />
          </Button>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    if (isSuccess) {
      message.success('Успешно удалено')
    }
  }, [isSuccess])

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

export { UsersTable }
