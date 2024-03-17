import { RootState } from '@/app/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectors = () => {
  const { organizations, groups, users, history } = useAppSelector((s) => s)
  return { ...organizations, ...groups, ...users, ...history }
}
