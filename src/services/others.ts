import { api } from "../api/api";


export const getModules = async () => {

    try {
        const getModules = await api.get(`/api/auth/modules`);
        const modules = getModules.data.modules;
        return modules;
    } catch (error: any) {
        return { error: error };
    }

}
