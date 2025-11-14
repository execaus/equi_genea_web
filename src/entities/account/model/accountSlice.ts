import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
    token: string | null;
}

const savedToken = localStorage.getItem('token');

const initialState: AccountState = {
    token: savedToken || null,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setAccount, logout } = accountSlice.actions;
export default accountSlice.reducer;
