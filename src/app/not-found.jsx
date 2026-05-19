"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020817] text-white px-4">
      
      <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold mb-4">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-400 mb-8 text-center max-w-md">
        Sorry, the page you are looking for does not exist.
      </p>

      <div className="flex gap-4">
        
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}