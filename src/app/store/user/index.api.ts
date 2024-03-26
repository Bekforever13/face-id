import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IUserData, IUserFormData } from './index.types'

export const UsersAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IData<IUserData>, number | void>({
      query: (group_id) => ({
        url: `/children?image=1${group_id ? `&group_id=${group_id}` : ''}`,
      }),
      providesTags: ['users'],
    }),
    getOneUser: builder.query<unknown, number>({
      query: (id) => ({
        url: `/children/${id}`,
      }),
      providesTags: ['users'],
    }),
    createUser: builder.mutation<unknown, FormData>({
      query: (body) => ({
        url: '/children',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/children/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    editUser: builder.mutation<unknown, Omit<IUserFormData, 'images'>>({
      query: ({ id, first_name, group_id, last_name }) => ({
        url: `/children/${id}`,
        method: 'PUT',
        body: { first_name, group_id, last_name },
      }),
      invalidatesTags: ['users'],
    }),
  }),
})
