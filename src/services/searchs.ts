import { api } from "../api/api";

interface SearchInterface {
    searchTerm: string;
    opcion?: number;
    mercado?: boolean
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


const getSearchProductInBack = async ({ searchTerm, opcion, mercado }: SearchInterface) => {

    let products;
    try {
        if( mercado ) {
            const getProduct = await api.get(`/api/search/productInBag?term=${searchTerm}&opcion=${opcion}&mercado=${mercado}`);
            products = getProduct.data.products;
        } else {
            const getProduct = await api.get(`/api/search/productInBag?term=${searchTerm}&opcion=${opcion}`);
            products = getProduct.data.products;
        }
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return products
}


export {
    getSearchProductInStock,
    getSearchProductInBack
}