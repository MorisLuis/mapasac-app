import { api } from "../api/api";

const postSells = async () => {
    try {
        const data = await api.post('/api/invearts/sell?mercado=true');
        return data;
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }
}

export {
    postSells
}