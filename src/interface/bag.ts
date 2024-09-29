import EnlacemobInterface from "./enlacemob";
import ProductInterface from "./product";

export type opcionBag = 0 | 2;

export interface bagInterface {
    opcion: opcionBag;
}

export interface getBagInterface {
    limit: number;
    page: number;
    option: opcionBag;
};

export interface addProductInBagInventoryInterface {
    product: ProductInterface | EnlacemobInterface;
    opcion: opcionBag
}

export interface updateProductInBagInventoryInterface {
    idenlacemob: number;
    cantidad: number;
}

export interface deleteProductInBagInventoryInterface {
    idenlacemob: number;
}
