import {configureStore} from '@reduxjs/toolkit'
import {actionsApi} from './api'

export const store = configureStore({
    reducer: {[actionsApi.reducerPath]: actionsApi.reducer},
    middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(actionsApi.middleware)),
    devTools: true
})

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
