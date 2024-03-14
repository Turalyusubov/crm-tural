import { ModalState } from '@/shared/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ModalState = {
    objectId: 0
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        objectForModal: (state, action: PayloadAction<number>) => {
            state.objectId = action.payload
        }
    },
})

export const { objectForModal } = modalSlice.actions

export default modalSlice.reducer