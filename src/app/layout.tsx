import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hostel Management System",
  description: "Modern hostel management system for students, wardens, and administrators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --primary-green: #10b981;
            --secondary-green: #065f46;
            --accent-green: #34d399;
            --light-green: #d1fae5;
            --dark-green: #047857;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
          {children}
        </div>
      </body>
    </html>
  );
}