import { getCurrentUser } from "@/app/actions/auth";
import Container from "@/components/Container";
import CheckoutForm from "@/components/Forms/CheckoutForm";
import FormWrap from "@/components/FormWrap";
import Heading from "@/components/products/Heading";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CheckoutPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <Container>
      <FormWrap>
        <Heading title="Checkout" center />
        <CheckoutForm />
      </FormWrap>
    </Container>
  );
};

export default CheckoutPage;
