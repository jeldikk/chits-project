"use client";
import { AuthUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { IAuthSliceState, setAuthDetails } from "@/redux/auth/auth.slice";
import { useAppDispatch } from "@/redux/store";

export interface IAuthDetails {
  authUser: AuthUser | null;
  isAdmin: boolean;
}

export interface IAuthDetailsContext {
  signOut: () => void;
}

export const AuthDetailsContext = createContext<IAuthDetailsContext | null>({
  signOut: () => {},
});

interface Props {
  children: React.ReactNode;
  authDetails: IAuthSliceState;
}

export default function AuthDetailsContextProvider(props: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const hubSubs = Hub.listen("auth", ({ channel, payload }) => {
      const { event } = payload;
      switch (event) {
        case "signedIn":
          dispatch(
            setAuthDetails({
              authUser: payload.data,
              isAdmin: props.authDetails.isAdmin,
            })
          );
          router.push("/");
          break;
        case "signedOut":
          // do something when user signedOut
          dispatch(
            setAuthDetails({
              authUser: null,
              isAdmin: false,
            })
          );
          router.push("/auth/login");
          break;
      }
    });

    return () => {
      hubSubs();
    };
  }, []);
  return (
    <AuthDetailsContext.Provider value={{ signOut }}>
      {props.children}
    </AuthDetailsContext.Provider>
  );
}
