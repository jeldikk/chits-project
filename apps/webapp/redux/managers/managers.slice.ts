import { Schema } from "@/data-schema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchManagers } from "./managers.thunks";
type ManagerType = Schema["Manager"]["type"];

interface IManagerSliceState {
  managers: ManagerType[];
  isLoading: boolean;
}

const initialState: IManagerSliceState = {
  managers: [],
  isLoading: false,
};

const managersSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {
    setManagers: (state, action: PayloadAction<ManagerType[]>) => {
      state.managers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManagers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchManagers.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchManagers.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setManagers } = managersSlice.actions;
export default managersSlice.reducer;
