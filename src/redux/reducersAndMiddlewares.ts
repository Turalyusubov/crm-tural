import themeReducer from './features/themeSlice'
import modalReducer from './features/modalSlice'
import authReducer from './features/authSlice'
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import { usersApi } from "./api/usersApi";
import { authApi } from "./api/authApi";
import profileReducer from "./features/profileSlice";
import { teamsApi } from "./api/teamsApi";
import { projectsApi } from "./api/projectsApi";
import { rolesApi } from "./api/rolesApi";
import { reportsApi } from "./api/reportsApi";

const Middlwares = [
    usersApi.middleware,
    authApi.middleware,
    teamsApi.middleware,
    projectsApi.middleware,
    rolesApi.middleware,
    reportsApi.middleware
]

const Reducers = combineReducers({
    theme: themeReducer,
    modal: modalReducer,
    auth: authReducer,
    login: loginReducer,
    profile: profileReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer
})

export { Middlwares, Reducers }