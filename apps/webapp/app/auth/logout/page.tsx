"use client";

import { useEffect } from "react";
import useAuthDetailsContext from "@/hooks/auth-details.hook";

export default function LogoutPage() {
  const authContext = useAuthDetailsContext();
  useEffect(() => {
    authContext.signOut();
  }, []);

  return <></>;
}
