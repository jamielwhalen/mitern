
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule an Appointment | miTern",
  description:
    "Schedule an appointment with miTern to explore internship opportunities.",
};

export default function SchedulingPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full px-8 py-6">
        <Link
          href="/"
          className="text-blue-800 font-semibold hover:underline"
        >
          ← Back to miTern
        </Link>
      </header>

      <section className="flex-1 flex flex-col items-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center">
          Schedule with miTern
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-xl text-center">
          Your next opportunity starts with a conversation.
          Choose a convenient date and time below to connect
          with the miTern team.
        </p>

        <div className="w-full max-w-4xl mt-10 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <iframe
            src="https://miterny9m1.setmore.com"
            title="miTern Appointment Scheduling"
            className="w-full h-[750px] border-0"
            allow="payment"
          />
        </div>

        <p className="mt-6 text-sm text-slate-500 text-center">
          Having trouble with the calendar?{" "}
          <a
            href="https://miterny9m1.setmore.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            Open our booking page
          </a>
        </p>
      </section>

      <footer className="py-6 text-center text-sm text-slate-400">
        © 2026 miTern. All rights reserved.
      </footer>
    </main>
  );
}
