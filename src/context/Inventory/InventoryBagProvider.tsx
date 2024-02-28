import React, { useEffect, useReducer, useState } from 'react';
import PorductInterface from '../../interface/product';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { api } from '../../api/api';


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
    const [inventoryCreated, setInventoryCreated] = useState(false)

    const addProduct = (product: PorductInterface) => {

        // Validate if not already added this product.
        const isAlreadyInBag = state.bag.some((item: PorductInterface) =>
            item.Codigo === product.Codigo && item.Id_Marca === product.Id_Marca && item.Id_Almacen === product.Id_Almacen && item.Marca === product.Marca
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


    const postInventory = async (descripcion?: string) => {

        try {
            await api.post(`/api/inventory`, { descripcion });
            dispatch({ type: '[InventoryBag] - Post Inventory', payload: descripcion })
            setInventoryCreated(true)
        } catch (error) {
            console.log({ error })
            setInventoryCreated(false);
        } finally {
            setTimeout(() => {
                setInventoryCreated(false);
            }, 1000);
        }

    };


    const postInventoryDetails = async (products: PorductInterface[]) => {

        try {
            await api.post(`/api/inventory/inventoryDetails`, products);
            dispatch({ type: '[InventoryBag] - Post Inventory Details', payload: products })
            setInventoryCreated(true)
        } catch (error) {
            console.log({ error })
        }

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
            postInventory,
            postInventoryDetails,
            inventoryCreated,
            cleanBag
        }}
        >
            {children}
        </InventoryBagContext.Provider>
    )

}