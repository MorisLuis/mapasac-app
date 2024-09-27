import { api } from "../api/api";
import EnlacemobInterface from "../interface/enlacemob";
import ProductInterface from "../interface/product";

interface getBagInterface {
    limit: number;
    page: number;
    option: number;
    mercado?: boolean;
}

const getBagInventory = async ({ page, limit, option, mercado }: getBagInterface) => {
    try {
        if (mercado) {
            const { data } = await api.get(`/api/bag?limit=${limit}&page=${page}&option=${option}&mercado=true`);
            return data.bag
        } else {
            const { data } = await api.get(`/api/bag?limit=${limit}&page=${page}&option=${option}`);
            return data.bag
        }
    } catch (error: any) {
        return { error: error };
    }
}

interface addProductInBagInventoryInterface {
    product: ProductInterface | EnlacemobInterface;
    mercado?: boolean
}

const addProductInBag = async ({ product, mercado }: addProductInBagInventoryInterface) => {
    try {
        let data
        if (mercado) {
            data = await api.post(`/api/bag?mercado=true`, { ...product, opcion: 2 });
        } else {
            data = await api.post(`/api/bag`, { ...product, opcion: 0 });
        }
        return data as any;
    } catch (error: any) {
        return { error: error };
    }
}

interface updateProductInBagInventoryInterface {
    idenlacemob: number;
    cantidad: number;
    mercado?: boolean
}

const updateProductInBag = async ({ idenlacemob, cantidad, mercado }: updateProductInBagInventoryInterface) => {

    try {
        let data;
        if (mercado) {
            data = await api.put(`/api/bag?mercado=true`, { idenlacemob, cantidad });
        } else {
            data = await api.put(`/api/bag`, { idenlacemob, cantidad });
        }
        return data as any
    } catch (error: any) {
        return { error: error };
    }
}


interface deleteProductInBagInventoryInterface {
    idenlacemob: number;
    mercado?: boolean
}

const deleteProductInBag = async ({ idenlacemob, mercado }: deleteProductInBagInventoryInterface) => {

    try {
        if (mercado) {
            const { data } = await api.delete(`/api/bag/${idenlacemob}?mercado=true`);
            return data
        } else {
            const { data } = await api.delete(`/api/bag/${idenlacemob}`);
            return data
        }
    } catch (error: any) {
        return { error: error };
    }

}

interface deleteAllProductsInBagInventoryInterface {
    opcion: number;
    mercado?: boolean
}

const deleteAllProductsInBag = async ({ opcion, mercado }: deleteAllProductsInBagInventoryInterface) => {

    try {
        if (mercado) {
            const { data } = await api.delete(`/api/bag/all?opcion=${opcion}&mercado=true`);
            return data
        } else {
            const { data } = await api.delete(`/api/bag/all?opcion=${opcion}`);
            return data
        }
    } catch (error: any) {
        return { error: error };
    }
}

interface getTotalProductsInBagInterface {
    opcion: number;
    mercado?: boolean
}

const getTotalProductsInBag = async ({ opcion, mercado }: getTotalProductsInBagInterface) => {

    try {
        if (mercado) {
            const { data } = await api.get(`/api/bag/total?opcion=${opcion}&mercado=true`);
            return data.total
        } else {
            const { data } = await api.get(`/api/bag/total?opcion=${opcion}`);
            return data.total
        }
    } catch (error: any) {
        console.log({error})
        return { error: error };
    }

}

const getTotalPriceBag = async ({ opcion }: getTotalProductsInBagInterface) => {
    try {
        const { data } = await api.get(`/api/bag/price?opciona=${opcion}&mercado=true`);
        return data.total
    } catch (error: any) {
        return { error: error };
    }
}



export {
    getBagInventory,
    addProductInBag,
    updateProductInBag,
    deleteProductInBag,
    deleteAllProductsInBag,
    getTotalProductsInBag,
    getTotalPriceBag
}