import { api } from "../api/api";


export const getModules = async () => {

    let modules;
    try {
        const getModules = await api.get(`/api/auth/modules`);
        modules = getModules.data.modules;
    } catch (error: any) {
        console.log({ errorTP: error })
    }

    return modules

}
