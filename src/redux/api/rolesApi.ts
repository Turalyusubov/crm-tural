import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase';
import { RoleType } from '@/shared/types';

const VALIDATOR: string[] = ['Users']

export const rolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: APIBaseQuery,
    tagTypes: VALIDATOR,

    endpoints: (builder) => ({
        getRoles: builder.query<RoleType[], void>({
            query: () => {
                return { url: `api/roles` }
            },
            providesTags: VALIDATOR
        }),
    }),

})

export const {
    useGetRolesQuery,
} = rolesApi
