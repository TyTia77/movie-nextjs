"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";
import api from "./api";
import SlideRotate from "@/app/components/slideRotate";
import Hero from "@/app/components/hero";
// export interface CartItem extends Product {
//   quantity: number;
// }

interface HeroContextType {
  //   items: CartItem[];
  //   addToCart: (product: Product) => void;
  //   removeFromCart: (id: number) => void;
  //   updateQuantity: (id: number, quantity: number) => void;
  //   clearCart: () => void;
  //   totalItems: number;
  //   totalPrice: number;
}

const HeroContext = createContext<HeroContextType | null>(null);

export function HeroProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: any;
}) {
  return (
    <HeroContext.Provider value={{ data, component: [Hero] }}>
      {children}
    </HeroContext.Provider>
  );
}

export function useHero() {
  const ctx = useContext(HeroContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
