import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase';

const VALIDATOR: string[] = ['Reports']

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: APIBaseQuery,
    tagTypes: VALIDATOR,
    endpoints: (builder) => ({
        getAllReports: builder.query<any, void>({
            query: (query) => { return { url: `api/report/admin/filtir?${query}` } },
            providesTags: VALIDATOR
        }),
        getEmployeeReports: builder.query<any, void>({
            query: (query) => { return { url: `api/report/user/reports?${query}` } },
            providesTags: VALIDATOR
        }),
        getReportById: builder.query<any, number>({
            query: (reportId) => { return { url: `api/report/${reportId}` } },
            providesTags: VALIDATOR
        }),
        updateReport: builder.mutation<any, any>({
            query: ({ id, data }) => {
                return {
                    url: `api/report/${id}`,
                    method: 'PUT',
                    data
                }
            },
            invalidatesTags: VALIDATOR
        }),
        createReport: builder.mutation<any, any>({
            query: (data) => ({
                url: `api/report/reports`,
                method: 'POST',
                data,
            }),
            invalidatesTags: VALIDATOR
        }),
    }),
})

export const {
    useGetAllReportsQuery,
    useGetEmployeeReportsQuery,
    useGetReportByIdQuery,
    useCreateReportMutation,
    useUpdateReportMutation
} = reportsApi