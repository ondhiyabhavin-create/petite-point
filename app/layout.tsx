import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AOSInit from "@/components/AOSInit";
import 'aos/dist/aos.css';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Petite Point Restaurant | Pure Veg Multi-Cuisine Restaurant",
  description: "Experience authentic North Indian, Chinese, and Punjabi cuisine at Petite Point Restaurant. Pure vegetarian restaurant with a warm ambiance.",
  keywords: "restaurant, vegetarian, North Indian, Chinese, Punjabi, food, dining",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AOSInit />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
