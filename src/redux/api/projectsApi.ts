import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase';
import { ProjectType } from '@/shared/types';

const VALIDATOR: string[] = ['Projects']

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: APIBaseQuery,
    tagTypes: VALIDATOR,
    endpoints: (builder) => ({
        getProjects: builder.query<any, void>({
            query: (query) => { return { url: `api/project/search?${query}` } },
            providesTags: VALIDATOR
        }),
        getEmployeeProjects: builder.query<any, void>({
            query: () => { return { url: `api/project` } },
            providesTags: VALIDATOR
        }),
        getProjectById: builder.query<ProjectType, number>({
            query: (projectId) => { return { url: `api/project/${projectId}` } },
            providesTags: VALIDATOR
        }),
        updateProject: builder.mutation<any, any>({
            query: ({ id, data }) => {
                let userIdsToAddQuery = '';
                for (const userId of data.userIds) {
                    userIdsToAddQuery += `&userIdsToAdd=${userId}`;
                }
                return {
                    url: `api/project/${id}?${userIdsToAddQuery}`,
                    method: 'PUT',
                    data: { projectName: data.projectName }
                }
            },
            invalidatesTags: VALIDATOR
        }),
        createProject: builder.mutation<any, any>({
            query: (data) => ({
                url: `api/project`,
                method: 'POST',
                data,
            }),
            invalidatesTags: VALIDATOR
        }),
        deleteProject: builder.mutation({
            query: (projectId) => ({
                url: `project/${projectId}`,
                method: 'DELETE',
            }),
            invalidatesTags: VALIDATOR,
        }),
    }),
})

export const {
    useGetProjectsQuery,
    useGetEmployeeProjectsQuery,
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useGetProjectByIdQuery,
    useUpdateProjectMutation
} = projectsApi