import { Navigate } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  return user ? children : <Navigate to={"/login"} />;
}
