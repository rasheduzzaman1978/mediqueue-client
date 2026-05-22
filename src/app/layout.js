import { Poppins } from "next/font/google";

import "./globals.css";

import MainNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ThemeProvider from "@/components/providers/ThemeProvider";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// POPPINS FONT

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900",
  ],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "Tutors | Mediqueue",
    template: "%s | Mediqueue",
  },

  description: "Tutor Booking Platform",
};

export default function RootLayout({
  children,
}) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >

      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-[#020817] dark:text-white transition-colors duration-300 font-[family-name:var(--font-poppins)]">

        <ThemeProvider>

          <MainNavbar />

          <main className="flex-1">

            {children}

          </main>

          <Footer />

          <ToastContainer
            position="top-center"
            autoClose={1500}
          />

        </ThemeProvider>

      </body>

    </html>
  );
}