import { api } from "../api/api";

const postInventory = async () => {
    try {
        const data = await api.post('/api/invearts/inventory');
        return data;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }
}
export {
    postInventory
}