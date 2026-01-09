"use client";
import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../redux/store";
import { IAuthSliceState, setAuthDetails } from "@/redux/auth/auth.slice";

interface Props {
  authDetails: IAuthSliceState;
  children: React.ReactNode;
}

export default function StoreProvider(props: Props) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setAuthDetails(props.authDetails));
  }

  return <Provider store={storeRef.current}>{props.children}</Provider>;
}
