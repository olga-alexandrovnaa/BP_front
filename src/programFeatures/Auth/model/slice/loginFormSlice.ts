/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginSchema } from '../types/loginSchema';
import { loginByEmail } from '../services/loginByEmail';

const initialState: LoginSchema = {
  password: '',
  email: '',
  isLoading: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginByEmail.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
    })
    .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false;
    })
    .addCase(loginByEmail.rejected, (state, action: any) => {
        state.isLoading = false;
        state.error = action.payload;
    });

  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
