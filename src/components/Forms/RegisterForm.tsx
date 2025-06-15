"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { toast } from "sonner";

import { loginServer, registerServer } from "@/actions/auth";
import { SafeUser } from "@/types/next-auth";

import Button from "../Button";
import Input from "../inputs/Input";
import Heading from "../products/Heading";

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const confirmpassword = watch("confirmpassword");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (data.password !== confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      await registerServer({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Account created successfully!");

      await loginServer({
        email: data.email,
        password: data.password,
      });

      toast.success("Logged in successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        (error as { message?: string })?.message || "Something went wrong."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onError = (errors: FieldValues) => {
    if (errors.name) toast.error("Name is required.");
    else if (errors.email) toast.error("Valid email is required.");
    else if (errors.password) toast.error("Password is required.");
    else if (errors.confirmpassword)
      toast.error("Please confirm your password.");
    else toast.error("Please fill out all required fields.");
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  if (currentUser) {
    return <p className="text-center">Already registered. Redirecting...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="w-full flex flex-col gap-4"
    >
      <Heading title="Sign up for AcheiShop" />

      <Button
        type="button"
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => toast.info("Google auth coming soon...")}
      />

      <hr className="w-full h-px" style={{ color: "var(--text)" }} />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

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
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="confirmpassword"
        label="Confirm Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        type="submit"
        disabled={isLoading}
        label={isLoading ? "Creating..." : "Create account"}
        onClick={() => {}}
      />

      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
