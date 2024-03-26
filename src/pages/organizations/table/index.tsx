import { FC, useEffect } from 'react'
import { Button, Image, Popconfirm, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import {
  useDeleteOrganizationMutation,
  useGetAllOrganizationsQuery,
} from '@/app/store/index.endpoints'
import { IOrganizationData } from '@/app/store/organizations/index.types'
import { BsArrowRight, BsTrash } from 'react-icons/bs'
import { BsPencilSquare } from 'react-icons/bs'
import { useActions } from '@/features/hooks/useActions'
import { useNavigate } from 'react-router-dom'

const OrganizationsTable: FC = () => {
  const { data, isLoading } = useGetAllOrganizationsQuery()
  const [deleteOrganization, { isSuccess }] = useDeleteOrganizationMutation()
  const navigate = useNavigate()
  const { setOrganizationToEdit, setOrganizationsModalOpen, setSelectedOrganizationID } =
    useActions()

  const handleDelete = (id: number) => deleteOrganization(id)

  const handleClickWatch = (id: number) => {
    setSelectedOrganizationID(id)
    navigate('/admin/group')
  }

  const columns: TableProps<IOrganizationData>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (el) => <Image src={el} width={100} height={50} />,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, rec) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setOrganizationToEdit(rec)
              setOrganizationsModalOpen(true)
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

export { OrganizationsTable }
