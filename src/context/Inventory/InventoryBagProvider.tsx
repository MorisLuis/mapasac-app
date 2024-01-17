import React, { useEffect, useReducer } from 'react';
import PorductInterface from '../../interface/product';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';


export interface InventoryBagInterface {
    bag: PorductInterface[];
    numberOfItems: number;
}

export const InventoryBagInitialState: InventoryBagInterface = {
    bag: [],
    numberOfItems: 0
}


export const InventoryProvider = ({ children }: { children: JSX.Element[] }) => {

    const [state, dispatch] = useReducer(innventoryBagReducer, InventoryBagInitialState);

    const addProduct = (product: PorductInterface) => {

        // Validate if not already added this product.
        const isAlreadyInBag = state.bag.some((item: PorductInterface) =>
            item.Codigo === product.Codigo && item.Familia === product.Familia
        );

        if (isAlreadyInBag) return;

        dispatch({ type: '[InventoryBag] - Add Product', payload: product })
    }

    const removeProduct = (product: PorductInterface) => {
        dispatch({ type: '[InventoryBag] - Remove Product', payload: product })
    }

    const cleanBag = () => {
        dispatch({ type: '[InventoryBag] - Clear Bag', payload: [] })
    }

    useEffect(() => {
        const numberOfItems = state.bag.length;

        const orderSummary = {
            numberOfItems
        }

        dispatch({ type: '[InventoryBag] - Update Summary', payload: orderSummary })

    }, [state.bag])

    return (
        <InventoryBagContext.Provider value={{
            ...state,
            addProduct,
            removeProduct,
            cleanBag
        }}
        >
            {children}
        </InventoryBagContext.Provider>
    )

}