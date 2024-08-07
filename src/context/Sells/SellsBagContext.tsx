import { createContext } from "react";
import { ProductSellsInterface } from "../../interface/productSells";
import EnlacemobInterface from "../../interface/enlacemob";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    numberOfItemsSells: number;
}

export const SellsBagContext = createContext({} as ContextProps)