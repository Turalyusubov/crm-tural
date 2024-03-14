import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { message } from 'antd'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
const baseURL = `${import.meta.env.VITE_BASE_URL}`
export const axiosBaseQuery =
    ({ baseURL = '', headers }: { baseURL: string, headers: any }): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
        },
        unknown,
        unknown> =>
        async ({ url, params, method, data, responseType }, { signal, getState }) => {
            try {
                const result = await axios({
                    url: baseURL + url,
                    method: method ? method : 'GET',
                    ...(params && { params: params }),
                    ...(headers && { headers: headers({}, { getState, signal }) }),
                    ...(data && { data: data }),
                    responseType: responseType ? responseType : 'json',
                })
                return {
                    data: result.data,
                }
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: { status: err.response?.status, data: err.response?.data },
                }
            }
        }
export const APIBaseQueryInterceptor = axiosBaseQuery({
    baseURL: baseURL,
    headers: (headers: AxiosRequestConfig['headers'], { getState }) => {
        const { auth } = getState()
        if (auth?.access_token) {
            headers['Authorization'] = `Bearer ${auth?.access_token}`
        }
        return headers
    },
})
export const APIBaseQuery = async (args, api, extraOptions) => {
    let result = await APIBaseQueryInterceptor(args, api, extraOptions)
    if (result.error && result.error.data.message.length > 0) {
        message.open({
            type: 'error',
            content: `${result.error.data.message}`,
        });
    }
    return result
}








