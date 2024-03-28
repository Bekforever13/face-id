import { GroupsApi } from './group/index.api'
import { HistoryApi } from './history/index.api'
import { OrganizationsApi } from './organizations/index.api'
import { UsersAPI } from './user/index.api'

export const {
  useGetAllOrganizationsQuery,
  useGetOneOrganizationQuery,
  useCreateOrganizationMutation,
  useDeleteOrganizationMutation,
  useEditOrganizationMutation,
} = OrganizationsApi

export const {
  useGetAllGroupsQuery,
  useGetOneGroupQuery,
  useCreateGroupMutation,
  useDeleteGroupMutation,
  useEditGroupMutation,
} = GroupsApi

export const {
  useGetAllUsersQuery,
  useGetOneUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = UsersAPI

export const {
  useGetAllHistoryQuery,
  useGetOneHistoryQuery,
  useGetOrganizationHistoryQuery,
  useGetOrganizationUnknownPersonQuery
} = HistoryApi
