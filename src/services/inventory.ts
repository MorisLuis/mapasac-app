import { api } from "../api/api";

const postInventory = async () => {

    try {
        const data = await api.post('/api/invearts/inventory');
        return data as any;
    } catch (error: any) {
        return { error: { ...error } };
    };

}

export {
    postInventory
}