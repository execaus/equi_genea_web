import {api} from "../../../app/store/api.ts";
import IHorse from "../model/horse.ts";

export interface IHorseCreateRequest {
    herd: string;
    gender: string | null;
    name: string | null;
    description: string | null;
    birthDay: number | null;
    birthMonth: number | null;
    birthYear: number | null;
    birthPlace: string | null;
    withersHeight: number | null;
    sire: string | null;
    dam: string | null;
    isPregnant: boolean;
    geneticMarkers: string[];
    color: string;
    breeds: IHorseBreed[];
}

interface IHorseBreed {
    id: string;
    percent: number;
}

export interface IHorseCreateResponse {
    horse: IHorse;
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