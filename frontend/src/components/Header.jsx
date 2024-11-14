import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MenuTabs from "./MenuTabs";
import { buttonVariants } from "./ui/Button/buttonVariants";
import { logout } from "../api/authApi";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useAuthContext();

  const navigate = useNavigate();

  async function handleLogout() {
    try {
      // make api call to set cookies to loggedout
      await logout();
      // remove user key in local storage
      localStorage.removeItem("user");
      // dispatch logout action
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <header className="sticky top-0 z-10 w-full border-b border-slate-900/10 bg-white">
      <div className="mx-auto max-w-8xl">
        <div className="mx-4 flex items-center justify-between border-b border-slate-900/10 xl:mx-0 xl:border-0 xl:px-8">
          <Link className="font-bold lg:text-lg" to="/">
            POS API
          </Link>

          <div>
            {user ? (
              <div
                className="relative cursor-pointer py-2 text-sm"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <Link
                  to="/profile"
                  className={`flex items-center gap-1 rounded-md p-2 ${open ? "bg-slate-100" : "bg-transparent"} `}
                >
                  <img
                    className="size-8 rounded-full"
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61"
                    alt=""
                  />

                  <div className="hidden lg:block">{user?.name}</div>
                  <button className="size-6 text-slate-800 hover:text-slate-600 lg:hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M480-360 280-560h400L480-360Z" />
                    </svg>
                  </button>
                </Link>

                {open && (
                  <div className="absolute right-0 top-full w-40 rounded-md bg-white p-2 shadow ring-1 ring-slate-900/5 lg:left-0 lg:w-full lg:text-sm lg:leading-6">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block w-full rounded-md py-1.5 pl-4 hover:bg-slate-100"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <div
                          onClick={handleLogout}
                          className="block w-full rounded-md py-1.5 pl-4 hover:bg-slate-100"
                        >
                          Log Out
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2 py-3">
                <Link
                  to="/login"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  Login
                </Link>
                <Link to="/register" className={buttonVariants({ size: "sm" })}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
        <MenuTabs />
      </div>
    </header>
  );
}
