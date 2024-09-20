import { api } from "../api/api";

export interface postSellsInterface {
    clavepago: number;
    idclientes?: number;
    comments?: string
}

const postSells = async ({ clavepago, idclientes, comments } : postSellsInterface ) => {
    try {
        const sellBody : postSellsInterface = {
            clavepago,
            idclientes,
            comments
        };

        const data = await api.post('/api/invearts/sell?mercado=true', sellBody);
        return data as any;
    } catch (error: any) {
        return { error: error };
    }
}

export {
    postSells
}