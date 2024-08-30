import { api } from "../api/api";

interface getClientsInterface {
    limit: number;
    page: number;
}

const getClients = async ({ limit, page } : getClientsInterface ) => {
    try {
        const { data } = await api.get(`/api/utils/clients?limit=${limit}&page=${page}`);
        return data.clients
    } catch (error: any) {
        throw error?.response?.data || new Error('Unknown error');
    }
}

export {
    getClients
}