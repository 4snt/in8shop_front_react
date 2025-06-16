"use client";

import { loginServer } from "@/app/actions/auth";
import { SafeUser } from "@/types/next-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import Button from "../Button";
import Input from "../inputs/Input";
import Heading from "../products/Heading";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 🔁 Se já estiver logado, redireciona
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await loginServer({
        email: data.email,
        password: data.password,
      });

      toast.success("Login realizado com sucesso!");
      router.push("/");
      router.refresh(); // 🔥 Garante atualização do estado do usuário
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao fazer login."
      );
    }
    setIsLoading(false);
  };

  const onError = (errors: FieldValues) => {
    if (errors.email) toast.error("Informe um e-mail válido.");
    else if (errors.password) toast.error("Informe a senha.");
    else toast.error("Preencha todos os campos obrigatórios.");
  };

  if (currentUser) {
    return <p className="text-center">Já logado. Redirecionando...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="w-full flex flex-col gap-4"
    >
      <Heading title="Login na In8Shop" />

      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        type="submit"
        disabled={isLoading}
        label={isLoading ? "Entrando..." : "Entrar"}
        onClick={() => {}}
      />

      <p className="text-md">
        Não tem uma conta?{" "}
        <Link className="underline" href="/register">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
