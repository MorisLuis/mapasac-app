import { api } from "../../api/api";


const getSearchProductInStock = async (searchTerm: string) => {
    let products;
    try {
        const getProduct = await api.get(`/api/search/inventory?searchTerm=${searchTerm}`);
        products = getProduct.data;
    } catch (error: any) {
        console.log({ error: error })
    }

    return products
}


export {
    getSearchProductInStock
}