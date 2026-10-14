
"use client";

import { useState } from "react";
import Link from "next/link";
import { registerUser } from "@/lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (password.length < 12) {
      setMessage("Password must be at least 12 characters.");
      return;
    }

    setLoading(true);

    try {
      const result = await registerUser(email, password);

      setSuccess(true);
      setMessage(
        result.message || "Your account was created successfully!"
      );

      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-blue-600">
              miTern
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="/login"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-md">

          {/* BRANDING */}
          <div className="text-center mb-8">
            {/* <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-2">
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 53V30C10 17.85 19.85 8 32 8C44.15 8 54 17.85 54 30V53"
                    stroke="#2563EB"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M23 53V30C23 25.03 27.03 21 32 21C36.97 21 41 25.03 41 30V53"
                    stroke="#93C5FD"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="text-4xl font-bold tracking-tight text-blue-600">
                  miTern
                </span>
              </div>
            </Link> */}

            <p className="mt-3 text-slate-500 text-sm">
              Your gateway to your future internship.
            </p>
          </div>

          {/* REGISTRATION CARD */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 sm:p-10">

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900">
                Create Your Account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Join miTern and start exploring opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={12}
                    maxLength={128}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-16 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Use at least 12 characters.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={12}
                  maxLength={128}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* ERROR / SUCCESS MESSAGE */}
              {message && (
                <div
                  role="status"
                  className={`rounded-lg px-4 py-3 text-sm border ${
                    success
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* SIGN IN */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* BELOW CARD */}
          <p className="text-center text-xs text-slate-400 mt-6">
            By creating an account, you agree to the miTern
            Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <p className="text-center text-xs text-slate-400">
          © 2026 miTern. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
