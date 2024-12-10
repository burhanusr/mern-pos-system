import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { loading } = useAuth();

  return (
    <>
      {loading ? (
        <div className="flex min-h-screen w-full items-center justify-center">
          Loading
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}
