"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../types/Product";
import { toast } from "react-toastify";
import { CompanyForm } from "../types/quote";

interface QuoteContextType {
  setOpenQuote: (open: boolean) => void;
  openQuote: boolean;
  product: Product | null;
  quantity: number;
  setQuantity: (qty: number) => void;
  setProduct: (product: Product | null) => void;
  handleExport: (form: CompanyForm) => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [openQuote, setOpenQuote] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

useEffect(() => {
    if (!openQuote) {
      setProduct(null);
      setQuantity(1);
    }
}, [openQuote]);


 const handleExport = (form: CompanyForm) => {
    const summary = { ...form };
    const blob = new Blob([JSON.stringify(summary, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-simulado-${form.name || "company"}.json`;
    a.click();
    setOpenQuote(false);
    toast.success("Cotización exportada como JSON");
  };
  return (
    <QuoteContext.Provider
      value={{
        setOpenQuote,
        openQuote,
        product,
        quantity,
        setQuantity,
        setProduct,
        handleExport
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = (): QuoteContextType => {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
