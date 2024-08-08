import React, { useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsBagContext } from './SellsBagContext';
import { sellsBagReducer } from './SellsBagReducer';
import EnlacemobInterface from '../../interface/enlacemob';

export interface SellsBagInterface {
    numberOfItemsSells: number;
}

export const SellsBagInitialState: SellsBagInterface = {
    numberOfItemsSells: 0
}

export const SellsProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(sellsBagReducer, SellsBagInitialState);
    const [productAdded, setProductAdded] = useState(false);

    const handleUpdateSummary = async () => {
        console.log("summary")
        try {
            const total = await getTotalProductsInBag({opcion: 2, mercado: true});
            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            };
            dispatch({ type: '[SellsBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            console.log({ error });
        } finally {
            setProductAdded(false);
        }
    };

    const addProductSell = (sellBody: EnlacemobInterface) => {
        try {
            addProductInBag({product: sellBody, mercado: true})
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
        } finally {
            handleUpdateSummary()
        }
    }

    const deleteProductSell = (idenlacemob: number) => {
        try {
            deleteProductInBag({idenlacemob, mercado: true})
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
        } finally {
            handleUpdateSummary()
        }
    }

    const editProductSell = ({ idenlacemob, cantidad }: { idenlacemob: number, cantidad: number }) => {
        try {
            updateProductInBag({ idenlacemob, cantidad, mercado: true })
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
        } finally {
            handleUpdateSummary()
        }
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
            handleUpdateSummary
        }}>
            {children}
        </SellsBagContext.Provider>
    )

}