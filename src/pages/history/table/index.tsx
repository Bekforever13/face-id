import { useEffect, FC } from 'react'
import { Button, Image, Popconfirm, Space, Table, message } from 'antd'
import type { TableProps } from 'antd'
import { useDeleteGroupMutation, useGetAllHistoryQuery } from '@/app/store/index.endpoints'
import { BsArrowRight, BsTrash } from 'react-icons/bs'
import { IHistoryData } from '@/app/store/history/index.types'
import { useSelectors } from '@/features/hooks/useSelectors'

const HistoryTable: FC = () => {
  const { selectedDate, selectedUserID } = useSelectors()
  const { data, isLoading } = useGetAllHistoryQuery(selectedDate)
  const [deleteGroup, { isSuccess }] = useDeleteGroupMutation()

  const handleDelete = (id: number) => deleteGroup(id)

  const columns: TableProps<IHistoryData>['columns'] = [
    {
      title: 'Пользователь',
      dataIndex: 'child_id',
      key: 'child_id',
    },
    {
      title: 'Группа',
      dataIndex: 'group_id',
      key: 'group_id',
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
    {
      title: 'Действия',
      key: 'action',
      render: (_, rec) => (
        <Space size="middle">
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
          <Button type="primary" className="flex items-center gap-2">
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
      console.log(selectedUserID)
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

export { HistoryTable }
