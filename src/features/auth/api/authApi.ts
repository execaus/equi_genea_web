import {api} from "../../../app/store/api.ts";

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
}

export interface SignUpRequest {
    email: string;
}

export interface SignUpResponse {
    token: string;
}

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation<SignInResponse, SignInRequest>({
            query: (credentials) => ({
                url: 'auth/sign-in',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.mutation<SignUpResponse, SignUpRequest>({
            query: (credentials) => ({
               url: 'auth/sign-up',
               method: 'POST',
               body: credentials,
            }),
        })
    }),
    overrideExisting: false,
});

export const { useSignInMutation, useSignUpMutation } = authApi;