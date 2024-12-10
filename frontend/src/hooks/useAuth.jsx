import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
