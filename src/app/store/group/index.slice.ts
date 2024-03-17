import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IGroupFormData, IGroupInitState } from './index.types'

const initialState: IGroupInitState = {
  groupsModalOpen: false,
  groupToEdit: {
    id: 0,
    name: '',
    kindergarten_id: 0,
    model_camera: '',
  },
  selectedGroupID: 0,
}

const GroupsSlice = createSlice({
  name: 'Groups',
  initialState,
  reducers: {
    setGroupsModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.groupsModalOpen = payload
    },
    setGroupsToEdit(state, { payload }: PayloadAction<IGroupFormData>) {
      state.groupToEdit = payload
    },
    setSelectedGroupID(state, { payload }: PayloadAction<number>) {
      state.selectedGroupID = payload
    },
  },
})
export const { reducer, actions } = GroupsSlice
