import { IGroupData } from '@/app/store/group/index.types'
import { Button, ConfigProvider, Progress, Tag } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const colors = [
  'processing',
  'success',
  'error',
  'warning',
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
]

const ClientGroup = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  return (
    <div className="flex flex-col items-start gap-10">
      <Button onClick={() => navigate('/')} type="primary">
        Назад
      </Button>
      <div className="flex items-start flex-wrap gap-10">
        {state?.data?.map((el: IGroupData) => (
          <Tag
            key={el.id}
            color={colors[Math.ceil(Math.random() * 14)]}
            className={`border border-solid w-full border-black p-5 rounded-2xl font-semibold transition-all hover:scale-105 hover:text-white`}
          >
            <Link to={`/users`} state={el.id}>
              <ConfigProvider
                theme={{
                  components: {
                    Progress: {
                      circleTextFontSize: '14px',
                      remainingColor: 'white',
                    },
                  },
                }}
              >
                <Progress
                  type="circle"
                  percent={Math.ceil(Math.random() * 100)}
                  format={(percent) => percent + ` / 100`}
                />
              </ConfigProvider>
              <div className="flex flex-col gap-y-3 mt-3">
                <p>{el.name}</p>
                <p>{el.model_camera}</p>
              </div>
            </Link>
          </Tag>
        ))}
      </div>
    </div>
  )
}

export { ClientGroup }
