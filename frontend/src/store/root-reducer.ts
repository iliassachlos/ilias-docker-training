import { combineReducers } from "@reduxjs/toolkit";
import { planetsApi } from "./apis/planet-api";
import { savedPlanetApi } from "./apis/saved-planet-api";
import uiReducer from "./slices/ui-slice";

export const apiReducers = {
  [planetsApi.reducerPath]: planetsApi.reducer,
  [savedPlanetApi.reducerPath]: savedPlanetApi.reducer,
};

export const sliceReducers = {
  ui: uiReducer,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...sliceReducers,
});
