import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IMainInitState } from './index.types'

const initialState: IMainInitState = {
  mainSelectedOrganization: '',
}

const MainSlice = createSlice({
  name: 'Main',
  initialState,
  reducers: {
    setMainSelectedOrganization(state, { payload }: PayloadAction<string>) {
      state.mainSelectedOrganization = payload
    },
  },
})
export const { reducer, actions } = MainSlice
