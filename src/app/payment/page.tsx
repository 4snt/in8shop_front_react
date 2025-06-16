"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../Providers/AuthProvider";
import { confirmOrder } from "../actions/confirmOrder";

export default function PaymentPage() {
  const { currentUser } = useAuth(); // garante login
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(false);

  if (!orderId) return <div>Pedido inválido</div>;
  if (!currentUser)
    return <div>Você precisa estar logado para confirmar o pagamento.</div>;

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      await confirmOrder(orderId);
      toast.success(`Pagamento do pedido #${orderId} confirmado!`);
      router.push("/my-orders");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">
        Pagamento do pedido #{orderId}
      </h1>
      <button
        onClick={handleConfirmPayment}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Confirmando..." : "Confirmar Pagamento"}
      </button>
    </div>
  );
}
