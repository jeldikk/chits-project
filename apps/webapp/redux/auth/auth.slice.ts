import { IAuthDetails } from "@/context/auth-details.context";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { signOut, type AuthUser } from "aws-amplify/auth";

export interface IAuthSliceState {
  authUser: AuthUser | null;
  isAdmin: boolean;
}

const initialState: IAuthSliceState = {
  authUser: null,
  isAdmin: false,
};

export const logOutUser = createAsyncThunk("auth/signout", async () => {
  const response = await signOut();
  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthDetails: (state, action: PayloadAction<IAuthSliceState>) => {
      state.authUser = action.payload.authUser;
      state.isAdmin = action.payload.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.pending, (state, action) => {})
      .addCase(logOutUser.fulfilled, (state, action) => {})
      .addCase(logOutUser.rejected, (state, action) => {});
  },
});

export const { setAuthDetails } = authSlice.actions;
export default authSlice.reducer;
