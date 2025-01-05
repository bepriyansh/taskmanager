"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/lib/requests/auth";
import { setCookie } from "nookies";
import { LoginResponse } from "@/lib/interfaces";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response: LoginResponse = await login(
        formData.username,
        formData.password
      );

      if (response?.success) {
        console.log(response.data);
        // Store username, token in cookies
        setCookie(null, "token", response.data.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
        });
        setCookie(null, "username", response.data.username, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
        });
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center border shadow-md w-[80%] h-[90%] rounded-3xl">
        <div className="flex flex-col max-w-[360px] w-full p-4 gap-2">
          <p className="text-2xl py-4">Login</p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
            <Input
              className="w-full"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              className="w-full"
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button className="my-2" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p>
            Don&apos;t have an account?{" "}
            <b
              className="text-blue-600 cursor-pointer"
              onClick={() => router.push("/auth/register")}
            >
              Create
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
