// Define a interface para as props que o componente aceita.
// Neste caso, ele aceita qualquer conteúdo React como filhos (children).
interface FooterListProps {
  children: React.ReactNode;
}

// Define o componente funcional FooterList, com tipagem baseada na interface acima.
const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    // Container com várias classes Tailwind para layout responsivo:
    <div
      className="
        w-full        // Largura total por padrão (em telas pequenas)
        sm:w-1/2      // Em telas ≥ 640px (small), ocupa metade do espaço
        md:w-1/4      // Em telas ≥ 768px (medium), ocupa 1/4 (25%)
        lg:w-1/6      // Em telas ≥ 1024px (large), ocupa 1/6 (16.6%)
        mb-6          // Margin bottom de 1.5rem (24px)
        flex          // Ativa o Flexbox
        flex-col      // Direção do Flex em coluna (vertical)
        gap-2         // Espaço entre os filhos de 0.5rem (8px)
      "
    >
      {children} {/* Renderiza o conteúdo passado dentro do FooterList */}
    </div>
  );
};

export default FooterList;
