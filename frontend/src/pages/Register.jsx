import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { register } from "../api/authApi";
import Button from "./../components/ui/Button/Button";

export default function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, password, passwordConfirm } = data;

    try {
      // make api call
      await register(name, email, password, passwordConfirm);
      // empty form
      setData({ name: "", email: "", password: "", passwordConfirm: "" });
      // send success message
      toast.success("Successfully Registered, Please Login Again!");
      // navigate to login page
      navigate("/login");
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
          <h1 className="text-lg font-bold">Register</h1>
          <div className="flex justify-center gap-1 text-sm">
            <p>Already have an account?</p>
            <Link to="/login" className="text-sky-600 hover:text-sky-500">
              Login
            </Link>
          </div>
        </header>

        <form className="flex flex-col gap-4 md:w-80" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="username">
              Name
            </label>
            <input
              className="rounded-md border px-4 py-2 text-sm shadow"
              type="text"
              name="name"
              id="username"
              autoComplete="off"
              onChange={handleChange}
              value={data.name}
            />
          </div>
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
            <label className="text-sm font-semibold" htmlFor="password">
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" htmlFor="passConfirm">
              Password Confirm
            </label>
            <input
              className="rounded-md border px-4 py-2 text-sm shadow"
              type="password"
              name="passwordConfirm"
              id="passConfirm"
              onChange={handleChange}
              value={data.passwordConfirm}
            />
          </div>
          <div className="mt-4 w-full">
            <Button type="submit" size="sm" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
