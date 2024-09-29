import { createContext } from "react";
import EnlacemobInterface from "../../interface/enlacemob";
import { SellsDataScreenTypeProps } from "../../navigator/SellsNavigation";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    updateFormData: (data: SellsDataScreenTypeProps) => void;
    cleanFormData: () => void;
    
    numberOfItemsSells: string;
    formSellsData: SellsDataScreenTypeProps;
    productAdded: boolean;
}

export const SellsBagContext = createContext({} as ContextProps)