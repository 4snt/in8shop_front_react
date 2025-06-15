import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/products/ProductGrid";
import { SearchParams } from "@/types/SearchParams";

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductGrid searchParams={searchParams} />
      </Container>
    </div>
  );
}
