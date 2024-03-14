import { configureStore } from '@reduxjs/toolkit'
import { Middlwares, Reducers } from './reducersAndMiddlewares'
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { teamsApi } from './api/teamsApi';
import { projectsApi } from './api/projectsApi';
import { usersApi } from './api/usersApi';
import { rolesApi } from './api/rolesApi';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        teamsApi.reducerPath,
        projectsApi.reducerPath,
        usersApi.reducerPath,
        rolesApi.reducerPath
    ]
}

const persistedReducer = persistReducer(persistConfig, Reducers);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(Middlwares),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
