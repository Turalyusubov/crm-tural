import { ThemeState } from '@/shared/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ThemeState = {
    theme: 'light',
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        themeToggle: (state) => {
            state.theme = (state.theme === 'light' ? 'dark' : 'light')
        },
    },
})

export const { themeToggle } = themeSlice.actions

export default themeSlice.reducer