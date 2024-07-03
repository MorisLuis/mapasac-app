import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import PorductInterface, { PorductInterfaceBag } from '../../interface/product';
import { InventoryBagContext } from './InventoryBagContext';
import { innventoryBagReducer } from './InventoryBagReducer';
import { api } from '../../api/api';
import { AuthContext } from '../auth/AuthContext';
import { SettingsContext } from '../settings/SettingsContext';
import { Vibration } from 'react-native';

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
    const [inventoryCreated, setInventoryCreated] = useState(false);
    const { vibration } = useContext(SettingsContext);

    const [keyNumber, setKeyNumber] = useState(0)
    const { user } = useContext(AuthContext);

    const productTemplate: PorductInterface = {
        Descripcion: "Producto ejemplo",
        Id_Familia: 1,
        Codigo: "ABC123",
        Familia: "Familia Ejemplo",
        CodigoPrecio: "12345",
        Precio: 100,
        CodigoExsitencia: "67890",
        Existencia: 50,
        Id_Almacen: 1,
        Marca: "Marca Ejemplo",
        Id_Marca: 1,
        Id_ListaPrecios: 1,
        Piezas: 10,
        Impto: 0.16,
        imagen: [{ url: "http://example.com/image.jpg", id: 1 }],
        CodBar: "1234567890123"
    };


    const addMultipleProducts = () => {
        let currentKeyNumber = keyNumber;
    
        const productsToAdd: PorductInterfaceBag[] = [];
        for (let i = 0; i < 30; i++) {
            const newKey = currentKeyNumber + 1;
            const newProduct = { ...productTemplate, key: newKey };
            productsToAdd.push(newProduct);
            currentKeyNumber++;
        }
    
        if (vibration) {
            Vibration.vibrate(100);
        }
    
        productsToAdd.forEach(product => {
            dispatch({ type: '[InventoryBag] - Add Product', payload: product });
        });
    
        setKeyNumber(currentKeyNumber);
    };
    
    

    const addProduct = (product: PorductInterface) => {

        setKeyNumber(keyNumber + 1)
        const newKey = keyNumber + 1;

        if (vibration) {
            Vibration.vibrate(100);
        }

        dispatch({ type: '[InventoryBag] - Add Product', payload: { ...product, key: newKey } })
    }

    const removeProduct = (product: PorductInterfaceBag) => {
        dispatch({ type: '[InventoryBag] - Remove Product', payload: product })
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

    // Cleanup timeout on component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);


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
            cleanBag,
            addMultipleProducts
        }}
        >
            {children}
        </InventoryBagContext.Provider>
    )

}