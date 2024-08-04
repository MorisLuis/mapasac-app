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

const getProductSellsDetails = async (idinvearts: number) => {
    let product;
    try {
        const getProduct = await api.get(`/api/product/sells/byid?idinvearts=${idinvearts}`);
        product = getProduct.data.product;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

    return product;
}

const getUnits = async () => {

    try {
        const getUnits = await api.get(`/api/product/sells/units`);
        return getUnits.data.units;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }

}



export {
    getProductsSells,
    getProductSellsDetails,
    getProductsSellsFromFamily,
    getUnits
}