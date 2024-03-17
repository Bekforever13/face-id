import { Button, ButtonProps } from 'antd'
import { FC } from 'react'

const UiButton: FC<ButtonProps> = (_props) => {
  return <Button {..._props} htmlType="submit" type="primary" />
}
export { UiButton }
