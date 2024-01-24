import { api } from "../api/api";


const getProductByCodeBar = async (codeBar: string) => {

    let product;
    try {
        const getProduct = await api.get(`/api/product/byStockAndCodeBar/${codeBar}`);
        console.log({getProduct})
        product = getProduct.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return product
};



const getProductsByStock = async ( PageNumber : number ) => {

    let products;
    try {
        const getProduct = await api.get(`/api/product/byStock?PageNumber=${PageNumber}&PageSize=10`);
        products = getProduct.data;
    } catch (error: any) {
        console.log({ error: error })
    }

    return products
}


export {
    getProductByCodeBar,
    getProductsByStock
}