"use client"
// import Footer from "@/components/footerCard";
// import Header from "@/components/headerCard";
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'feather-icons-react/build/FeatherIcon';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'toastr/build/toastr.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Projeto NGPD",
  description: "Projeto criado para o NGPD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}
        </body>
      </html>
  );
}
