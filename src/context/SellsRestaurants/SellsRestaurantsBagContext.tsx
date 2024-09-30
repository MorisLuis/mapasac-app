import { createContext } from "react";
import { EnlacemobInterface } from "../../interface/enlacemob";
import { FormSellsRestaurantType } from "../../screens/SellsRestaurants/SellsRestaurantDataScreen";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    updateFormData: (data: any) => void;
    cleanFormData: () => void;
    
    numberOfItemsSells: string;
    formSellsData: FormSellsRestaurantType;
    productAdded: boolean;
}

export const SellsRestaurantBagContext = createContext({} as ContextProps)