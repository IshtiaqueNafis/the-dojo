import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectFireStore, timeStamp} from "../../firebase/config";
import {listenToProjectsFromFireStore} from "../../firebase/fireStore/fireStoreService";

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


        } catch (e) {
            thunkApi.dispatch(projectOperationError(e.message));
        }


    }
)
//endregion

export const getAllProjectsAsync = createAsyncThunk(
    "projects/allProjects",
    async ({projects}, thunkApi) => {
        thunkApi.dispatch(projectOperationStart())
        try {
            if (projects === undefined) {
                thunkApi.dispatch(projectOperationError('no data'));
                return;
            }
            return projects;
        } catch (e) {
            thunkApi.dispatch(projectOperationError(e.message));
        }
    }
)

//region *** get single projects***
export const getSingleProjectAsync = createAsyncThunk(
    'project/singleProject',
    async ({project}, thunkApi) => {
        thunkApi.dispatch(projectOperationStart())
        try {
            if (project === undefined) {
                thunkApi.dispatch(projectOperationError('unknown document'));
            }
            return project;
        } catch (e) {
            thunkApi.dispatch(projectOperationError(e.message));
        }

    }
)
//endregion

export const updateProjectAsync = createAsyncThunk(
    'project/update',
    async ({id, key,value}, thunkApi) => {
        thunkApi.dispatch(projectOperationStart());
        try {



            const updatedData= await listenToProjectsFromFireStore().doc(id).update({[key]: value});
            // [key] makes it dynamic1


        } catch (e) {
            return thunkApi.dispatch(projectOperationError(e.message));
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
        [getAllProjectsAsync.fulfilled](state, {payload}) {
            state.loading = false;
            state.projects = [...payload];
            state.error = null
        },
        [getSingleProjectAsync.fulfilled](state, {payload}) {
            state.loading = false
            state.project = payload
            state.error = null
        },
        [updateProjectAsync.fulfilled](state, {payload}) {
            state.loading = false;
            state.error = null;
        }

    }
})

export const projectReducer = ProjectSliceReducer.reducer;
export const {projectOperationStart, projectOperationError} = ProjectSliceReducer.actions;