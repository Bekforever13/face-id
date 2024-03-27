import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IHistoryData, IHistoryDataProps } from './index.types'

export const HistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<IData<IHistoryData>, IHistoryDataProps | void>(
      {
        query: (body) => ({
          url: `/reports?limit=10&
          ${body?.date ? `time=${body.date}&` : ''}
          ${body?.id ? `child_id=${body.id}&` : ''}
          ${body?.page ? `page=${body.page}` : ''}`
        }),
        providesTags: ['history'],
      },
    ),
    getOneHistory: builder.query<unknown, number>({
      query: (id) => ({
        url: `/reports${id ? `?child_id=${id}` : ''}`,
      }),
      providesTags: ['history'],
    }),
    getOrganizationHistory: builder.query<IData<IHistoryData>, number>({
      query: (id) => ({
        url: `/kindergarten/${id}/reports`,
      }),
      providesTags: ['history'],
    }),
  }),
})
