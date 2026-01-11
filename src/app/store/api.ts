import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from './store.ts';
import {logout} from "../../entities/account/model/accountSlice.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).account.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        headers.set('Origin', window.location.origin);

        return headers;
    },
});

const baseQueryWithErrorHandling: typeof baseQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        const status = result.error.status;
        if (status === 401) {
            api.dispatch(logout());
            window.location.href = '/auth';
        }

        if (status === 500) {
            console.error('Ошибка сервера, попробуйте позже');
        }
    }

    return result;
};

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: () => ({}),
});
