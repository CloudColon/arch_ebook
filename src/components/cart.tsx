"use client";

import { createContext, use, useCallback, useEffect, useMemo, useState } from "react";
import { book } from "@/content/book";

// One product today, so the cart is a set of book ids kept in localStorage.
// The server re-prices every order; nothing here is trusted at checkout.

type CartState = {
  items: string[];
  ready: boolean;
  add: (id?: string) => void;
  remove: (id?: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  totalPaise: number;
};

const CartContext = createContext<CartState | null>(null);
const KEY = "kb_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage once on mount
      if (Array.isArray(saved)) setItems(saved.filter((x) => x === book.id));
    } catch {}
    setReady(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const value = useMemo<CartState>(
    () => ({
      items,
      ready,
      open,
      setOpen,
      add: (id = book.id) => {
        if (!items.includes(id)) persist([...items, id]);
        setOpen(true);
      },
      remove: (id = book.id) => persist(items.filter((x) => x !== id)),
      clear: () => persist([]),
      totalPaise: items.includes(book.id) ? book.pricePaise : 0,
    }),
    [items, ready, open, persist],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function BuyButton({ className = "", label = "Buy the ebook", withPrice = true }: { className?: string; label?: string; withPrice?: boolean }) {
  const { add } = useCart();
  return (
    <button type="button" onClick={() => add()} className={`btn btn-solid ${className}`}>
      {label}
      {withPrice && <span className="font-normal opacity-80">₹{book.pricePaise / 100}</span>}
    </button>
  );
}
