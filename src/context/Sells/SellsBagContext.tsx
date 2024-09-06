import { createContext } from "react";
import EnlacemobInterface from "../../interface/enlacemob";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    
    numberOfItemsSells: string;
}

export const SellsBagContext = createContext({} as ContextProps)