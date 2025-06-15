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
          return router.push("/login");
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
        toast.error("Something went wrong.");
        console.error(error);
      });
  }, [cartProducts, router]); // removido `paymentIntent` do array

  return <>Checkout</>;
};

export default CheckoutClient;
