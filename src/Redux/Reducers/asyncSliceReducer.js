import {createSlice} from "@reduxjs/toolkit";


export const asyncSliceReducer = createSlice({
    name: "async",
    initialState: {
        loading: false,
        error: null,
    }, reducers: {
        asyncActionStart(state) {
            state.loading = true;
            state.error = false;
        },
        asyncActionFinish(state) {
            state.loading = false;
            state.error = false;
        },
        asyncActionError(state,{payload}) {
            state.loading = false;
            state.error = payload;
        }
    }
})
export const asyncReducer = asyncSliceReducer.reducer;
export const {asyncActionStart, asyncActionFinish, asyncActionError} = asyncSliceReducer.actions;