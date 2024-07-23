export default interface ProductInterface {

    // The id of the inventory.
    // Note: Is different of the product id.
    idinvearts: number;

    noarticulo: number;

    // The id of the family.
    cvefamilia: number;

    // The name of the family.
    familia: string;

    // The codbar.
    codbarras: string;

    // The name of the product.
    producto: string;

    // The key of the product.
    clave: string;

    // The price of the product.
    precio1: number;

    // The amount added to the stock
    cantidad?: number

    idenlacemob?: number
}

export interface ProductInterfaceBag extends ProductInterface {
    key: number
}