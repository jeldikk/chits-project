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
  // authDetails: IAuthDetails;
  signOut: () => void;
}

export const AuthDetailsContext = createContext<IAuthDetailsContext | null>({
  // authDetails: {
  //   isAdmin: false,
  //   authUser: null,
  // },
  signOut: () => {},
});

interface Props {
  children: React.ReactNode;
  authDetails: IAuthSliceState;
}

export default function AuthDetailsContextProvider(props: Props) {
  const router = useRouter();
  // const [authDetails, setAuthDetails] = useState<IAuthDetails>(
  //   props.authDetails
  // );
  console.log({ authDetails: props.authDetails });
  const dispatch = useAppDispatch();
  useEffect(() => {
    const hubSubs = Hub.listen("auth", ({ channel, payload }) => {
      const { event } = payload;
      switch (event) {
        case "signedIn":
          // do something when user is signedIn
          console.log("user signed in");
          // setAuthDetails({
          //   authUser: payload.data,
          //   isAdmin: authDetails.isAdmin,
          // });
          dispatch(
            setAuthDetails({
              authUser: payload.data,
              isAdmin: props.authDetails.isAdmin,
            })
          );
          console.log("before redirecting to root route");
          router.push("/");
          break;
        case "signedOut":
          // do something when user signedOut
          console.log("user signed out");
          // setAuthDetails({
          //   isAdmin: false,
          //   authUser: null,
          // });
          dispatch(
            setAuthDetails({
              authUser: null,
              isAdmin: false,
            })
          );
          console.log("before redirecting to login route");
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
