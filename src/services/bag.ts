import { api } from "../api/api";
import { addProductInBagInventoryInterface, bagInterface, deleteProductInBagInventoryInterface, getBagInterface, updateProductInBagInventoryInterface } from "../interface/bag";


const getBagInventory = async ({ page, limit, option }: getBagInterface) => {
    try {
        const { data } = await api.get(`/api/bag?limit=${limit}&page=${page}&option=${option}`);
        return data.bag
    } catch (error: any) {
        return { error: { ...error } };
    }
};

const getTotalProductsInBag = async ({ opcion }: bagInterface) => {

    try {
        const { data } = await api.get(`/api/bag/total?opcion=${opcion}`);
        return data.total
    } catch (error: any) {
        return { error: { ...error } };
    }

};

const getTotalPriceBag = async ({ opcion }: bagInterface) => {
    try {
        const { data } = await api.get(`/api/bag/price?opcion=${opcion}`);
        return data.total
    } catch (error: any) {
        return { error: { ...error } };
    }
};

const addProductInBag = async ({ product, opcion }: addProductInBagInventoryInterface) => {
    console.log({product: JSON.stringify(product, null, 2)})
    try {
        const data = await api.post(`/api/bag`, { ...product, opcion: opcion });
        return data as any;
    } catch (error: any) {
        return { error: { ...error } };
    }
}


const updateProductInBag = async ({ idenlacemob, cantidad }: updateProductInBagInventoryInterface) => {

    try {
        const data = await api.put(`/api/bag`, { idenlacemob, cantidad });
        return data as any
    } catch (error: any) {
        return { error: { ...error } };
    }
}

const deleteProductInBag = async ({ idenlacemob }: deleteProductInBagInventoryInterface) => {

    try {
        const { data } = await api.delete(`/api/bag/${idenlacemob}`);
        return data
    } catch (error: any) {
        return { error: { ...error } };
    }

}

const deleteAllProductsInBag = async ({ opcion }: bagInterface) => {

    try {
        const { data } = await api.delete(`/api/bag/all?opcion=${opcion}`);
        return data
    } catch (error: any) {
        return { error: { ...error } };
    };

}

export {
    getBagInventory,
    getTotalProductsInBag,
    getTotalPriceBag,
    addProductInBag,
    updateProductInBag,
    deleteProductInBag,
    deleteAllProductsInBag
}