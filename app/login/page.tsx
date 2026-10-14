
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // Authenticate with Spring Boot
      await loginUser(email.trim(), password);

      // Redirect after successful login
      router.replace("/dashboard");
      router.refresh();

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col">

      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-bold text-blue-900"
          >
            mi<span className="text-blue-500">Tern</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-800"
          >
            ← Back to Home
          </Link>

        </div>
      </nav>

      {/* Login Form */}
      <section className="flex-1 flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10">

          <h1 className="text-2xl font-bold text-slate-900 text-center">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500 text-center text-sm">
            Sign in to your miTern account
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
              />
            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <span className="text-sm text-slate-400">
                  Forgot password? Coming soon
                </span>
              </div>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-20 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-700 hover:text-blue-900"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3"
              >
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Registration */}
          <div className="mt-8 text-center border-t border-slate-100 pt-6">

            <p className="text-sm text-slate-600">
              New to miTern?
            </p>

            <Link
              href="/register"
              className="inline-block mt-2 text-sm text-blue-700 font-semibold hover:text-blue-900"
            >
              Create an Account
            </Link>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-400">
        © 2026 miTern. All rights reserved.
      </footer>

    </main>
  );
}
