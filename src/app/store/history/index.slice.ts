import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IHistoryInitState } from './index.types'

const initialState: IHistoryInitState = {
  selectedDate: '',
}

const HistorySlice = createSlice({
  name: 'History',
  initialState,
  reducers: {
    setSelectedDate(state, { payload }: PayloadAction<string | string[]>) {
      state.selectedDate = payload
    },
  },
})
export const { reducer, actions } = HistorySlice
