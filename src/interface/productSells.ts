// ??
export interface ProductSellsInterface {

    imagen?: string;

    idinvefami: number;

    cvefamilia?: number;

    descripcio?: string;

    producto?: string;

    ridinvearts?: number;

    ridinveclas?: number;

    clase?: string;

    cantidad?: number;

    unidad_nombre?: string;

    idenlacemob: number;

    capa?: string;

    precio?: string;

    classcount?: string;
}

// Function: 
export default interface ProductSellsFamilyInterface {

    // The name of the product
    rproducto?: string;

    //The id of the table invearts
    ridinvearts?: number;

    // The class id
    ridinveclas?: number;

    // The class name
    clase?: string;

    // The capa name
    rcapa?: string;
}

export interface ProductSellsInterfaceBag extends ProductSellsInterface {
    key: number
}