import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content w-full">
      <Navbar />
      <main className="flex-grow w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
