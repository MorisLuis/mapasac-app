import axios from "axios";
import { api } from "../api/api";


const getProductByCodeBar = async (codeBar: string) => {

    let product;
    try {        
        const getProduct = await api.get(`/api/product/byStockAndCodeBar/${codeBar}`);
        product = getProduct.data;
    } catch (error: any) {
        console.log({error: error.message})
    }

    return product
}


export {
    getProductByCodeBar
}