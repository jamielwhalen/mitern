
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  logoutUser,
} from "@/lib/api";

type CurrentUser = {
  email: string;
  roles: string[];
  authenticated: boolean;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();

        if (!active) return;

        if (!currentUser) {
          router.replace("/login");
          return;
        }

        setUser(currentUser);
      } catch {
        if (active) {
          setError("Unable to verify your session.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      await logoutUser();
      setUser(null);
      router.replace("/login");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  const username = user?.email.split("@")[0] ?? "";

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

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-800"
            >
              Home
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-sm font-semibold text-blue-800 hover:text-blue-600 disabled:opacity-50"
              >
                {loggingOut ? "Signing Out..." : "Sign Out"}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Dashboard */}
      <section className="flex-1 max-w-6xl w-full mx-auto px-6 py-16">

        {loading ? (
          <div className="text-center text-slate-500">
            Loading your dashboard...
          </div>
        ) : error && !user ? (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-5"
          >
            {error}
          </div>
        ) : user ? (
          <>
            {/* Welcome */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Welcome, {username}!
              </h1>

              <p className="mt-3 text-slate-500">
                Your miTern dashboard
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4"
              >
                {error}
              </div>
            )}

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                <div className="text-3xl mb-4">👤</div>

                <h2 className="text-lg font-bold text-slate-900">
                  My Profile
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  View and manage your account information.
                </p>

                <p className="text-sm font-medium text-blue-700 mt-5 break-all">
                  {user.email}
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                <div className="text-3xl mb-4">🎓</div>

                <h2 className="text-lg font-bold text-slate-900">
                  Internships
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Explore internship opportunities.
                </p>

                <p className="text-sm text-slate-400 mt-5">
                  Coming soon
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                <div className="text-3xl mb-4">📋</div>

                <h2 className="text-lg font-bold text-slate-900">
                  My Applications
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                  Track your internship applications.
                </p>

                <p className="text-sm text-slate-400 mt-5">
                  Coming soon
                </p>
              </div>

            </div>

            {/* Account Details */}
            <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

              <h2 className="text-lg font-bold text-slate-900 mb-5">
                Account Information
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Email Address
                  </p>
                  <p className="text-slate-900 mt-1">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Account Role
                  </p>
                  <p className="text-slate-900 mt-1">
                    {user.roles
                      .map((role) => role.replace("ROLE_", ""))
                      .join(", ")}
                  </p>
                </div>
              </div>

            </div>
          </>
        ) : null}

      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-400">
        © 2026 miTern. All rights reserved.
      </footer>
    </main>
  );
}
