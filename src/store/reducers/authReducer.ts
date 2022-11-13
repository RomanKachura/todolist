import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {authApi, AuthResponseType} from '../../api/authApi';

export interface AuthReducerState {
    data: AuthResponseType
    isAuth: boolean
}

const initialState: AuthReducerState = {
    data: {} as AuthResponseType,
    isAuth: false
}

export const registrationThunk = createAsyncThunk('auth/registration', async (arg: { email: string, userName: string, password: string }, thunkAPI) => {
    try {
        const registration = await authApi.registration({...arg});
        thunkAPI.dispatch(registrationAction({...registration.data}));
        return {payload: registration.data}
    } catch (e) {
        throw e;
    }
});

export const loginThunk = createAsyncThunk('auth/login', async (arg: { email: string, password: string }, thunkAPI) => {
    const login = await authApi.login({...arg});
    try {
        console.log(login)
        thunkAPI.dispatch(loginAction({...login.data}));
        return {payload: login.data}
    } catch (e) {
        throw e;
    }
});

export const logoutThunk = createAsyncThunk('auth/logout', async (arg, thunkAPI) => {
    try {
        await authApi.logout();
        thunkAPI.dispatch(logoutAction(null));
        return null;
    } catch (e) {
        throw e;
    }
});

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registrationAction: (state, action) => {
            console.log(action.payload)
            state.data = action.payload;
            state.isAuth = true;
        },
        loginAction: (state, action) => {
            state.data = action.payload;
            state.isAuth = true;
        },
        logoutAction: (state, action) => {
            state.data = {} as AuthResponseType;
            state.isAuth = false;
        }
    }
});

export const {loginAction, logoutAction, registrationAction} = authReducer.actions;

export default authReducer.reducer;