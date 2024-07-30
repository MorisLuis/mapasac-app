import { api } from "../api/api";


const getProductsSells = async (PageNumber: number) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product/sells?page=${PageNumber}&limit=10`);
        products = getProduct.data.products;
    } catch (error: any) {
        console.log({ error: error?.response?.data })
    }

    return products
};

const getProductsSellsFromFamily = async (cvefamilia: number) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product/sells/byfamily?cvefamilia=${cvefamilia}`);
        products = getProduct.data.products;
    } catch (error: any) {
        console.log({ error: error?.response?.data })
    }

    return products
};


export {
    getProductsSells,
    getProductsSellsFromFamily
}