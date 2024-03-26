import { IdName, IdUrl } from '@/shared/types/Types'

export interface IHistoryData {
  id: number
  group: IdName
  child: {
    id: number
    first_name: string
    last_name: string
  }
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
}
