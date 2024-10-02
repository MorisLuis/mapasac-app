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
        return { error: { ...error } };
    }
}

const getModules = async () => {

    try {
        const getModules = await api.get(`/api/auth/modules`);
        const modules = getModules.data.modules;
        return modules;
    } catch (error: any) {
        return { error: { ...error } };
    }

}


export {
    getClients,
    getModules
}