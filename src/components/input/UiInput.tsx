import { Input, InputProps } from 'antd'
import { FC } from 'react'

const UiInput: FC<InputProps> = (props) => {
  return <Input {...props} allowClear />
}

export { UiInput }
