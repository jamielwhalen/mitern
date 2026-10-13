
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col">

      {/* Navigation Bar */}
      <nav className="w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

          {/* Logo / Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-blue-900 tracking-tight"
          >
            mi<span className="text-blue-500">Tern</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 md:gap-10">

            <Link
              href="/"
              className="text-slate-600 hover:text-blue-800 font-medium transition"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-slate-600 hover:text-blue-800 font-medium transition"
            >
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

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">

        {/* Full miTern Logo */}
        <div className="relative w-full max-w-[520px] h-[240px] mb-8">
          <Image
            src="/mitern-logo.png"
            alt="miTern - A Gateway to Your Future Internship"
            fill
            priority
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 max-w-3xl leading-tight">
          Your future starts here.
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-xl leading-relaxed">
          Connecting students with meaningful internship
          opportunities, professional experience, and
          pathways to successful careers.
        </p>

        <div className="mt-10 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 shadow-sm">
          Something exciting is coming soon.
        </div>

      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-slate-400">
        © 2026 miTern. All rights reserved.
      </footer>

    </main>
  );
}
