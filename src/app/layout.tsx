import CartProvider from "@/Providers/CartProvider";
import SessionProviderWrapper from "@/Providers/SessionProviderWrapper";
import NavBar from "@/components/Navbar/Navbar";
import { CartDrawerProvider } from "@/hooks/useCartDrawer";
import { GeistMono, GeistSans } from "geist/font";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "../Providers/ThemeContext";
import Footer from "../components/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "AcheiShop",
  description: "Demonstração de Ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body>
        <SessionProviderWrapper>
          <CartProvider>
            <CartDrawerProvider>
              <ThemeProvider>
                <div className="flex flex-col min-h-screen">
                  <NavBar />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                  <Toaster richColors position="top-center" />
                </div>
              </ThemeProvider>
            </CartDrawerProvider>
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
