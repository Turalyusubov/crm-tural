import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase';
import { setAuthState } from '../features/authSlice';
import { myProfile } from '../features/profileSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: APIBaseQuery,
    tagTypes: ['AuthApi'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: `api/v1/auth/login`,
                method: 'POST',
                data,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAuthState(data))
                    dispatch(authApi.endpoints.getProfile.initiate(undefined, { forceRefetch: true }))
                    // console.log('loginUser isledi');
                } catch (err) {
                    // `onError` side-effect
                    //   dispatch(messageCreated('Error fetching post!'))
                    console.log('loginUser islemedi');

                }
            },
        }),
        getProfile: builder.query<any, void>({
            query: () => ({ url: `users/profile` }),
            providesTags: ['AuthApi'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(myProfile({ myProfile: data }))
                    // console.log('getprofile isledi');

                } catch (err) {
                    // `onError` side-effect
                    //   dispatch(messageCreated('Error fetching post!'))
                    // console.log('getprofile islemedi');

                }
            },
        }),
    }),
})

export const {
    useLoginUserMutation,
    useGetProfileQuery
} = authApi
