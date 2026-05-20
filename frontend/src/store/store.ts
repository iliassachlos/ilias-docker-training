import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./root-reducer";
import { planetsApi } from "./apis/planet-api";
import { savedPlanetApi } from "./apis/saved-planet-api";

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const str = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(planetsApi.middleware, savedPlanetApi.middleware),
    preloadedState,
  });

  setupListeners(str.dispatch);

  return str;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
