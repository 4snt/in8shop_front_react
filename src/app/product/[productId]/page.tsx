import { getProductById } from "@/actions/products";
import Container from "@/components/Container";
import ListRating from "@/components/products/ListRating";
import ProductDetails from "@/components/products/ProductDetails";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const { productId } = params;

  if (!productId) {
    return (
      <div className="py-20 text-center text-red-500">
        Produto não encontrado.
      </div>
    );
  }

  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="py-20 text-center text-red-500">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div>
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4">
          <div className="text-muted text-sm">Adicionar avaliação</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
