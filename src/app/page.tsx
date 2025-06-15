import ProductGrid from "@/components/products/ProductGrid";
import { SearchParams } from "@/types/SearchParams";
import Container from "../components/Container";
import HomeBanner from "../components/HomeBanner";

export default function Home({
  searchParams = {},
}: {
  searchParams?: SearchParams;
}) {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>

        <ProductGrid searchParams={searchParams} />
      </Container>
    </div>
  );
}
