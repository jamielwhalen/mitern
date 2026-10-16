
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJobById } from "@/lib/api";

type Job = {
    id: number;
    title: string;
    description: string;
    location: string;
    workArrangement: "REMOTE" | "HYBRID" | "ONSITE";
    compensation: string | null;
    applicationDeadline: string | null;
    status: "DRAFT" | "PENDING" | "ACTIVE" | "CLOSED";
    createdBy: string;
    createdAt: string;
};

function getStatusColor(status: Job["status"]): string {
    switch (status) {
        case "ACTIVE":
            return "bg-green-100 text-green-700";
        case "PENDING":
            return "bg-orange-100 text-amber-700";
        case "CLOSED":
            return "bg-red-100 text-red-700";
        default:
            return "bg-slate-100 text-slate-600";
    }
}

function formatDate(value: string | null): string {
    if (!value) return "Not specified";

    const date = value.split("T")[0];
    const [year, month, day] = date.split("-").map(Number);

    if (!year || !month || !day) return value;

    return new Date(year, month - 1, day).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
    );
}

function Detail({
    label,
    value
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div>
            <dt className="text-sm font-medium text-slate-500">
                {label}
            </dt>
            <dd className="mt-1 text-sm text-slate-900">
                {value ?? "Not specified"}
            </dd>
        </div>
    );
}

export default function JobDetailsClient({
    jobId,
}: {
    jobId: number;
}) {

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadJob() {
            setLoading(true);
            setError("");
            setJob(null);

            if (!Number.isSafeInteger(jobId) || jobId <= 0) {
                setError("Invalid job ID.");
                setLoading(false);
                return;
            }

            try {
                const data: Job = await getJobById(jobId);
                setJob(data);
            } catch (err) {
                if (controller.signal.aborted) return;

                setError(
                    err instanceof Error
                        ? err.message
                        : "Something went wrong."
                );
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadJob();

        return () => controller.abort();
    }, [jobId]);

    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    ← Back to Dashboard
                </Link>

                {loading && (
                    <p className="mt-8 text-slate-500">
                        Loading job details...
                    </p>
                )}

                {!loading && error && (
                    <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
                        {error}
                    </div>
                )}

                {!loading && job && (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 px-8 py-7">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="mb-2 text-sm text-slate-500">
                                        Job Requisition #{job.id}
                                    </p>
                                    <h1 className="text-3xl font-bold text-slate-900">
                                        {job.title}
                                    </h1>
                                </div>

                                <span
                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(job.status)}`}
                                >
                                    {job.status}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-8 px-8 py-8">
                            <section>
                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                    Job Information
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <Detail
                                        label="Location"
                                        value={job.location}
                                    />
                                    <Detail
                                        label="Work Arrangement"
                                        value={job.workArrangement}
                                    />
                                    <Detail
                                        label="Compensation"
                                        value={job.compensation || "Not specified"}
                                    />
                                    <Detail
                                        label="Application Deadline"
                                        value={formatDate(job.applicationDeadline)}
                                    />
                                </dl>
                            </section>

                            <div className="border-t border-slate-200" />

                            <section>
                                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                                    Job Description
                                </h2>

                                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                                    {job.description}
                                </p>
                            </section>

                            <div className="border-t border-slate-200" />

                            <section>
                                <h2 className="mb-5 text-lg font-semibold text-slate-900">
                                    Requisition Details
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <Detail
                                        label="Created By"
                                        value={job.createdBy}
                                    />
                                    <Detail
                                        label="Date Created"
                                        value={formatDate(job.createdAt)}
                                    />
                                </dl>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
