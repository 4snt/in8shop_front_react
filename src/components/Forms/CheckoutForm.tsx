"use client";

import { placeOrder } from "@/app/actions/placeOrder";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "../../Providers/AuthProvider";
import Button from "../Button";
import Input from "../inputs/Input";
import Heading from "../products/Heading";

const CheckoutForm: React.FC = () => {
  const { cartProducts = [], cartTotalAmount, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "Brasil",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Current user before submit:", currentUser);
    if (currentUser === null) {
      toast.error("Você precisa estar logado para finalizar o pedido.");
      return;
    }

    if (cartProducts.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }

    const address = {
      line1: data.line1,
      line2: data.line2,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
    };

    setIsLoading(true);

    try {
      const order = await placeOrder({
        userId: currentUser.id,
        amount: cartTotalAmount,
        currency: "BRL",
        products: cartProducts.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        address,
      });

      toast.success("Pedido criado com sucesso!");
      clearCart();
      router.push(`/payment?orderId=${order.id}`);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      toast.error("Erro ao criar pedido. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Heading title="Finalizar Pedido" center />

      <div className="border p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
        {cartProducts.length > 0 ? (
          cartProducts.map((item) => (
            <div key={item.id} className="flex justify-between mb-1">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))
        ) : (
          <p className="text-slate-500">Seu carrinho está vazio.</p>
        )}
        <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(cartTotalAmount)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Heading title="Endereço de Entrega" />

        <Input
          id="line1"
          label="Endereço (linha 1)"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="line2"
          label="Complemento (linha 2)"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="city"
          label="Cidade"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="state"
          label="Estado"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="zip"
          label="CEP"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="country"
          label="País"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Button
          type="submit"
          disabled={isLoading}
          label={isLoading ? "Finalizando..." : "Finalizar Pedido"}
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
