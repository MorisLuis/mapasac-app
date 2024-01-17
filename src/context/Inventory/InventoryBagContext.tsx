import { createContext } from "react";
import PorductInterface from "../../interface/product";


interface ContextProps {
    addProduct: (product: PorductInterface) => void;
    removeProduct: (product: PorductInterface) => void;
    cleanBag: () => void;
    bag: PorductInterface[];

    numberOfItems: number;
}

export const InventoryBagContext = createContext({} as ContextProps)