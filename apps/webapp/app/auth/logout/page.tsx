"use client";

import { useEffect } from "react";
import useAuthDetailsContext from "@/hooks/auth-details.hook";
import { logOutUser } from "@/redux/auth/auth.slice";
import { useAppDispatch } from "@/redux/store";

export const dynamic = "force-dynamic";

export default function LogoutPage() {
  // const authContext = useAuthDetailsContext();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logOutUser());
  }, []);

  return <></>;
}
