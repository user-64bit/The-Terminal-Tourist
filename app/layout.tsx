import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "The Terminal Tourist",
  description: "The Terminal Tourist - A developer's journey through code and technology",
  keywords: "programming, blog, technology, terminal, coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className="mx-auto max-w-5xl flex flex-col min-h-screen terminal-background">
        <div className="loading-bar"></div>
        <Navbar />
        <main className="border border-[var(--border-color)] flex-grow rounded-md my-4 p-4 shadow-lg bg-[var(--card-bg)] fade-in">
          {children}
        </main>
        <footer className="text-center p-4 text-sm text-gray-400 fade-in">
          <p>© {new Date().getFullYear()} The Terminal Tourist</p>
        </footer>
      </body>
    </html>
  );
}
