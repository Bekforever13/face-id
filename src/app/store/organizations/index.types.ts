import { IdName } from '@/shared/types/Types'

export interface IOrganizationData extends IdName {
  address: string
  image: string
  org: number
}

export interface IOrganizationInitState {
  organizationsModalOpen: boolean
  organizationToEdit: IOrganizationData
  selectedOrganizationID: number
}
