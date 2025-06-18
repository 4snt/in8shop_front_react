import { AuthProvider } from "@/Providers/AuthProvider";
import CartProvider from "@/Providers/CartProvider";
import NavBar from "@/components/Navbar/Navbar";
import { CartDrawerProvider } from "@/hooks/useCartDrawer";
import { GeistMono, GeistSans } from "geist/font";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "../Providers/ThemeContext";
import Footer from "../components/footer/Footer";
import { getCurrentUser } from "./actions/auth";
import "./globals.css";

export const metadata: Metadata = {
  
  title: "In8Shop",
  description: "Demonstração de Ecommerce",
};

export default async function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body>
        <AuthProvider currentUser={currentUser}>
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
        </AuthProvider>
      </body>
    </html>
  );
}
