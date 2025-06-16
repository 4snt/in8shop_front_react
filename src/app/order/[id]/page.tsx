// app/order/[id]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OrderDetailPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Image
        src="/fim.png"
        alt="Processando pedido"
        width={256}
        height={256}
        priority
        className="mb-6"
      />
      <p className="text-xl font-medium mb-4">
        Você chegou ao fim da abstração! Será redirecionado à home em 5s.
      </p>
      <Link href="/my-orders" className="text-purple-600 hover:underline">
        Voltar aos pedidos
      </Link>
    </div>
  );
}
