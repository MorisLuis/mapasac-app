import ProductInterface, { ProductInterfaceBag } from "../../interface/product";
import { InventoryBagInterface, inventoryDataInterface } from "./InventoryBagProvider";


type InventoryBagActionType =
    | { type: '[InventoryBag] - Post Inventory'}
    | { type: '[InventoryBag] - Add Product', payload: ProductInterfaceBag }
    | { type: '[InventoryBag] - Remove Product', payload: ProductInterfaceBag }
    | { type: '[InventoryBag] - Edit Product', payload: ProductInterfaceBag }
    | { type: '[InventoryBag] - Clear Bag', payload: [] }
    | {
        type: '[InventoryBag] - Update Summary',
        payload: {
            numberOfItems?: number;
        }
    }


export const innventoryBagReducer = (state: InventoryBagInterface, action: InventoryBagActionType): InventoryBagInterface => {

    switch (action.type) {

        case '[InventoryBag] - Post Inventory':
            return {
                ...state,
                //inventoryData: action.payload as inventoryDataInterface
            }

        case '[InventoryBag] - Add Product':
            return {
                ...state,
                bag: [...state.bag, action.payload]
            }

        case '[InventoryBag] - Remove Product':
            return {
                ...state,
                bag: state.bag.filter(product => (product.key !== action.payload.key))
            }

        case '[InventoryBag] - Edit Product':
            return {
                ...state,
                bag: state.bag.map(product =>
                    product.key === action.payload.key
                        ? { ...product, Piezas: action.payload.cantidad }
                        : product
                )
            }
        case '[InventoryBag] - Clear Bag':
            return {
                ...state,
                bag: []
            }

        case '[InventoryBag] - Update Summary':
            return {
                ...state,
                ...action.payload
            }


        default:
            return state
    }

}