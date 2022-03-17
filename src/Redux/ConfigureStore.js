import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import {AuthReducer} from "./Reducers/AuthSliceReducer";
import {projectReducer} from "./Reducers/ProjectSliceReducer";




export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        project: projectReducer
    }
    ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger)
})