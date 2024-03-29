import {
  useGetAllGroupsQuery,
  // useGetAllHistoryQuery,
  useGetAllOrganizationsQuery,
  useGetAllUsersQuery,
  useGetOrganizationHistoryQuery,
  useGetOrganizationUnknownPersonQuery,
} from '@/app/store/index.endpoints'
import { useSelectors } from '@/features/hooks/useSelectors'
import { Image, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { FaUsers } from 'react-icons/fa'
import { MdGroupOff } from 'react-icons/md'
import { GiMeepleGroup } from 'react-icons/gi'
// import type { TableProps } from 'antd'
// import { IHistoryData } from '@/app/store/history/index.types'
// import { useState } from 'react'

// const columns: TableProps<IHistoryData>['columns'] = [
//   {
//     title: 'Пользователь',
//     dataIndex: 'child',
//     key: 'child',
//     render: (_, rec) => rec.child.first_name + ' ' + rec.child.last_name,
//   },
//   {
//     title: 'Группа',
//     dataIndex: 'group',
//     key: 'group',
//     render: (_, rec) => rec.group.name,
//   },
//   {
//     title: 'Схожесть в %',
//     dataIndex: 'score',
//     key: 'score',
//   },
//   {
//     title: 'Дата',
//     dataIndex: 'time',
//     key: 'time',
//   },
//   {
//     title: 'Изображения',
//     dataIndex: 'images',
//     key: 'images',
//     render: (_, rec) => {
//       return (
//         <div className="flex gap-2 flex-wrap">
//           {rec.images.map((el) => (
//             <Image key={el.id} src={el.url} width={50} height={70} />
//           ))}
//         </div>
//       )
//     },
//   },
// ]

const ClientMain = () => {
  // const [page, setPage] = useState(1)
  const { mainSelectedOrganization } = useSelectors()
  const { data: groups } = useGetAllGroupsQuery(+mainSelectedOrganization)
  const { data: users } = useGetAllUsersQuery(+mainSelectedOrganization)
  const { data: unidentifieds } = useGetOrganizationUnknownPersonQuery({
    kindergarten_id: mainSelectedOrganization,
    page: 1,
  })
  const { data: orgs } = useGetAllOrganizationsQuery()
  const { data: history } = useGetOrganizationHistoryQuery(
    mainSelectedOrganization,
    {
      pollingInterval: 5000, //refetch every 1minut
      skipPollingIfUnfocused: true,
    },
  )
  const navigate = useNavigate()
  const organization = orgs?.data?.find(
    (el) => el.id === +mainSelectedOrganization,
  )

  if (!organization?.id && !groups && !users) {
    return <Spin spinning />
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-2xl flex items-center relative bg-[#DFF5FF]">
        <img
          src={organization?.image}
          alt="organization image"
          className="w-full max-h-[250px] mx-auto rounded-2xl object-none object-center"
        />
        <div className="font-semibold text-black flex absolute flex-col gap-y-5 text-left left-5 bottom-5 backdrop-blur-2xl p-5 rounded-2xl">
          <h1>{organization?.name}</h1>
          <p>{organization?.address}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 w-full max-lg:flex-wrap">
        <div
          onClick={() => navigate('/groups', { state: groups })}
          className="w-full font-semibold text-white flex flex-col rounded-2xl  cursor-pointer transition-all hover:scale-105"
        >
          <div className="flex items-start justify-between gap-y-5 py-5 px-10 bg-[#DFF5FF] rounded-t-2xl">
            <span className="font-bold text-5xl text-[#378CE7]">
              {groups?.total ?? 0}
            </span>
            <GiMeepleGroup size="48" color="#378CE7" />
          </div>
          <span className="bg-[#378CE7] text-left py-5 px-10 rounded-b-2xl">
            Группы
          </span>
        </div>
        <div
          onClick={() => navigate('/users')}
          className="w-full font-semibold text-white flex flex-col rounded-2xl  cursor-pointer transition-all hover:scale-105"
        >
          <div className="flex items-start justify-between gap-y-5 py-5 px-10 bg-[#DFF5FF] rounded-t-2xl">
            <span className="font-bold text-5xl text-[#378CE7]">
              {users?.total ?? 0}
            </span>
            <FaUsers size="48" color="#378CE7" />
          </div>
          <span className="bg-[#378CE7] text-left py-5 px-10 rounded-b-2xl">
            Учеников
          </span>
        </div>
        <div
          onClick={() => navigate('/unidentified')}
          className="w-full font-semibold text-white flex flex-col rounded-2xl  cursor-pointer transition-all hover:scale-105"
        >
          <div className="flex items-start justify-between gap-y-5 py-5 px-10 bg-[#DFF5FF] rounded-t-2xl">
            <span className="font-bold text-5xl text-[#378CE7]">
              {unidentifieds?.total ?? 0}
            </span>
            <MdGroupOff size="48" color="#378CE7" />
          </div>
          <span className="bg-[#378CE7] text-left py-5 px-10 rounded-b-2xl">
            Неопознанных личностей
          </span>
        </div>
      </div>
      <div className="flex items-start justify-center gap-5">
        <Image
          src={history?.data?.[0]?.images?.[0].url}
          alt="photo"
          width={300}
        />
        <div className="flex flex-col gap-y-3 items-start font-semibold text-lg">
          <p>
            <b>Ф.И.О</b>: {history?.data?.[0]?.child.last_name}
            {history?.data?.[0]?.child.first_name}
          </p>
          <p>
            <b>Группа</b>: {history?.data?.[0]?.group.name}
          </p>
          <p>
            <b>Схожесть в %</b>: {history?.data?.[0]?.score}
          </p>
          <p>
            <b>Время</b>: {history?.data?.[0]?.time}
          </p>
        </div>
      </div>
      {/* <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#378CE7',
              colorBgContainer: '#DFF5FF',
              headerColor: 'white',
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={history?.data}
          loading={historyLoading}
          pagination={{
            total: history?.total,
            current: page,
            showSizeChanger: false,
            onChange: (e) => setPage(e),
          }}
          rowKey={(e) => e.id}
          scroll={{ x: true }}
          style={{ width: '100%' }}
          onRow={(record) => ({
            onClick: () => navigate(`/history`, { state: record?.child?.id }),
          })}
        />
      </ConfigProvider> */}
    </div>
  )
}

export { ClientMain }
