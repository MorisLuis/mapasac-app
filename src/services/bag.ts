import { api } from "../api/api";
import ProductInterface from "../interface/product";

interface getBagInterface {
    limit: number;
    page: number;
}

const getBagInventory = async ({ page, limit }: getBagInterface) => {


    try {
        const { data } = await api.get(`/api/bag?limit=${limit}&page=${page}&option=0`);

        return data.bag
    } catch (error: any) {
        console.log({ errorTP: error })
    }

}

const addProductInBagInventory = async (product: ProductInterface) => {

    try {
        const data = await api.post(`/api/bag`, {...product, opcion: 0});
        return data
    } catch (error: any) {
        console.log({ errorTP: error })
    }

}

interface updateProductInBagInventoryInterface {
    idenlacemob: number;
    cantidad: number
}

const updateProductInBagInventory = async ({ idenlacemob, cantidad }: updateProductInBagInventoryInterface) => {

    try {
        const { data } = await api.put(`/api/bag`, { idenlacemob, cantidad });
        return data
    } catch (error: any) {
        console.log({ errorTP: error })
    }
}

const deleteProductInBagInventory = async (idenlacemob: number) => {

    try {
        const { data } = await api.delete(`/api/bag/${idenlacemob}`);
        return data
    } catch (error: any) {
        console.log({ errorTP: error })
    }

}

const deleteAllProductsInBagInventory = async (opcion: number) => {

    try {
        const { data } = await api.delete(`/api/bag/all?opcion=${opcion}`);
        return data
    } catch (error: any) {
        console.log({ errorTP: error })
    }

}

const getTotalProductsInBag = async (opcion: number) => {

    try {
        const { data } = await api.get(`/api/bag/total?opcion=${opcion}`);
        return data.total
    } catch (error: any) {
        console.log({ errorTP: error })
    }

}


export {
    getBagInventory,
    addProductInBagInventory,
    updateProductInBagInventory,
    deleteProductInBagInventory,
    deleteAllProductsInBagInventory,
    getTotalProductsInBag
}