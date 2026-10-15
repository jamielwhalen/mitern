
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createJob, getCurrentUser } from "@/lib/api";

type WorkArrangement = "REMOTE" | "HYBRID" | "ONSITE";
type JobStatus = "DRAFT" | "ACTIVE";

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [workArrangement, setWorkArrangement] =
    useState<WorkArrangement>("ONSITE");
  const [compensation, setCompensation] = useState("");
  const [applicationDeadline, setApplicationDeadline] =
    useState("");

  const [status, setStatus] = useState<JobStatus>("DRAFT");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      try {
        const user = await getCurrentUser();

        if (!active) return;

        if (!user) {
          router.replace("/login");
          return;
        }

        if (!user.roles.includes("ROLE_BUSINESS")) {
          router.replace("/dashboard");
          return;
        }

        setCheckingAuth(false);
      } catch {
        if (active) {
          setError("Unable to verify your account.");
          setCheckingAuth(false);
        }
      }
    }

    checkAccess();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createJob({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        workArrangement,
        compensation: compensation.trim() || null,
        applicationDeadline: applicationDeadline || null,
        status,
      });

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create job listing."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 " +
    "text-slate-900 outline-none focus:border-blue-500 " +
    "focus:ring-2 focus:ring-blue-100 transition";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">

      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-900"
          >
            mi<span className="text-blue-500">Tern</span>
          </Link>

          <Link
            href="/dashboard"
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-12">

        {/* Page Header */}
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="text-sm text-blue-700 hover:underline"
          >
            ← Dashboard
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-5">
            Create Job Listing
          </h1>

          <p className="text-slate-500 mt-3">
            Create an internship opportunity for students
            on miTern.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 md:p-10 space-y-8">

            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Job Information
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Provide the details of your opportunity.
              </p>
            </div>

            {/* Job Title */}
            <div>
              <label htmlFor="title" className={labelClass}>
                Job Title *
              </label>
              <input
                id="title"
                type="text"
                required
                maxLength={255}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineering Intern"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className={labelClass}>
                Job Description *
              </label>
              <textarea
                id="description"
                required
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the internship, responsibilities, qualifications, and learning opportunities..."
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-2">
                Include responsibilities, preferred skills,
                and what students can expect to learn.
              </p>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className={labelClass}>
                Location *
              </label>
              <input
                id="location"
                type="text"
                required
                maxLength={255}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. St. Louis, MO"
                className={inputClass}
              />
            </div>

            {/* Work Arrangement */}
            <div>
              <label
                htmlFor="workArrangement"
                className={labelClass}
              >
                Work Arrangement *
              </label>
              <select
                id="workArrangement"
                value={workArrangement}
                onChange={(e) =>
                  setWorkArrangement(
                    e.target.value as WorkArrangement
                  )
                }
                className={inputClass}
              >
                <option value="ONSITE">On-site</option>
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>

            {/* Compensation */}
            <div>
              <label
                htmlFor="compensation"
                className={labelClass}
              >
                Compensation
              </label>
              <input
                id="compensation"
                type="text"
                maxLength={255}
                value={compensation}
                onChange={(e) =>
                  setCompensation(e.target.value)
                }
                placeholder="e.g. $20/hour or Unpaid"
                className={inputClass}
              />
            </div>

            {/* Application Deadline */}
            <div>
              <label
                htmlFor="applicationDeadline"
                className={labelClass}
              >
                Application Deadline
              </label>
              <input
                id="applicationDeadline"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={applicationDeadline}
                onChange={(e) =>
                  setApplicationDeadline(e.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className={labelClass}>
                Listing Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as JobStatus)
                }
                className={inputClass}
              >
                <option value="DRAFT">
                  Draft — Not visible to students
                </option>
                <option value="ACTIVE">
                  Active — Publish listing
                </option>
              </select>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-8">

            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold text-center hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50 transition"
            >
              {loading
                ? "Saving..."
                : status === "ACTIVE"
                ? "Publish Job"
                : "Save Draft"}
            </button>

          </div>
        </form>
      </section>

      <footer className="py-8 text-center text-sm text-slate-400">
        © 2026 miTern. All rights reserved.
      </footer>
    </main>
  );
}
