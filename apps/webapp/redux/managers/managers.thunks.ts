import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchManagers = createAsyncThunk(
  "managers/fetchManagers",
  async () => {
    const response = fetch("/api/managers/", {
      method: "GET",
    });
    console.log({ response });
    return response;
  }
);
