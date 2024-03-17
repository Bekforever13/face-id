import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserFormData, IUserInitState } from './index.types'

const initialState: IUserInitState = {
  usersModalOpen: false,
  userToEdit: {
    id: 0,
    last_name: '',
    first_name: '',
    group_id: 0,
  },
  selectedUserID: 0,
}

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUsersModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.usersModalOpen = payload
    },
    setUsersToEdit(state, { payload }: PayloadAction<Omit<IUserFormData, 'images'>>) {
      state.userToEdit = payload
    },
    setSelectedUserID(state, { payload }: PayloadAction<number>) {
      state.selectedUserID = payload
    },
  },
})
export const { reducer, actions } = UsersSlice
