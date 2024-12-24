import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosConfig';

// Асинхронный thunk для авторизации пользователя
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ login, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/account/login', { login, password });
            return response.data;
        } catch (error) {
            // Возвращаем сообщение об ошибке из ответа сервера
            return rejectWithValue(error.response?.data || 'Ошибка авторизации');
        }
    }
);

// Асинхронный thunk для получения информации о пользователе
export const fetchUserInfo = createAsyncThunk(
    'auth/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/account/info');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ошибка получения информации о пользователе');
        }
    }
);

// Асинхронный thunk для получения лимитов пользователя
export const fetchLimits = createAsyncThunk(
    'auth/fetchLimits',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/account/limits');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Ошибка получения лимитов');
        }
    }
);

const initialState = {
    token: localStorage.getItem('accessToken') || null,
    expire: localStorage.getItem('expire') || null,
    userInfo: null,
    limits: null,
    loading: false,
    loadingLimits: false,
    error: null,
    errorLimits: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.expire = null;
            state.userInfo = null;
            state.limits = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('expire');
        },
    },
    extraReducers: (builder) => {
        builder
            // Обработка loginUser
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.accessToken;
                state.expire = action.payload.expire;
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('expire', action.payload.expire);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка авторизации';
            })
            // Обработка fetchUserInfo
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Ошибка получения информации о пользователе';
                state.token = null;
                state.expire = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expire');
            })
            // Обработка fetchLimits
            .addCase(fetchLimits.pending, (state) => {
                state.loadingLimits = true;
                state.errorLimits = null;
            })
            .addCase(fetchLimits.fulfilled, (state, action) => {
                state.loadingLimits = false;
                state.limits = action.payload;
            })
            .addCase(fetchLimits.rejected, (state, action) => {
                state.loadingLimits = false;
                state.errorLimits = action.payload || 'Ошибка получения лимитов';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
