"use client";

import { useAuth } from "@/Providers/AuthProvider";
import { SearchParamsParser } from "@/utils/SearchParamsParser";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { confirmOrder } from "../actions/confirmOrder";

export default function PaymentClient() {
  const { currentUser } = useAuth();
  const rawParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const parser = useMemo(() => {
    const obj = Object.fromEntries(rawParams.entries());
    return new SearchParamsParser(obj);
  }, [rawParams]);

  const orderId = parser.getString("orderId");
  if (!orderId) return <div>Pedido inválido</div>;
  if (!currentUser) return <div>Você precisa estar logado.</div>;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await confirmOrder(orderId);
      toast.success(`Pagamento #${orderId} confirmado!`);
      router.push("/my-orders");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro inesperado");
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
        onClick={handleConfirm}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Confirmando..." : "Confirmar Pagamento"}
      </button>
    </div>
  );
}
