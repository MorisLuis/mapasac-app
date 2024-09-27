import React, { useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsBagContext } from './SellsBagContext';
import { sellsBagReducer } from './SellsBagReducer';
import EnlacemobInterface from '../../interface/enlacemob';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';

export interface SellsBagInterface {
    numberOfItemsSells: string;
}

export const SellsBagInitialState: SellsBagInterface = {
    numberOfItemsSells: "0"
}

export const SellsProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(sellsBagReducer, SellsBagInitialState);
    const [productAdded, setProductAdded] = useState(false);
    const { handleError } = useErrorHandler();
    const { status } = useContext(AuthContext);

    const handleUpdateSummary = async () => {
        if(status !== 'authenticated' ) return;
        try {
            console.log("handleUpdateSummary")
            const total = await getTotalProductsInBag({ opcion: 2, mercado: true });
            if (total?.error) return handleError(total.error);

            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            };
            dispatch({ type: '[SellsBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
            return;
        } finally {
            setProductAdded(false);
        }
    };

    const addProductSell = async (sellBody: EnlacemobInterface) => {
        try {
            const product = await addProductInBag({ product: sellBody, mercado: true });
            if (product?.error) return handleError(product.error);
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const deleteProductSell = async (idenlacemob: number) => {
        try {
            const product = await deleteProductInBag({ idenlacemob, mercado: true });
            if (product?.error) return handleError(product.error);
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const editProductSell = async ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => {
        try {
            const product = await updateProductInBag({ idenlacemob, cantidad, mercado: true });
            if (product?.error) return handleError(product.error);
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const handleCleanState = () => {
        dispatch({ type: '[SellsBag] - LogOut' })
    }

    const resetAfterPost = () => {
        handleUpdateSummary()
    }

    useEffect(() => {
        handleUpdateSummary();
    }, [productAdded, state.numberOfItemsSells]);

    useEffect(() => {
        handleUpdateSummary();
    }, [])

    return (
        <SellsBagContext.Provider value={{
            ...state,
            addProductSell,
            deleteProductSell,
            editProductSell,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState
        }}>
            {children}
        </SellsBagContext.Provider>
    )

}