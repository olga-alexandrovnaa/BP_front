import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/serviceEntities/User';
import { USER_LOCALSTORAGE_KEY } from '@/sharedComponents/const/localstorage';
import { getEmailForService } from '../selectors/selectors';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    User,
    LoginByEmailProps,
    ThunkConfig<string>
>('login/loginByEmail', async (authData, thunkApi) => {
    const { dispatch, rejectWithValue, getState } = thunkApi;

    const currentEmail = getEmailForService(getState());

    try {
        // const formData = new URLSearchParams();
        // formData.append('email', authData.email);
        // formData.append('password', authData.password);

        // const response = await fetch(
        //     __API__ + 'login', 
        //     {
        //         credentials: 'include',
        //         method: "POST",
        //         body: formData
        //     }
        // );
        // const responseJSON = await response.json();

        // if (!responseJSON.result || responseJSON.result !== true ) {
        //     throw new Error();
        // }

        
        const responseJSON = {
            data: {
                id: '11111',
                username: authData.email,
            }
        }
        
        await dispatch(userActions.setAuthData(responseJSON.data));

        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(responseJSON.data));
        
        return responseJSON.data;
 
    } catch (e) {
        
        return rejectWithValue('error');
    }
});
