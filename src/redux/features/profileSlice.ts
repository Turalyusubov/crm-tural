import { MyProfileType } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: MyProfileType = {
    myProfile: null
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        myProfile: (state, action: PayloadAction<MyProfileType>) => {
            state.myProfile = action.payload.myProfile
        },
    },
})

export const { myProfile } = profileSlice.actions

export default profileSlice.reducer