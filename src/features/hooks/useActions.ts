import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { actions as organizations } from '@/app/store/organizations/index.slice'
import { actions as groups } from '@/app/store/group/index.slice'
import { actions as users } from '@/app/store/user/index.slice'
import { actions as history } from '@/app/store/history/index.slice'
import { actions as main } from '@/app/store/main/index.slice'

const rootActions = {
  ...organizations,
  ...groups,
  ...users,
  ...history,
  ...main,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
