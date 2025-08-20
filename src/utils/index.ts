import { Product } from "../types/Product";

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0, 
    }).format(price);
  };


    // Calculate best pricing for quantity
export  const calculatePrice = (qty: number, product: Product) => {
    if (!product?.priceBreaks || product?.priceBreaks?.length === 0) {
      return product?.basePrice! * qty
    }

    // Find applicable price break
    let applicableBreak = product?.priceBreaks[0]
    for (let i = 0; i < product?.priceBreaks?.length; i++) {
      if (qty >= product?.priceBreaks[i]?.minQty) {
        applicableBreak = product?.priceBreaks[i]
      }
    }

    return applicableBreak?.price * qty
  }

  // Calculate discount amount
  export const getDiscount = (qty: number, product: Product) => {
    if (!product?.priceBreaks || product?.priceBreaks?.length === 0) {
      return 0
    }

    const baseTotal = product?.basePrice * qty
    const discountedTotal = calculatePrice(qty, product)
    
    // Calculate savings percentage
    return ((baseTotal - discountedTotal) / baseTotal) * 100
  }