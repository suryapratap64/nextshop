import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NextShop | E-Commerce Platform",
  description:
    "A modern e-commerce web app built with Next.js demonstrating SSG, ISR, SSR, and CSR rendering strategies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 font-sans antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        {/* Site Header */}
        <Header />

        {/* Main Content Wrapper */}
        <main className="flex-1 container  mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
          {children}
        </main>

        {/* Site Footer */}
        <Footer />
      </body>
    </html>
  );
}
