import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/layout/header/header";
import {AppProvider} from "../components/AppContext"
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className=" max-w-4xl p-4 mx-auto border">
        <AppProvider>
          <Toaster />
          <Header />
            {children}
            <footer className=" border-t text-center text-gray-500 mt-16">
            &copy; 2024 All right reserved
            </footer>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
