import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../api/authApi";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "./../components/ui/Button/Button";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = data;
    setIsLoading(true);

    try {
      // make api call and get api response
      const user = await login(email, password);
      // save login token to local storage
      localStorage.setItem("user", JSON.stringify(user.data));
      // update the auth context
      dispatch({ type: "LOGIN", payload: user.data });
      // empty form
      setData({ email: "", password: "" });
      // send success message
      toast.success("Login Successful, Welcome!");
      // navigate to home page
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      const message = err.response.data.message.split(",");
      message.map((msg) => toast.error(msg));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="flex h-screen items-center justify-center px-4 sm:px-6 md:px-8 md:py-8">
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
            <Button
              type="submit"
              disabled={isLoading}
              size="sm"
              className="w-full"
            >
              {isLoading ? "Login..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
