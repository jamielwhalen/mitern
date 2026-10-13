
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | miTern",
  description:
    "Learn about miTern and our mission to connect students with meaningful internship opportunities.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col">

      {/* Navigation */}
      <nav className="w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 min-h-20 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-900"
          >
            mi<span className="text-blue-500">Tern</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            <Link href="/" className="text-slate-600 hover:text-blue-800 font-medium">
              Home
            </Link>

            <Link href="/about" className="text-blue-800 font-semibold">
              About Us
            </Link>

            <Link
              href="/scheduling"
              className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 rounded-lg font-semibold transition"
            >
              Schedule a Meeting
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-blue-700 font-semibold uppercase tracking-widest text-sm mb-4">
            Get to Know miTern
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Opening Doors to Opportunity
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We believe meaningful professional experiences
            can help students discover their potential,
            develop their skills, and build a foundation
            for successful careers.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>

            <p className="text-slate-600 leading-relaxed mb-5">
              miTern is dedicated to helping bridge the gap
              between education and professional experience
              by connecting students with internship
              opportunities that support their academic
              and career goals.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Our vision is to make meaningful career
              exploration more accessible while helping
              students gain confidence, build professional
              relationships, and prepare for the workforce.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm flex justify-center">
            <Image
              src="/mitern-logo.png"
              alt="miTern logo"
              width={420}
              height={220}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            What Drives Us
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Opportunity",
                description:
                  "Helping students discover pathways to professional growth and career exploration.",
              },
              {
                title: "Accessibility",
                description:
                  "Working toward making internship experiences more accessible to students from different backgrounds.",
              },
              {
                title: "Connection",
                description:
                  "Encouraging meaningful relationships between students, educational institutions, and employers.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  {value.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Let's Build Your Future Together
        </h2>

        <p className="mt-5 text-slate-600 max-w-xl mx-auto">
          Interested in learning more about miTern?
          Schedule a conversation with us.
        </p>

        <Link
          href="/scheduling"
          className="inline-block mt-8 bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition"
        >
          Schedule a Meeting
        </Link>
      </section>

      <footer className="py-6 text-center text-sm text-slate-400 border-t border-slate-200">
        © 2026 miTern. All rights reserved.
      </footer>
    </main>
  );
}
