import { createContext } from "react";
import ProductInterface from "../../interface/product";

interface ContextProps {
    addProduct: (inventoryBody: ProductInterface ) => void;
    deleteProduct: (idenlacemob: number ) => void;

    numberOfItems: number;
}

export const InventoryBagContext = createContext({} as ContextProps)