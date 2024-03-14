import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase';
import { UserApiType } from '@/shared/types';

const VALIDATOR: string[] = ['Users']

export const usersApi = createApi({
    reducerPath: 'userApi',
    baseQuery: APIBaseQuery,
    tagTypes: VALIDATOR,

    endpoints: (builder) => ({
        getUsers: builder.query<any, string>({
            query: (query) => {
                return { url: `users/filters?${query}` }
            },
            providesTags: VALIDATOR
        }),
        getUsersForSelect: builder.query<any, void>({
            query: () => {
                return { url: `users` }
            },
            providesTags: VALIDATOR
        }),
        getUserById: builder.query<UserApiType, number>({
            query: (id: number) => {
                return {
                    url: `users/${id}`, params: ''
                }
            },
            providesTags: VALIDATOR
        }),
        updateUser: builder.mutation<any, any>({
            query: ({ id, data }) => {
                return {
                    url: `users/${id}`,
                    method: 'PUT',
                    data
                }
            },
            invalidatesTags: VALIDATOR
        }),
        createUser: builder.mutation<any, any>({
            query: (data) => {
                return {
                    url: `users`,
                    method: 'POST',
                    data
                }
            },
            invalidatesTags: VALIDATOR
        }),
        toggleStatus: builder.mutation<any, any>({
            query: ({ userId, status }) => {
                return {
                    url: `users/${userId}/status?newStatus=${status}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: VALIDATOR
        }),
        resetPassword: builder.mutation<any, any>({
            query: ({ userId, data }) => {
                return {
                    url: `users/${userId}/reset-password`,
                    method: 'PUT',
                    data
                }
            },
            invalidatesTags: VALIDATOR
        }),
        deleteUser: builder.mutation({
            query: (userId) => {
                return {
                    url: `users/${userId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: VALIDATOR,
        }),
        changePassword: builder.mutation({
            query: (data) => {
                return {
                    url: `users/change-password`,
                    method: 'PUT',
                    data
                }
            },
            invalidatesTags: VALIDATOR,
        }),
    }),

})

export const {
    useGetUsersQuery,
    useGetUsersForSelectQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useToggleStatusMutation,
    useResetPasswordMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useChangePasswordMutation
} = usersApi
