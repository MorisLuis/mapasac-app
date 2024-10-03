import React, { useContext, useEffect, useReducer, useState } from 'react';
import { addProductInBag, deleteProductInBag, getTotalProductsInBag, updateProductInBag } from '../../services/bag';
import { SellsRestaurantsBagReducer } from './SellsRestaurantsBagReducer';
import {EnlacemobInterface} from '../../interface/enlacemob';
import useErrorHandler from '../../hooks/useErrorHandler';
import { AuthContext } from '../auth/AuthContext';
import { SellsDataScreenTypeProps } from '../../interface/navigation';
import { SellsRestaurantBagContext } from './SellsRestaurantsBagContext';
import { FormSellsRestaurantType } from '../../screens/SellsRestaurants/SellsRestaurantDataScreen';
import { updateProductInBagInterface } from '../../interface';

export interface SellsRestaurantsBagInterface {
    numberOfItemsSells: string;
};

export const SellsBagInitialState: SellsRestaurantsBagInterface = {
    numberOfItemsSells: "0"
};

export const SellsRestaurantsProvider = ({ children }: { children: JSX.Element }) => {

    const [state, dispatch] = useReducer(SellsRestaurantsBagReducer, SellsBagInitialState);
    const { status } = useContext(AuthContext);
    const { handleError } = useErrorHandler();

    const [productAdded, setProductAdded] = useState(false);
    const [formSellsData, setFormSellsData] = useState<FormSellsRestaurantType>({});


    const handleUpdateSummary = async () => {
        if (status !== 'authenticated') return;
        try {
            const total = await getTotalProductsInBag({ opcion: 4 });
            console.log('handleUpdateSummary');
            console.log({total})
            if (total?.error) return handleError(total.error);


            const numberOfItemsSells = total;
            const orderSummary = {
                numberOfItemsSells
            };
            dispatch({ type: '[SellsRestaurantBag] - Update Summary', payload: orderSummary });
        } catch (error) {
            handleError(error)
            return;
        } finally {
            setProductAdded(false);
        }
    };

    const addProductSell = async (sellBody: EnlacemobInterface) => {
        try {
            const product = await addProductInBag({ product: sellBody, opcion: 4 });
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
            const product = await deleteProductInBag({ idenlacemob });
            if (product?.error) return handleError(product.error);
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    }

    const editProductSell = async (body: updateProductInBagInterface) => {
        try {
            const product = await updateProductInBag(body);
            if (product?.error) return handleError(product.error);
            setProductAdded(true);
        } catch (error) {
            handleError(error)
        } finally {
            handleUpdateSummary()
        }
    };

    const updateFormData = (data: SellsDataScreenTypeProps) => {
        setFormSellsData((prev) => ({ ...prev, ...data }));
    };

    const cleanFormData = () => {
        setFormSellsData({});
    };


    const handleCleanState = () => {
        dispatch({ type: '[SellsRestaurantBag] - LogOut' })
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
        <SellsRestaurantBagContext.Provider value={{
            ...state,
            addProductSell,
            deleteProductSell,
            editProductSell,
            resetAfterPost,
            handleUpdateSummary,
            handleCleanState,
            updateFormData,
            cleanFormData,
            formSellsData,
            productAdded
        }}>
            {children}
        </SellsRestaurantBagContext.Provider>
    )

}