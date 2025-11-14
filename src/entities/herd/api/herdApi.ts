import {api} from "../../../app/store/api.ts";
import type {IHerdCard} from "../model/types.ts";

export interface IHerdCreateRequest {
    name: string,
    description: string,
}

export interface IHerdCreateResponse {
    id: string,
    name: string,
    description: string,
}

export interface IHerdGetAllRequest {
    page: number,
    limit: number,
    search: string,
}

export type IHerdGetAllResponse = {
    herds: IHerdCard[],
    totalCount: number,
};

export type IHerdGetByIdResponse = {
    herd: IHerdCard;
}

export const herdApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createHerd: builder.mutation<IHerdCreateResponse, IHerdCreateRequest>({
            query: (credentials) => {
                const body = {
                    ...credentials,
                    description: credentials.description?.trim() === '' ? null : credentials.description,
                };

                return {
                    url: 'herd',
                    method: 'POST',
                    body,
                };
            },
        }),
        getHerdAll: builder.query<IHerdGetAllResponse, IHerdGetAllRequest>({
            query: credentials => ({
                url: 'herd',
                method: 'GET',
                params: credentials,
            }),
        }),
        getHerdById: builder.query<IHerdGetByIdResponse, string>({
            query: (id) => ({
                url: `herd/${id}`,
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateHerdMutation, useGetHerdAllQuery, useGetHerdByIdQuery } = herdApi;