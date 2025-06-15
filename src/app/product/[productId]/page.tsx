import { getProductById } from "@/actions/products";
import Container from "@/components/Container";
import ProductDetails from "@/components/products/ProductDetails";

export interface PageProps {
  params: {
    productId: string;
  };
}

const Product = async ({ params }: PageProps) => {
  const { productId } = params;

  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="py-20 text-center text-red-500">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <Container>
      <ProductDetails product={product} />
      <div className="flex flex-col mt-20 gap-4">
        <div className="text-muted text-sm">Adicionar avaliação</div>
      </div>
    </Container>
  );
};

export default Product;
