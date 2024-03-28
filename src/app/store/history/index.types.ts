import { IdName, IdUrl } from '@/shared/types/Types'

export type IdFirstLastName = {
  id: number
  first_name: string
  last_name: string
}

export interface IHistoryData {
  id: number
  group: IdName
  child: IdFirstLastName
  score: string
  time: string
  images: IdUrl[]
}

export interface IHistoryInitState {
  selectedDate: string | string[]
}

export interface IHistoryDataProps {
  id?: number
  date: string | string[]
  page: number
}

export interface IUnknownPerson {
  id: number
  group: IdName
  child: IdFirstLastName
  score: string
  time: string
  images: IdUrl[]
}

export interface IUnidentifiedProps {
  kindergarten_id: string
  page: number
}

export interface IOrganizationHistoryProps {
  mainSelectedOrganization: string
  page: number
}
