
import CartProvider from "@/Providers/CartProvider";
import SessionProviderWrapper from "@/Providers/SessionProviderWrapper";
import NavBarWithSuspense from "@/Providers/navbarwrapper";
import { CartDrawerProvider } from "@/hooks/useCartDrawer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import { ThemeProvider } from '../Providers/ThemeContext';
import Footer from "../components/footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AcheiShop",
  description: "Demonstração de Ecomerce",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        <SessionProviderWrapper>
        <CartProvider>
          <CartDrawerProvider>
        <ThemeProvider>

          <div
            className="flex"
            style={{
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <NavBarWithSuspense />
            <main style={{ flexGrow: 1 }}>{children}
              <Toaster richColors position="top-center"/>
            </main>
            <Footer />
          </div>
          </ThemeProvider>
          </CartDrawerProvider>
          </CartProvider>
          </SessionProviderWrapper>
      </body>
    </html>
  );
}
