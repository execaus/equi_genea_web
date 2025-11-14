import {api} from "../../../app/store/api.ts";
import type {IBreed} from "../../breed/model/breed.ts";

export interface IHorseCreateRequest {
    herd: string;
    gender: string;
    name: string;
    birthDay: number;
    birthMonth: number;
    birthYear: number;
    birthPlace: string;
    withersHeight: number;
    sire: string;
    dam: string;
    isPregnant: boolean;
    geneticMarkers: string[];
    colors: string[];
    breeds: IBreed[];
}

export interface IHorseCreateResponse {

}

export const horseApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createHorse: builder.mutation<IHorseCreateResponse, IHorseCreateRequest>({
            query: (credentials) => ({
                url: 'horse',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useCreateHorseMutation } = horseApi;