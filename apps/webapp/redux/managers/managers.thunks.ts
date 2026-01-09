import { delay } from "@/utils/delay";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchManagers = createAsyncThunk(
  "managers/fetchManagers",
  async () => {
    await delay(5000);
    const response = fetch("/api/managers/", {
      method: "GET",
    });
    console.log({ response });
    return response;
  }
);
