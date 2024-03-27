import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrganizationData, IOrganizationInitState } from './index.types'

const initialState: IOrganizationInitState = {
  organizationsModalOpen: false,
  organizationToEdit: {
    address: '',
    id: 0,
    image: '',
    name: '',
    org: 0
  },
  selectedOrganizationID: 0,
}

const OrganizationsSlice = createSlice({
  name: 'Organizations',
  initialState,
  reducers: {
    setOrganizationsModalOpen(state, { payload }: PayloadAction<boolean>) {
      state.organizationsModalOpen = payload
    },
    setOrganizationToEdit(state, { payload }: PayloadAction<IOrganizationData>) {
      state.organizationToEdit = payload
    },
    setSelectedOrganizationID(state, { payload }: PayloadAction<number>) {
      state.selectedOrganizationID = payload
    },
  },
})
export const { reducer, actions } = OrganizationsSlice
