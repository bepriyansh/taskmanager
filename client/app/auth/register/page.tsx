"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
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
      const response = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response?.error) {
        setError("Invalid credentials. Please try again.");
      } else if (response?.ok) {
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="flex justify-center items-center border shadow-md w-[80%] h-[90%] rounded-3xl">
        <div className="flex flex-col max-w-[360px] w-full p-4 gap-2">
          <p className="text-2xl py-4">Sign Up</p>
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
              placeholder="Email"
              name="email"
              value={formData.email}
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
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
          <p>
            Already have an account?{" "}
            <b
              className="text-blue-600 cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
