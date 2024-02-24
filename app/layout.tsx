import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "NotFalseCoder",
  description: "Not False Coder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className={"mx-auto max-w-5xl flex flex-col h-screen"}>
        <Navbar />
        <main className="border flex-grow">{children}</main>
      </body>
    </html>
  );
}
