import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PorductInterface, { PorductInterfaceBag } from '../../interface/product';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { api } from '../../api/api';
import { AuthContext } from '../auth/AuthContext';
import Toast from 'react-native-toast-message';

export interface inventoryDataInterface {
    result: undefined,
    Id_Almacen: null,
    Folio: null,
    Fecha: undefined,
    Id_TipoMovInv: null
}

export interface InventoryBagInterface {
    bag: PorductInterfaceBag[];
    numberOfItems: number;
    inventoryData: inventoryDataInterface
}

export const InventoryBagInitialState: InventoryBagInterface = {
    bag: [],
    numberOfItems: 0,
    inventoryData: {
        result: undefined,
        Id_Almacen: null,
        Folio: null,
        Fecha: undefined,
        Id_TipoMovInv: null
    }
}


export const InventoryProvider = ({ children }: { children: JSX.Element[] }) => {

    const [state, dispatch] = useReducer(innventoryBagReducer, InventoryBagInitialState);
    const { user } = useContext(AuthContext);

    const [inventoryCreated, setInventoryCreated] = useState(false);
    const [productAdded, setProductAdded] = useState(false);
    const [keyNumber, setKeyNumber] = useState(0);


    const addProduct = (product: PorductInterface) => {
        try {
            setKeyNumber(keyNumber + 1)
            const newKey = keyNumber + 1;

            dispatch({ type: '[InventoryBag] - Add Product', payload: { ...product, key: newKey } })
            setProductAdded(true);
        } catch (error) {
            console.log({ error })
            setProductAdded(false);
        } finally {
            timeoutRef.current = setTimeout(() => {
                setProductAdded(false);
            }, 1000);
        }
    }

    const removeProduct = (product: PorductInterfaceBag) => {
        dispatch({ type: '[InventoryBag] - Remove Product', payload: product })
    }

    const editProduct = (product: PorductInterfaceBag) => {
        dispatch({ type: '[InventoryBag] - Edit Product', payload: product })
        Toast.show({
            type: 'tomatoToast',
            text1: product.Piezas < 2 ? `Se cambio a ${product.Piezas} pieza.` : `Se cambio a ${product.Piezas} piezas.`
        })
    }

    const cleanBag = () => {
        dispatch({ type: '[InventoryBag] - Clear Bag', payload: [] })
    }


    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const postInventory = async (descripcion?: string) => {
        try {
            const tipoMovInvId = user?.Id_TipoMovInv?.Id_TipoMovInv;
            const inventorybody = {
                descripcion,
                Id_TipoMovInv: tipoMovInvId
            };
            const inventory = await api.post(`/api/inventory`, inventorybody);
            dispatch({ type: '[InventoryBag] - Post Inventory', payload: inventory.data })
            setInventoryCreated(true)
        } catch (error) {
            console.error('Error posting inventory:', error);
            setInventoryCreated(false);
        } finally {
            timeoutRef.current = setTimeout(() => {
                setInventoryCreated(false);
            }, 1000);
        }
    };

    const postInventoryDetails = async (products: PorductInterface[]) => {
        try {
            const tipoMovInvId = user?.Id_TipoMovInv?.Id_TipoMovInv;
            const inventoryDetailsbody = {
                products,
                Id_TipoMovInv: tipoMovInvId
            };

            await api.post(`/api/inventory/inventoryDetails`, inventoryDetailsbody);
            dispatch({ type: '[InventoryBag] - Post Inventory Details', payload: products })
            setInventoryCreated(true)
        } catch (error) {
            console.error('Error posting inventory details:', error);
        }
    }

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

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
            editProduct,
            postInventory,
            postInventoryDetails,
            inventoryCreated,
            productAdded,
            cleanBag
        }}
        >
            {children}
        </InventoryBagContext.Provider>
    )

}