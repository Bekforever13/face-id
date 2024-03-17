import { IdName, IdUrl } from '@/shared/types/Types'

export type TImage = {
  id: number
  url: string
}

export type IUserData = {
  id: number
  last_name: string
  first_name: string
  group: IdName
  images?: IdUrl[]
}

export interface IUserFormData {
  first_name: string
  last_name: string
  group_id: number
  images: File
  id?: number
}

export interface IUserInitState {
  usersModalOpen: boolean
  userToEdit: Omit<IUserFormData, 'images'>
  selectedUserID: number
}
