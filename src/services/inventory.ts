import { api } from "../api/api";

const postInventory = async () => {

    try {
        const { data } = await api.post('/api/invearts/inventory');
        return data
    } catch (error: any) {
        console.log({ error: error?.response?.data })
    }

}

export {
    postInventory
}