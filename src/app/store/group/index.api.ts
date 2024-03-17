import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IGroupData, IGroupFormData } from './index.types'

export const GroupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query<IData<IGroupData>, number | undefined>({
      query: (id) => ({
        url: `/groups${id !== 0 ? `?kindergarten_id=${id}` : ''}`,
      }),
      providesTags: ['groups'],
    }),
    getOneGroup: builder.query<unknown, number>({
      query: (id) => ({
        url: `/groups/${id}`,
      }),
      providesTags: ['groups'],
    }),
    createGroup: builder.mutation<unknown, Omit<IGroupFormData, 'id'>>({
      query: (body) => ({
        url: '/groups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['groups'],
    }),
    deleteGroup: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['groups'],
    }),
    editGroup: builder.mutation<unknown, IGroupFormData>({
      query: ({ id, name, kindergarten_id, model_camera }) => ({
        url: `/groups/${id}`,
        method: 'PUT',
        body: { name, kindergarten_id, model_camera },
      }),
      invalidatesTags: ['groups'],
    }),
  }),
})
