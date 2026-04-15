export const usePriceDiscount = (isDiscount: boolean, priceWithoutDiscount: number, discount: string) => {
  const parseDiscount = parseInt(discount);
  if (isDiscount) {
    return Math.floor(priceWithoutDiscount - (priceWithoutDiscount * parseDiscount) / 100);
  }
  return null;
}
