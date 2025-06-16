export const dynamic = "force-dynamic";

import { getProducts } from "@/app/actions/products";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/products/ProductGrid";
import { SearchParams } from "@/types/SearchParams";
import { SearchParamsParser } from "@/utils/SearchParamsParser";

interface HomeProps {
  searchParams?: SearchParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const parser = new SearchParamsParser(searchParams ?? {});

  const query = parser.getString("query");
  const provider = parser.getString("provider");
  const category = parser.getString("category");
  const hasDiscount = parser.getBoolean("hasDiscount");
  const minPrice = parser.getNumber("minPrice");
  const maxPrice = parser.getNumber("maxPrice");

  const products = await getProducts({
    query: query || undefined,
    provider: provider || undefined,
    category: category || undefined,
    hasDiscount: hasDiscount ? true : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
  });

  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductGrid searchParams={searchParams} products={products} />
      </Container>
    </div>
  );
}
