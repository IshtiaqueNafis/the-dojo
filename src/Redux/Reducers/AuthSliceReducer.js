import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectAuth, projectFireStore, projectStorage, timeStamp} from "../../firebase/config";
import {dataFromSnapshot} from "../../firebase/fireStore/fireStoreService";



//region ***logInUserAsync({email,password})--->logs in user  ***
export const logInUserAsync = createAsyncThunk(
    'Auth/login',
    async ({email, password}, thunkApi) => {
        thunkApi.dispatch(authOperationStart())
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);//res.email

            thunkApi.dispatch(setUserDetailsAsync({id: res.user.uid}))


        } catch (e) {
            thunkApi.dispatch(authOperationsError(e.message));
        }
    }
)
//endregion

//region *** logOutUserAsync(_) logs out user*** logs out user from
export const logOutUserAsync = createAsyncThunk(
    'Auth/Logout',
    async (_, thunkApi) => {
        thunkApi.dispatch(authOperationStart());
        try {
            await projectAuth.signOut();
        } catch (e) {
            thunkApi.dispatch(authOperationsError(e.message));
        }
    }
);
//endregion

//region ***registerUserAsync({password, email, displayName,thumbnail}) ---> Registers users  ***
export const registerUserAsync = createAsyncThunk(
    'Auth/Register',
    async ({values}, thunkApi) => {


        thunkApi.dispatch(authOperationStart())
        try {
            const {password, email, displayName, thumbnail} = values
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) {
                thunkApi.dispatch(authOperationsError("email is already taken"));

            }

            const uploadPath = `Users/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail);
            const imgUrl = await img.ref.getDownloadURL();
            await projectFireStore.collection('Users').doc(res.user.uid).set({
                email,
                displayName,
                profilePic: imgUrl,
                accountCreated: timeStamp.fromDate(new Date())

            });
            await thunkApi.dispatch(logInUserAsync({email, password}))


        } catch (e) {
            thunkApi.dispatch(authOperationsError(e.message));

        }
    }
);
//endregion

//region *** setUserDetailsAsync(id) ** get users info in details
export const setUserDetailsAsync = createAsyncThunk(
    'auth/UserDetail',
    async ({id}, thunkApi) => {
        thunkApi.dispatch(authOperationStart())
        try {
            const res = await projectFireStore.collection('Users').doc(id).get().then(snapshot => dataFromSnapshot(snapshot));
            if (res === undefined) {
                thunkApi.rejectWithValue('user not found')
            }
            return res;
        } catch (e) {
            thunkApi.dispatch(authOperationsError(e.message));
        }

    }
)
//endregion

//region *** retrieveAllUsersAsync ***
export const retrieveAllUsersAsync = createAsyncThunk(
    'auth/allusers',
    async ({users}, thunkApi) => {
        thunkApi.dispatch(authOperationStart())
        try {
            if (users === undefined) {
                thunkApi.dispatch(authOperationsError('nothing found'));
                return;
            }
            return users
        } catch (e) {
            thunkApi.dispatch(authOperationsError(e.message));
        }
    }
)
//endregion

export const AuthSlice = createSlice({
    name: "Auth/Register",
    initialState: {
        loading: null,
        user: null,
        error: null,
        users: [],
    },
    reducers: {

        authOperationStart(state) {
            state.loading = true;
            state.error = null
        },
        authOperationsError(state, {payload}) {
            state.loading = false
            state.error = {payload}
        }


    },
    extraReducers: {

        //region *** registerUserAsync ---> Register User ***

        [registerUserAsync.fulfilled]: (state) => {
            state.loading = false
            state.error = null
        },

        //endregion

        //region ***logInUserAsync ---> logsInuser ***

        [logInUserAsync.fulfilled]: (state) => {
            state.loading = false
            state.error = null
        },

        //endregion

        //region *** logsOutUser---> Register User ***

        [logOutUserAsync.fulfilled]: (state) => {
            state.loading = false
            state.error = null;
        },

        //endregion

        //region ***set setUserDetailsAsync ****

        [setUserDetailsAsync.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.user = payload;
            state.error = null;
        },

        //endregion

        //region ***retrive all user Async***

        [retrieveAllUsersAsync.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.users = [...payload]
            state.error = null
        },

        //endregion

    }
})
export const {checkUserStatus, authOperationStart, authOperationsError} = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;