import { FC, useEffect } from 'react'
import { Button, Popconfirm, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useDeleteGroupMutation, useGetAllGroupsQuery } from '@/app/store/index.endpoints'
import { BsArrowRight, BsTrash } from 'react-icons/bs'
import { BsPencilSquare } from 'react-icons/bs'
import { useActions } from '@/features/hooks/useActions'
import { IGroupData } from '@/app/store/group/index.types'
import { useSelectors } from '@/features/hooks/useSelectors'
import { useNavigate } from 'react-router-dom'

const GroupsTable: FC = () => {
  const { selectedOrganizationID } = useSelectors()
  const { setGroupsModalOpen, setGroupsToEdit, setSelectedGroupID, setSelectedUserID } =
    useActions()
  const [deleteGroup, { isSuccess }] = useDeleteGroupMutation()
  const { data, isLoading } = useGetAllGroupsQuery(selectedOrganizationID)
  const navigate = useNavigate()

  const handleDelete = (id: number) => deleteGroup(id)

  const handleClickWatch = (id: number) => {
    setSelectedGroupID(id)
    navigate('/users')
  }

  const columns: TableProps<IGroupData>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Организация',
      dataIndex: 'kindergarten',
      key: 'kindergarten',
      render: (_, rec) => rec.kindergarten.name,
    },
    {
      title: 'Модель камеры',
      dataIndex: 'model_camera',
      key: 'model_camera',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (_, rec) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setGroupsToEdit({
                id: rec.id,
                name: rec.name,
                kindergarten_id: rec.kindergarten.id,
                model_camera: rec.model_camera,
              })
              setGroupsModalOpen(true)
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

  useEffect(() => {
    setSelectedUserID(0)
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

export { GroupsTable }
