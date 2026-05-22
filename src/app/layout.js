import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import MainNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ThemeProvider from "@/components/providers/ThemeProvider";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TutorQueue",
  description:
    "Tutor Booking Platform",
};

export default function RootLayout({
  children,
}) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-[#020817] dark:text-white transition-colors duration-300">

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