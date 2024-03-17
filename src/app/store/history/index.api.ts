import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IHistoryData } from './index.types'

export const HistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<IData<IHistoryData>, string | string[]>({
      query: (date) => ({
        url: `/reports${date ? `?time=${date} 23:59:00` : ''}`,
      }),
      providesTags: ['history'],
    }),
    getOneHistory: builder.query<unknown, number>({
      query: (id) => ({
        url: `/reports/${id}`,
      }),
      providesTags: ['history'],
    }),
  }),
})
