import {api} from "../../../app/store/api.ts";
import type {IHorseBirthplace} from "../model/types.ts";

interface IGetHorseBirthplaceAllResponse {
    birthplaces: IHorseBirthplace[];
}

export const horseBirthplaceApi = api.injectEndpoints({
    endpoints: builder => ({
        getHorseBirthplaceAll: builder.query<IGetHorseBirthplaceAllResponse, void>({
            query: () => ({
                url: 'horse-birthplace',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetHorseBirthplaceAllQuery } = horseBirthplaceApi;