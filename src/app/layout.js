import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ReSell Hub",
  description: "Second-hand marketplace platform to buy and sell pre-owned products safely.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <AuthProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
