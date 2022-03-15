import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import {AuthReducer} from "./AuthSliceReducer";
import {asyncReducer} from "./asyncSliceReducer";


export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        async: asyncReducer,
    }
    ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
})