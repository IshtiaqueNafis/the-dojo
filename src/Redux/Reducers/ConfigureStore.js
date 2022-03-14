import {configureStore} from "@reduxjs/toolkit";
import {AuthReducer} from "./AuthSliceReducer";
import {logger} from "redux-logger/src";



export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    }
    ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
})