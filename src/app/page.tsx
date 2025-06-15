import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/products/ProductGrid";
import { SearchParams } from "@/types/SearchParams";

interface HomeProps {
  searchParams: SearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductGrid searchParams={searchParams} />
      </Container>
    </div>
  );
}
