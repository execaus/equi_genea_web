import {api} from "../../../app/store/api.ts";
import type {IHorseGender} from "../model/types.ts";

interface IGetHorseGenderAllResponse {
    genders: IHorseGender[];
}

export const horseGenderApi = api.injectEndpoints({
    endpoints: builder => ({
        getHorseGenderAll: builder.query<IGetHorseGenderAllResponse, void>({
            query: () => ({
                url: 'horse-gender',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetHorseGenderAllQuery } = horseGenderApi;