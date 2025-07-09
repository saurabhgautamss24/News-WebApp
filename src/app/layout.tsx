
'use client';
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaNewspaper } from "react-icons/fa";

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
        <meta
          name="description"
          content="Stay updated with the latest news headlines, categories, and search."
        />
      </head>
      <body className={inter.className + " bg-gray-50 text-gray-800"}>
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
          <nav className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-700 hover:text-blue-900 transition">
              <FaNewspaper className="text-blue-600" />
              <span>WebNews</span>
            </Link>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base mt-4 md:mt-0">
              {[
                { name: "Home", path: "/" },
                { name: "Business", path: "/category/business" },
                { name: "Technology", path: "/category/technology" },
                { name: "Sports", path: "/category/sports" },
                { name: "Entertainment", path: "/category/entertainment" },
                { name: "Health", path: "/category/health" },
                { name: "Science", path: "/category/science" },
              ].map(({ name, path }) => (
                <Link
                  key={name}
                  href={path}
                  className="text-gray-700 hover:text-blue-600 font-medium transition relative group"
                >
                  {name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="mt-4 md:mt-0 w-full md:w-auto flex justify-center">
              <div className="relative w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
              </div>
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
