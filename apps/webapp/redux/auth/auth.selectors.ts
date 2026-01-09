import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectAuthState = (state: RootState) => state.auth;
export const selectAuthDetails = createSelector(
  selectAuthState,
  (auth) => auth.authUser
);

export const selectIsAdmin = createSelector(
  selectAuthState,
  (auth) => auth.isAdmin
);
