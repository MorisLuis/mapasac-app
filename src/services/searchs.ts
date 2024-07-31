import { api } from "../api/api";

interface SearchInterface {
    searchTerm: string;
    opcion?: number
}


const getSearchProductInStock = async ({ searchTerm }: SearchInterface) => {
    let products;
    try {
        const getProduct = await api.get(`/api/search/product?term=${searchTerm}`);
        products = getProduct.data.products;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return products
}


const getSearchProductInBack = async ({ searchTerm, opcion }: SearchInterface) => {
    let products;
    try {
        const getProduct = await api.get(`/api/search/productInBag?term=${searchTerm}&opcion=${opcion}`);
        products = getProduct.data.products;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return products
}


export {
    getSearchProductInStock,
    getSearchProductInBack
}