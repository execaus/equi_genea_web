import {api} from "../../../app/store/api.ts";
import type {IHorseColor} from "../model/types.ts";

interface IGetHorseColorAllResponse {
    colors: IHorseColor[];
}

export const horseColorApi = api.injectEndpoints({
    endpoints: builder => ({
        getHorseColorAll: builder.query<IGetHorseColorAllResponse, void>({
            query: () => ({
                url: 'horse-color',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetHorseColorAllQuery } = horseColorApi;