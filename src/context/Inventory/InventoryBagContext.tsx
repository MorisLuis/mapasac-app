import { createContext } from "react";
import PorductInterface, { PorductInterfaceBag } from "../../interface/product";
import { inventoryDataInterface } from "./InventoryBagProvider";


interface ContextProps {
    addProduct: (product: PorductInterface) => void;
    removeProduct: (product: PorductInterfaceBag) => void;
    editProduct: (product: PorductInterfaceBag) => void;
    postInventory: (descripcion?: string) => Promise<void>;
    postInventoryDetails: (products: PorductInterface[]) => Promise<void>;
    cleanBag: () => void;
    bag: PorductInterfaceBag[];
    inventoryCreated: boolean;
    numberOfItems: number;
    inventoryData: inventoryDataInterface;
    productAdded: boolean;
}

export const InventoryBagContext = createContext({} as ContextProps)