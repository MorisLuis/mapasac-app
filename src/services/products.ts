import { api } from "../api/api";
import UserInterface from "../interface/user";


const getProductDetails = async (id: string, marca: string) => {
    let product;
    try {
        const getProduct = await api.get(`/api/product/${id}?Marca=${marca}`);
        product = getProduct.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return product;
}

interface getProductByCodeBarInterface {
    codeBar?: string, codigo?: string
}

const getProductByCodeBar = async ({ codeBar, codigo }: getProductByCodeBarInterface) => {

    let product;
    try {
        const getProduct = await api.get(`/api/product/byStockAndCodeBar?CodBar=${codeBar}&Codigo=${codigo}`);
        product = getProduct.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return product
};



const getProductsByStock = async (PageNumber: number, user: UserInterface | null) => {

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
    getProductsByStock,
    getProductDetails
}