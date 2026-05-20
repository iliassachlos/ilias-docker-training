import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ViewOption = "grid" | "list";

type UiState = {
  planetView: ViewOption;
};

const initialState: UiState = {
  planetView: (localStorage.getItem("viewOption") as ViewOption) ?? "grid",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPlanetView(state, action: PayloadAction<ViewOption>) {
      state.planetView = action.payload;
      localStorage.setItem("viewOption", action.payload);
    },
  },
});

export const { setPlanetView } = uiSlice.actions;
export default uiSlice.reducer;
