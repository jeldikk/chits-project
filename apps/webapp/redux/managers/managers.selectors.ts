import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectManagersState = (state: RootState) => state.managers;

export const selectManagersList = createSelector(
  selectManagersState,
  (managers) => managers.managers
);

export const selectManagersLoading = createSelector(
  selectManagersState,
  (managers) => managers.isLoading
);
