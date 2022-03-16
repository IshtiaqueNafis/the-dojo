import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectFireStore, timeStamp} from "../../firebase/config";

//region ****addProjectsAsync()--->create project ****
export const addProjectsAsync = createAsyncThunk(
    'project/AddProject',
    async ({name, details, category, dueDate, assignUsers}, thunkApi) => {
        const createdBy = {
            displayName: thunkApi.getState().auth.user.displayName,
            photoUrl: thunkApi.getState().auth.user.profilePic,
            id: thunkApi.getState().auth.user.id
        };
        const assignedUsersList = assignUsers.map((user) => ({
            displayName: user.displayName,
            photoUrl: user.profilePic,
            id: user.id

        }));

        thunkApi.dispatch(projectOperationStart())
        try {
            await projectFireStore.collection('Projects').add({
                name,
                details,
                category,
                dueDate,
                createdBy,
                assignedUsersList,
                comments: [],
                createdAt: timeStamp.fromDate(new Date())
            })
            thunkApi.dispatch(projectOperationFinish())

        } catch (e) {
            thunkApi.dispatch(projectOperationError(e.message));
        }



    }
)
//endregion

export const getAllProjectsAsync = createAsyncThunk(
    "projects/allProjects",
    async ({projects},thunkApi)=>{
        thunkApi.dispatch(projectOperationStart())

        try {
            thunkApi.dispatch(projectOperationFinish());
            return projects;
        }catch (e) {
            thunkApi.dispatch(projectOperationError(e.message));
        }
    }
)

export const ProjectSliceReducer = createSlice({
    name: 'Project',
    initialState: {
        project: {},
        projects: [],
        loading: null,
        error: false,
    },
    reducers: {
        projectOperationStart(state) {
            state.loading = true;
            state.error = false;
        },
        projectOperationFinish(state) {
            state.loading = false
            state.error = false;
        },
        projectOperationError(state, {payload}) {
            state.loading = false;
            state.error = payload;
        }
    },
    extraReducers: {
        [addProjectsAsync.fulfilled](state) {
            state.loading = false;
            state.error = null;
        },
        [getAllProjectsAsync.fulfilled](state,{payload}){
            state.loading = false;
            state.projects = [...payload];
            state.error = null
        }
    }
})

export const projectReducer = ProjectSliceReducer.reducer;
export const {projectOperationStart, projectOperationFinish, projectOperationError} = ProjectSliceReducer.actions;