import { api } from "../api/api";


const getProductsSells = async (PageNumber: number) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product/sells?page=${PageNumber}&limit=10`);
        products = getProduct.data.products;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return products
};

const getProductsSellsFromFamily = async (cvefamilia: number) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product/sells/byfamily?cvefamilia=${cvefamilia}`);
        products = getProduct.data.products;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return products
};


export {
    getProductsSells,
    getProductsSellsFromFamily
}