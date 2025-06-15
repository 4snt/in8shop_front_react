"use client";
import { useThemeContext } from "@/Providers/ThemeContext";
import Image from "next/image";
import Link from "next/link"; // Componente de link do Next.js para navegação SPA
import { FaFacebookF, FaInstagram, FaPhone, FaWhatsapp } from "react-icons/fa";
import Container from "../Container"; // Componente de layout que centraliza e aplica padding
import FooterList from "./Footerlist"; // Lista vertical usada dentro do rodapé

const Footer = () => {
  const { theme } = useThemeContext();
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    // Elemento <footer> com estilos de fundo e texto
    <footer
      className="
        text-sm           // Tamanho da fonte pequeno
        mt-16             // Margem superior de 4rem (64px)
        border-t          // Borda no topo
      "
      style={{
        backgroundColor: "var(--background)", // fundo suave adaptável ao tema
        color: "var(--foreground)",
        borderColor: "var(--border)", // texto principal adaptável ao tema
      }}
    >
      <Container>
        <div
          className="
            flex              // Layout flexível
            flex-col          // Empilha verticalmente em telas pequenas
            md:flex-row       // Em telas médias ou maiores, muda para linha (horizontal)
            justify-between   // Espaça os blocos de conteúdo
            pt-16 pb-8        // Padding vertical (cima: 4rem, baixo: 2rem)
            
          "
        >
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            {/* Links fictícios para categorias */}
            <Link href="#">Category 1</Link>
            <Link href="#">Category 2</Link>
            <Link href="#">Category 3</Link>
            <Link href="#">Category 4</Link>
            <Link href="#">Category 5</Link>
            <Link href="#">Category 6</Link>
            <Link href="#">Category 7</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            {/* Links fictícios para categorias */}
            <Link href="#"> Contact Us</Link>
            <Link href="#">Shipping Police</Link>
            <Link href="#">Returns & Exchanges </Link>
            <Link href="#">Faq</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-justify">
            <Image
              src={logoSrc}
              alt="Achei Solutions Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="text-sm text-[var(--muted)] mb-2">
              <strong className="text-[var(--foreground)]">
                Achei Solutions Inc.
              </strong>
              , founded in 2024, is headquartered in Florida...
            </p>
            <p className="text-xs text-[var(--muted)]">
              &copy; {new Date().getFullYear()} Achei Solutions Inc.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-3 text-xl">
              <Link
                href="https://www.facebook.com/people/Achei-Solutions-Inc/61574229443239/"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-blue-500 transition" />
              </Link>
              <Link
                href="https://www.instagram.com/achei_solutions/"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram className="hover:text-pink-500 transition" />
              </Link>
              <Link
                href="https://wa.me/17272484349"
                target="_blank"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="hover:text-green-500 transition" />
              </Link>
              <Link href="tel:+17272484349" aria-label="Telefone">
                <FaPhone className="hover:text-yellow-500 transition" />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
