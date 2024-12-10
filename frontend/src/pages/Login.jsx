import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../api/authApi";
import Button from "./../components/ui/Button/Button";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [data, setData] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = data;

    try {
      const response = await login(email, password);
      const currentUser = response?.data;
      setAuth(currentUser);
      setData({ email: "", password: "" });
      toast.success("Login Successful, Welcome!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 md:px-8 md:py-8">
      <div className="rounded-md border bg-white p-8 shadow-lg">
        <header className="mb-8 text-center">
          <h1 className="text-lg font-bold">Login</h1>
          <div className="flex justify-center gap-1 text-sm">
            <p>Don&apos;t have an account yet?</p>
            <Link to="/register" className="text-sky-600 hover:text-sky-500">
              Register
            </Link>
          </div>
        </header>

        <form className="flex flex-col gap-4 md:w-80" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md border px-4 py-2 text-sm shadow"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={handleChange}
              value={data.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="email">
              Password
            </label>
            <input
              className="rounded-md border px-4 py-2 text-sm shadow"
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={data.password}
            />
          </div>
          <div className="mt-4 w-full">
            <Button type="submit" size="sm" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
