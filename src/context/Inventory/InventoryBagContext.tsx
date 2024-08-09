import { createContext } from "react";
import ProductInterface from "../../interface/product";

interface ContextProps {
    addProduct: (inventoryBody: ProductInterface) => void;
    deleteProduct: (idenlacemob: number) => void;
    editProduct: ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    numberOfItems: string;

    handleUpdateSummary: () => void;
}

export const InventoryBagContext = createContext({} as ContextProps)