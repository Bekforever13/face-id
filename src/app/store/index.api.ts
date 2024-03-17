import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    // prepareHeaders: headers => {
    // 	const token = localStorage.getItem('token')
    // 	token && headers.set('Authorization', `Bearer ${token}`)
    // 	return headers
    // },
  }),
  refetchOnFocus: false,
  tagTypes: ['organizations', 'users', 'history', 'groups'],
  endpoints: (build) => ({
    default: build.query({
      query: () => 'default',
    }),
  }),
})
