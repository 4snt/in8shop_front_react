import { getMyOrders } from "@/app/actions/myOrders";
import type { OrderDto } from "@/types/order";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

export default async function MyOrdersPage() {
  let orders: OrderDto[] = [];

  try {
    orders = await getMyOrders();
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return (
      <div className="p-8 text-red-600">
        Erro: {msg}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Meus Pedidos</h1>
        <p>Você ainda não fez pedidos.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Meus Pedidos</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Data</th>
              <th className="px-4 py-2 text-right">Total</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">
                  {new Date(order.createDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatPrice(order.amount)}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <Link
                    href={`/order/${order.id}`}
                    className="text-purple-600 hover:underline"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
