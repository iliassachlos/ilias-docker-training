import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuid } from "uuid";
import type { Planet, SavedPlanet } from "../../types/planet";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_SERVER_URL;

export const savedPlanetApi = createApi({
  reducerPath: "savedPlanetApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["SavedPlanet"],
  endpoints: () => ({}),
});

export const savedPlanetEndpoints = savedPlanetApi.injectEndpoints({
  endpoints: (builder) => ({
    getSavedPlanets: builder.query<SavedPlanet[], void>({
      query: () => "/planets",
      providesTags: (result) =>
        result
          ? [
              ...result.map((planet) => ({ type: "SavedPlanet" as const, id: planet.id })),
              { type: "SavedPlanet" as const, id: "LIST" },
            ]
          : [{ type: "SavedPlanet" as const, id: "LIST" }],
    }),

    savePlanet: builder.mutation<SavedPlanet, Planet>({
      query: (planet) => ({
        url: "/planets",
        method: "POST",
        body: { id: uuid(), ...planet },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Planet saved successfully");
        } catch (error) {
          const message = error instanceof Error ? error.message : "Failed to save planet";
          toast.error(message);
        }
      },
      invalidatesTags: [{ type: "SavedPlanet" as const, id: "LIST" }],
    }),

    deletePlanet: builder.mutation<void, string>({
      query: (id) => ({
        url: `/planets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "SavedPlanet", id },
        { type: "SavedPlanet" as const, id: "LIST" },
      ],
    }),
  }),
});

export const { useGetSavedPlanetsQuery, useSavePlanetMutation, useDeletePlanetMutation } =
  savedPlanetEndpoints;
