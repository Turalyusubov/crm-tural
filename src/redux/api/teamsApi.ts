import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase';
import { TeamType, TeamsApiResponce } from '@/shared/types';

const VALIDATOR: string[] = ['Teams']

export const teamsApi = createApi({
    reducerPath: 'teamsApi',
    baseQuery: APIBaseQuery,
    tagTypes: VALIDATOR,
    endpoints: (builder) => ({
        getTeams: builder.query<TeamType[], void>({
            query: () => {
                return { url: `api/teams` }
            },
            providesTags: VALIDATOR
        }),
        getTeamById: builder.query<TeamType, number>({
            query: (teamId) => {
                return { url: `api/teams/${teamId}`, params: '' }
            },
            providesTags: VALIDATOR
        }),
        updateTeam: builder.mutation<TeamsApiResponce, any>({
            query: ({ id, data }) => {
                let userIdsToAddQuery = '';
                for (const userId of data.employees) {
                    userIdsToAddQuery += `&userIdsToAdd=${userId}`;
                }
                return {
                    url: `api/teams/${id}?${userIdsToAddQuery}`,
                    method: 'PUT',
                    data: { teamName: data.teamName }
                }
            },
            invalidatesTags: VALIDATOR
        }),
        createTeam: builder.mutation<TeamType, { teamName: string }>({
            query: (data) => ({
                url: `api/teams`,
                method: 'POST',
                data,
            }),
            invalidatesTags: VALIDATOR
        }),
        deleteTeam: builder.mutation({
            query: (teamId) => {
                return {
                    url: `api/teams/${teamId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: VALIDATOR,
        }),
    }),
})

export const {
    useGetTeamsQuery,
    useCreateTeamMutation,
    useDeleteTeamMutation,
    useGetTeamByIdQuery,
    useUpdateTeamMutation
} = teamsApi