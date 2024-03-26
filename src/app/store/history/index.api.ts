import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IHistoryData, IHistoryDataProps } from './index.types'

export const HistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<IData<IHistoryData>, IHistoryDataProps | void>(
      {
        query: (body) => ({
          url: `/reports${body?.date ? `?time=${body.date}&` : '?'}${
            body?.id ? `child_id=${body.id}` : ''
          }`,
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
  }),
})
