import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/lib/AuthProvider";
import GoogleAuthProvider from "@/components/auth/GoogleAuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Digital Life Lessons",
  description: "Create, store and share meaningful life lessons and wisdom you have gathered over time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="lifelessons">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <GoogleAuthProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastContainer position="top-center" autoClose={3000} />
          </AuthProvider>
        </GoogleAuthProvider>
      </body>
    </html>
  );
}