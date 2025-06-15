import { getCurrentUser } from "@/actions/auth";
import Container from "@/components/Container";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import FormWrap from "@/components/FormWrap";
import Heading from "@/components/products/Heading";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CheckoutPage = async () => {
  const currentUser = await getCurrentUser();

  // 🔥 Se não estiver logado, redireciona para login
  if (!currentUser) {
    redirect("/login");
  }

  return (
    <Container>
      <FormWrap>
        <Heading title="Checkout" center />
        <CheckoutForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default CheckoutPage;
