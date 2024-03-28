import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IHistoryData, IHistoryDataProps, IOrganizationHistoryProps, IUnidentifiedProps, IUnknownPerson } from './index.types'

export const HistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<IData<IHistoryData>, IHistoryDataProps | void>(
      {
        query: (body) => ({
          url: `/reports?limit=10&
          ${body?.date ? `time=${body.date}&` : ''}
          ${body?.id ? `child_id=${body.id}&` : ''}
          ${body?.page ? `page=${body.page}` : ''}`,
        }),
      },
    ),
    getOneHistory: builder.query<unknown, number>({
      query: (id) => ({
        url: `/reports${id ? `?child_id=${id}` : ''}`,
      }),
    }),
    getOrganizationHistory: builder.query<IData<IHistoryData>, IOrganizationHistoryProps>({
      query: (id) => ({
        url: `/kindergarten/${id}/reports`,
      }),
    }),
    getOrganizationUnknownPerson: builder.query<IData<IUnknownPerson>, IUnidentifiedProps>({
      query: (body) => ({
        url: '/unknown/reports',
        params: {
          limit: 10,
          kindergarten_id: body.kindergarten_id,
          page: body.page
        }
      }),
    }),
  }),
})
