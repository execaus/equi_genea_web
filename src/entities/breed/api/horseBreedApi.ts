import {api} from "../../../app/store/api.ts";
import {IHorseBreed} from "../model/types.ts";

interface IGetHorseBreedAllResponse {
    breeds: IHorseBreed[];
}

export const horseBreedApi = api.injectEndpoints({
    endpoints: builder => ({
        getHorseBreedAll: builder.query<IGetHorseBreedAllResponse, void>({
            query: () => ({
                url: 'horse-breed',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetHorseBreedAllQuery } = horseBreedApi;