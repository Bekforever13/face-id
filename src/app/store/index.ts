import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from './index.api'
import { reducer as organizations } from './organizations/index.slice'
import { reducer as groups } from './group/index.slice'
import { reducer as users } from './user/index.slice'
import { reducer as history } from './history/index.slice'
import { setupListeners } from '@reduxjs/toolkit/query'

const reducers = combineReducers({
  organizations,
  groups,
  users,
  history,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDM) => getDM().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
