import { Button, DatePicker } from 'antd'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { DatePickerProps } from 'antd'
import { useActions } from '@/features/hooks/useActions'

type Props = {
  title: string
  event?: () => void
}

const Heading: FC<Props> = ({ title, event }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { setSelectedDate } = useActions()

  const onChange: DatePickerProps['onChange'] = (_, dateString) => setSelectedDate(dateString)

  return (
    <div className="flex items-center justify-between">
      <h1>{title}</h1>
      {pathname === '/history' && (
        <DatePicker placeholder="Выберите дату" onChange={onChange} />
      )}
      <div className="flex items-center gap-5">
        <Button onClick={() => navigate(-1)} type="default">
          Назад
        </Button>
        {event && (
          <Button type="primary" onClick={event}>
            Добавить
          </Button>
        )}
      </div>
    </div>
  )
}

export { Heading }
