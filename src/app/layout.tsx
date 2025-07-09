'use client';
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <html lang="en">
      <head>
        <title>WebNews - Modern News Portal</title>
        <meta name="description" content="Stay updated with the latest news headlines, categories, and search." />
      </head>
      <body className={inter.className + " bg-gray-50 min-h-screen"}>
        <header className="bg-white shadow sticky top-0 z-50">
          <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight mb-2 md:mb-0">
              WebNews
            </Link>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <Link href="/category/business" className="hover:text-blue-600 transition">Business</Link>
              <Link href="/category/technology" className="hover:text-blue-600 transition">Technology</Link>
              <Link href="/category/sports" className="hover:text-blue-600 transition">Sports</Link>
              <Link href="/category/entertainment" className="hover:text-blue-600 transition">Entertainment</Link>
              <Link href="/category/health" className="hover:text-blue-600 transition">Health</Link>
              <Link href="/category/science" className="hover:text-blue-600 transition">Science</Link>
            </div>
            <form onSubmit={handleSearch} className="mt-2 md:mt-0 w-full md:w-auto flex justify-center">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-l px-3 py-1 w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded-r hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8 min-h-[80vh]">
          {children}
        </main>
      </body>
    </html>
  );
}
