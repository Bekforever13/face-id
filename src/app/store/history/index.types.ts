import { IdUrl } from '@/shared/types/Types'

export interface IHistoryData {
  id: number
  group_id: number
  child_id: number
  score: string
  time: string
  images: IdUrl[]
}

export interface IHistoryInitState {
  selectedDate: string | string[]
}
