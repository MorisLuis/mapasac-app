import { createContext } from "react";
import PorductInterface from "../../interface/product";
import { inventoryDataInterface } from "./InventoryBagProvider";


interface ContextProps {
    addProduct: (product: PorductInterface) => void;
    removeProduct: (product: PorductInterface) => void;
    postInventory: (descripcion?: string) => Promise<void>;
    postInventoryDetails: (products: PorductInterface[]) => Promise<void>;
    cleanBag: () => void;
    bag: PorductInterface[];
    inventoryCreated: boolean;
    numberOfItems: number;
    inventoryData: inventoryDataInterface
}

export const InventoryBagContext = createContext({} as ContextProps)