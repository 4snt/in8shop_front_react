import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/products/ProductGrid";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductGrid searchParams={searchParams} />
      </Container>
    </div>
  );
}
