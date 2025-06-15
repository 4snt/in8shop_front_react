import { getCurrentUser } from "@/actions/auth";
import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import Heading from "@/components/products/Heading";
import { redirect } from "next/navigation";

const PaymentPage = async ({
  searchParams,
}: {
  searchParams?: { orderId?: string };
}) => {
  const orderId = searchParams?.orderId;

  const currentUser = await getCurrentUser();

  if (!orderId) {
    redirect("/");
  }

  if (!currentUser) {
    redirect("/login");
  }

  const handlePayment = async () => {
    "use server";

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: Number(orderId) }),
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Erro ao criar sessão de pagamento");
    }

    const data = await res.json();

    if (data?.url) {
      redirect(data.url);
    }
  };

  return (
    <Container>
      <FormWrap>
        <Heading title="Pagamento do Pedido" center />

        <div className="flex flex-col gap-4 items-center text-center">
          <p className="text-lg">
            Seu pedido foi criado com sucesso! 🎉 <br />
            Clique no botão abaixo para realizar o pagamento.
          </p>

          <form action={handlePayment}>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-md hover:opacity-80 transition"
            >
              Pagar com Stripe
            </button>
          </form>
        </div>
      </FormWrap>
    </Container>
  );
};

export default PaymentPage;
