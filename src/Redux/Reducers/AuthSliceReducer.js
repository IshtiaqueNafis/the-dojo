import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {projectAuth, projectFireStore, projectStorage, timeStamp} from "../../firebase/config";


//region ***logInUserAsync({email,password})--->logs in user  ***
export const logInUserAsync = createAsyncThunk(
    'Auth/login',
    async ({email, password}, thunkApi) => {
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password);//res.email
            return {email: res.user.email, id: res.user.uid}


        } catch (e) {
            return thunkApi.rejectWithValue('You entered wrong credentials')
        }
    }
)
//endregion

//region *** logOutUserAsync(_) logs out user*** logs out user from
export const logOutUserAsync = createAsyncThunk(
    'Auth/Logout',
    async (_, thunkApi) => {
        try {
            const {user} = thunkApi.getState().auth;
            console.log({user});

            await projectAuth.signOut();
        } catch (e) {
            return thunkApi.rejectWithValue('something went wrong');
        }
    }
);
//endregion

//region ***registerUserAsync({password, email, displayName,thumbnail}) ---> Registers users  ***
export const registerUserAsync = createAsyncThunk(
    'Auth/Register',
    async ({values}, thunkApi) => {
        try {
            const {password, email, displayName, thumbnail} = values
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            if (!res) {
                return thunkApi.rejectWithValue('email is already taken');
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
            return thunkApi.rejectWithValue(e.message);
        }

    }
);
//endregion

export const AuthSlice = createSlice({
    name: "Auth/Register",
    initialState: {
        loading: null,
        user: null,
        error: null
    },
    reducers: {
        checkAuthIsReady: (state, {payload}) => {
            state.user = {email: payload.email, uid: payload.uid};
        }
    },
    extraReducers: {

        //region *** registerUserAsync ---> Register User ***
        [registerUserAsync]: (state) => {
            state.loading = true;
            state.error = null
        },
        [registerUserAsync.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.error = null
        },
        [registerUserAsync.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload;
        },
        //endregion


        //region ***logInUserAsync ---> logsInuser ***
        [logInUserAsync.pending]: (state) => {
            state.loading = true;
            state.error = null
        },
        [logInUserAsync.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.user = payload;
            state.error = null
        },
        [logInUserAsync.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload;
        },
        //endregion



        //region *** logsOutUser---> Register User ***
        [logOutUserAsync.pending]: (state) => {
            state.loading = true;
            state.error = null
        },
        [logOutUserAsync.fulfilled]: (state) => {
            state.loading = false
            state.user = null
        },
        [logOutUserAsync.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload;
        }
        //endregion


    }
})
export const {checkAuthIsReady} = AuthSlice.actions;
export const AuthReducer = AuthSlice.reducer;