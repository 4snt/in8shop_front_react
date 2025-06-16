"use client";

import { useThemeContext } from "@/Providers/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaPhone, FaWhatsapp } from "react-icons/fa";
import Container from "../Container";
import FooterList from "./Footerlist";

const Footer = () => {
  const { theme } = useThemeContext();
  const logoSrc = theme === "dark" ? "/logo-dark.png" : "/logo-light.png";

  return (
    <footer
      className="
        text-sm
        mt-16
        border-t
      "
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--border)",
      }}
    >
      <Container>
        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            pt-16 pb-8
          "
        >
          <FooterList>
            <h3 className="text-base font-bold mb-2">Nossos Serviços</h3>
            <Link href="#">Identidade Visual</Link>
            <Link href="#">Sites e Sistemas</Link>
            <Link href="#">Gestão de Mídias</Link>
            <Link href="#">Integrações</Link>
          </FooterList>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Atendimento</h3>
            <Link href="#">Fale Conosco</Link>
            <Link href="#">Suporte</Link>
            <Link href="#">Política de Privacidade</Link>
            <Link href="#">Termos de Serviço</Link>
          </FooterList>

          <div className="w-full md:w-1/3 mb-6 md:mb-0 text-justify">
            <Image
              src={logoSrc}
              alt="In8 Holding Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <h3 className="text-base font-bold mb-2">Sobre Nós</h3>
            <p className="text-sm text-[var(--muted)] mb-2">
              <strong className="text-[var(--foreground)]">In8 Holding</strong>{" "}
              é um grupo focado em soluções digitais, desenvolvimento de
              sistemas, sites e gestão de mídias, ajudando negócios a
              performarem no digital.
            </p>
            <p className="text-xs text-[var(--muted)]">
              &copy; {new Date().getFullYear()} In8 Holding. Todos os direitos
              reservados.
            </p>
          </div>

          <FooterList>
            <h3 className="text-base font-bold mb-2">Redes Sociais</h3>
            <div className="flex gap-3 text-xl">
              <Link
                href="https://www.linkedin.com/company/in8-holding"
                target="_blank"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="hover:text-blue-500 transition" />
              </Link>
              <Link
                href="https://www.instagram.com/in8holding"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram className="hover:text-pink-500 transition" />
              </Link>
              <Link
                href="https://wa.me/numero_da_in8"
                target="_blank"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="hover:text-green-500 transition" />
              </Link>
              <Link href="tel:+55XXXXXXXXXX" aria-label="Telefone">
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
