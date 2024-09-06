import React, { useContext, useEffect, useReducer, useState } from 'react';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import ProductInterface from '../../interface/product';
import { AuthContext } from '../auth/AuthContext';

export interface InventoryBagInterface {
    numberOfItems: string;
}

export const InventoryBagInitialState: InventoryBagInterface = {
    numberOfItems: "0"
}

export const InventoryProvider = ({ children }: { children: JSX.Element[] }) => {

    const [state, dispatch] = useReducer(innventoryBagReducer, InventoryBagInitialState);
    const [productAdded, setProductAdded] = useState(false);
    const { user } = useContext(AuthContext);

    const handleUpdateSummary = async () => {
        if (!user) return
        try {
            const total = await getTotalProductsInBag({ opcion: 0 });

            const numberOfItems = total;
            const orderSummary = {
                numberOfItems
            };
            dispatch({ type: '[InventoryBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            console.log({ error });
        } finally {
            setProductAdded(false);
        }
    };

    const addProduct = (inventoryBody: ProductInterface) => {
        try {
            addProductInBag({ product: inventoryBody })
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
        } finally {
            handleUpdateSummary()
        }
    }

    const deleteProduct = (idenlacemob: number) => {
        try {
            deleteProductInBag({ idenlacemob })
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
        } finally {
            handleUpdateSummary()
        }
    }

    const editProduct = ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => {
        try {
            updateProductInBag({ idenlacemob, cantidad })
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
        } finally {
            handleUpdateSummary()
        }
    }

    const handleCleanState = () => {
        dispatch({ type: '[InventoryBag] - LogOut' })
    }

    const resetAfterPost = () => {
        handleUpdateSummary()
    }

    useEffect(() => {
        handleUpdateSummary();
    }, [productAdded, state.numberOfItems]);

    return (
        <InventoryBagContext.Provider value={{
            ...state,
            addProduct,
            deleteProduct,
            editProduct,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState
        }}>
            {children}
        </InventoryBagContext.Provider>
    )

}