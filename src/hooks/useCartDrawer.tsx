"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1️⃣ Criando o tipo do contexto
type CartDrawerContextType = {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

// 2️⃣ Criando o contexto
const CartDrawerContext = createContext<CartDrawerContextType | null>(null);

// 3️⃣ Provider que envolve o app
export const CartDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        openDrawer: () => setIsOpen(true),
        closeDrawer: () => setIsOpen(false),
      }}
    >
      {children}
    </CartDrawerContext.Provider>
  );
};

// 4️⃣ Hook para acessar o drawer
export const useCartDrawer = () => {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error("useCartDrawer must be used within a CartDrawerProvider");
  }
  return context;
};
