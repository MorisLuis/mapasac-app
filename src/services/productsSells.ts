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

    return products;
};

const getUnits = async () => {

    try {
        const getUnits = await api.get(`/api/product/sells/units`);
        return getUnits.data.units;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

}

interface getProductByEnlacemobInterface {
    idinvearts: number;
    idinveclas: number;
    capa: string;
}

const getProductByEnlacemob = async ({ idinvearts, idinveclas, capa }: getProductByEnlacemobInterface) => {
    let product;
    try {
        const getProduct = await api.get(`/api/product/sells/byenlacemob?idinvearts=${idinvearts}&idinveclas=${idinveclas}&capa=${capa}`);
        product = getProduct.data.product;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return product;
}

const getTotalProductsSells = async (cvefamilia: number) => {

    let total;
    try {
        const getProduct = await api.get(`/api/product/sells/total?cvefamilia=${cvefamilia}`);
        total = getProduct.data.total;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return total;
}

const getIdinveartsProduct = async (cvefamilia: number) => {
    let product;
    try {
        const getProduct = await api.get(`/api/product/sells/getidinvearts?cvefamilia=${cvefamilia}`);
        product = getProduct.data.product;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return product;
}

export {
    getProductsSells,
    getProductsSellsFromFamily,
    getUnits,
    getProductByEnlacemob,
    getTotalProductsSells,
    getIdinveartsProduct
}