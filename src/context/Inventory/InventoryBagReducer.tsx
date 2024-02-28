import PorductInterface from "../../interface/product";
import { InventoryBagInterface } from "./InventoryBagProvider";


type InventoryBagActionType =
    | { type: '[InventoryBag] - Post Inventory', payload: string | undefined }
    | { type: '[InventoryBag] - Post Inventory Details', payload: PorductInterface[] }
    | { type: '[InventoryBag] - Add Product', payload: PorductInterface }
    | { type: '[InventoryBag] - Remove Product', payload: PorductInterface }
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
                ...state
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
                bag: state.bag.filter(product => (product.Codigo && product.Familia) !== (action.payload.Codigo && action.payload.Familia))
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