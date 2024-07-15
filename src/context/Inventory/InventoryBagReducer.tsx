import PorductInterface, { PorductInterfaceBag } from "../../interface/product";
import { InventoryBagInterface, inventoryDataInterface } from "./InventoryBagProvider";


type InventoryBagActionType =
    | { type: '[InventoryBag] - Post Inventory', payload: inventoryDataInterface | undefined }
    | { type: '[InventoryBag] - Post Inventory Details', payload: PorductInterface[] }
    | { type: '[InventoryBag] - Add Product', payload: PorductInterfaceBag }
    | { type: '[InventoryBag] - Remove Product', payload: PorductInterfaceBag }
    | { type: '[InventoryBag] - Edit Product', payload: PorductInterfaceBag }
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
                inventoryData: action.payload as inventoryDataInterface
            }

        case '[InventoryBag] - Post Inventory Details':
            return {
                ...state
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
                        ? { ...product, Piezas: action.payload.Piezas }
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