import { IdName } from '@/shared/types/Types'

export interface IGroupData extends IdName {
  kindergarten: IdName
  model_camera: string
}

export interface IGroupFormData extends IdName {
  kindergarten_id: number
  model_camera: string
}

export interface IGroupInitState {
  groupsModalOpen: boolean
  groupToEdit: IGroupFormData
  selectedGroupID: number
}
