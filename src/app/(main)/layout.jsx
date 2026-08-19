"use client";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/shared/CompareBar";

export default function MainLayout({ children }) {
  return (
    <CompareProvider>
      <div className="flex flex-col min-h-screen bg-base-100 text-base-content w-full">
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        <CompareBar />
      </div>
    </CompareProvider>
  );
}
