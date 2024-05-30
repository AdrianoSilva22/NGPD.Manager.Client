"use client"
// import Footer from "@/components/footerCard";
// import Header from "@/components/headerCard";
import Sidebar from "@/Sidebar/SideBar";
import Header from "@/components/Header/Header";
import { queryClient } from "@/utils/queryClient";
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'feather-icons-react/build/FeatherIcon';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "react-query";
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
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>{children}
          <Header />
          <Sidebar />
        </body>
      </html>
    </QueryClientProvider>
  );
}
