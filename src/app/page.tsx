import ProductGrid from "@/components/products/ProductGrid";
import Container from "../components/Container";
import HomeBanner from "../components/HomeBanner";

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductGrid searchParams={searchParams ?? {}} />
      </Container>
    </div>
  );
}
