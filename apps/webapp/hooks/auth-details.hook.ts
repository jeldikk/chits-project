import { useContext } from "react";
import { AuthDetailsContext } from "../context/auth-details.context";

export default function useAuthDetailsContext() {
  const context = useContext(AuthDetailsContext);
  if (!context) {
    throw new Error(
      "useAuthDetailsContext hook should be used within AuthDetailsContextProvider only"
    );
  }

  return context;
}
