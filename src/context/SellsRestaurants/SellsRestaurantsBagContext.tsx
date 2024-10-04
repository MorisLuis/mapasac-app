import { createContext } from "react";
import { EnlacemobInterface } from "../../interface/enlacemob";
import { FormSellsRestaurantType } from "../../screens/SellsRestaurants/SellsRestaurantDataScreen";
import { SellsDataScreenTypeProps, updateProductInBagInterface } from "../../interface";

interface ContextProps {
    addProductSell: (sellBody: EnlacemobInterface) => void;
    deleteProductSell: (idenlacemob: number) => void;
    editProductSell: ( body: updateProductInBagInterface ) => void;
    resetAfterPost: () => void;
    handleUpdateSummary: () => void;
    handleCleanState: () => void;
    updateFormData: (data: SellsDataScreenTypeProps) => void;
    cleanFormData: () => void;
    
    numberOfItemsSells: string;
    formSellsData: FormSellsRestaurantType;
    productAdded: boolean;
}

export const SellsRestaurantBagContext = createContext({} as ContextProps)