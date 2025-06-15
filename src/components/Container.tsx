// Define uma interface para as props esperadas no componente
// Aqui, especificamos que o componente aceitará uma propriedade chamada "children" do tipo React.ReactNode
interface ContainerProps {
  children: React.ReactNode;
}

// Define o componente Container como um Functional Component (React.FC)
// Esse componente recebe as props tipadas pela interface ContainerProps
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    // Retorna uma <div> que envolve os elementos filhos passados para o Container
    <div
    className="
    max-w-[1920px]  // largura máxima personalizada
    mx-auto         // centraliza horizontalmente
    xl:px-20        // padding horizontal grande em telas grandes (>=1280px)
    md:px-2         // padding horizontal médio em telas médias (>=768px)
    px-4            // padding padrão em telas pequenas
    "
    >
      {children}
    </div>
  );
};

// Exporta o componente Container como default para ser usado em outros arquivos
export default Container;