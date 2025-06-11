'use client'

import Login from "../components/login/Login";
import Register from "../components/login/Register";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Login</h1>
        <Login />
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Register</h1>
        <Register />
      </div>
    </div>
  );
}
