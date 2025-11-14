import {api} from "../../../app/store/api.ts";
import {IHorseGeneticMarker} from "../model/types.ts";

interface IGetHorseGeneticMarkerAllResponse {
    geneticMarkers: IHorseGeneticMarker[];
}

export const horseGeneticMarkerApi = api.injectEndpoints({
    endpoints: builder => ({
        getHorseGeneticMarkerAll: builder.query<IGetHorseGeneticMarkerAllResponse, void>({
            query: () => ({
                url: 'horse-genetic-marker',
                method: 'GET',
            }),
        }),
    }),
    overrideExisting: false,
})

export const { useGetHorseGeneticMarkerAllQuery } = horseGeneticMarkerApi;
