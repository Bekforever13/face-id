import { IData } from '@/shared/types/Types'
import { api } from '../index.api'
import { IOrganizationData } from './index.types'

export const OrganizationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrganizations: builder.query<IData<IOrganizationData>, void>({
      query: () => ({
        url: '/kindergartens',
      }),
      providesTags: ['organizations'],
    }),
    getOneOrganization: builder.query<unknown, void | number>({
      query: () => ({
        url: '/kindergartens',
      }),
      providesTags: ['organizations'],
    }),
    createOrganization: builder.mutation<unknown, FormData>({
      query: (body) => ({
        url: '/kindergartens',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['organizations'],
    }),
    deleteOrganization: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/kindergartens/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['organizations'],
    }),
    editOrganization: builder.mutation<unknown, IOrganizationData>({
      query: ({ id, name, address }) => ({
        url: `/kindergartens/${id}`,
        method: 'PUT',
        body: { name, address },
      }),
      invalidatesTags: ['organizations'],
    }),
  }),
})
