import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Planet } from "../../types/planet";

export const planetsApi = createApi({
  reducerPath: "planetsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.info/api" }),
  endpoints: () => ({}),
});

export const planetsEndpoints = planetsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlanets: builder.query<Planet[], void>({
      query: () => "/planets",
      keepUnusedDataFor: Infinity,
    }),
    getPlanet: builder.query<Planet, string>({
      query: (id) => `/planets/${id}`,
    }),
  }),
});

export const { useGetPlanetsQuery, useGetPlanetQuery } = planetsEndpoints;
