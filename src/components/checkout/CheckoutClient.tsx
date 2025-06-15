"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) return;
    if (paymentIntent) return; // já foi criado, evita nova chamada

    setLoading(true);
    setError(false);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartProducts,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.paymentIntent?.id) {
          throw new Error("No paymentIntent returned");
        }
        setClientSecret(data.paymentIntent.client_secret);
        handleSetPaymentIntent(data.paymentIntent.id);
      })
      .catch((error) => {
        setError(true);
        toast.error("Algo deu errado ao criar pagamento.");
        console.error(error);
      });
  }, [cartProducts, router, handleSetPaymentIntent, paymentIntent]);

  return (
    <div className="flex flex-col gap-4">
      {loading && <p>Carregando pagamento...</p>}
      {error && (
        <p className="text-red-500">
          Ocorreu um erro ao gerar o pagamento. Tente novamente.
        </p>
      )}
      {!loading && !error && clientSecret && (
        <p>Checkout pronto! Client Secret gerado.</p>
      )}
      {!loading && !error && !clientSecret && <p>Preparando pagamento...</p>}
    </div>
  );
};

export default CheckoutClient;
