
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full px-8 py-6">
        <div className="text-sm font-medium text-slate-500">
          Welcome to miTern
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
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

      <footer className="py-6 text-center text-sm text-slate-400">
        © 2026 miTern. All rights reserved.
      </footer>
    </main>
  );
}
