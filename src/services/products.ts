import { api } from "../api/api";

const getProducts = async (PageNumber: number) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product?page=${PageNumber}&limit=10`);
        products = getProduct.data.products;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return products
}


const getProductDetails = async (idinvearts: number) => {
    let product;
    try {
        const getProduct = await api.get(`/api/product/byid?idinvearts=${idinvearts}`);
        product = getProduct.data.product;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return product;
}

interface getProductByCodeBarInterface {
    codeBar: string
}

const getProductByCodeBar = async ({ codeBar }: getProductByCodeBarInterface) => {

    let product;
    try {
        const getProduct = await api.get(`/api/product/bycodebar?codbarras=${codeBar}`);
        product = getProduct.data.product;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return product
};

interface getProductByClaveInterface {
    clave: string
}

const getProductByClave = async ({ clave }: getProductByClaveInterface) => {

    let product;
    try {
        const getProduct = await api.get(`/api/product/byclave?clave=${clave}`);
        product = getProduct.data.product;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return product
};



const getTotalProducts= async () => {

    let total;
    try {
        const getProduct = await api.get(`/api/product/total`);
        total = getProduct.data.total;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return total;
}



export {
    getProducts,
    getProductByCodeBar,
    getProductByClave,
    getTotalProducts,
    getProductDetails
}