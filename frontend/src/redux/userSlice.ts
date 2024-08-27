import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    name: string;
    email: string;
    access_token: string;
    type: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    access_token: '',
    type: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.access_token = action.payload.access_token;
            state.type = action.payload.type;
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = '';
            state.type = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export const isSignedIn = (state: { user: UserState }) => !!state?.user?.access_token;

export default userSlice.reducer;
