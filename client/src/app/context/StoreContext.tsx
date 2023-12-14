import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext() {
  const context = useContext(StoreContext);

  if (!context) {
    throw Error("StoreContext is not available");
  }

  return context;
}

export function StoreProvider({ children }: PropsWithChildren<unknown>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) {
      return;
    }

    const newItems = [...basket.items];
    const itemIndex = newItems.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      return;
    }

    newItems[itemIndex].quantity -= quantity;
    if (newItems[itemIndex].quantity <= 0) {
      newItems.splice(itemIndex, 1);
    }

    setBasket((prevState) => ({ ...prevState!, items: newItems }));
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItem }}>
      {children}
    </StoreContext.Provider>
  );
}
