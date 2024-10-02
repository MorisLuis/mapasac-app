import { api } from "../api/api";

const postInventory = async () => {

    try {
        const data = await api.post('/api/invearts/inventory');
        return data as any;
    } catch (error: any) {
        return { error: { ...error } };
    };

}

export interface postSellsInterface {
    clavepago: number; // tipo de pago
    idclientes?: number;
    comments?: string;
    opcion: 2 | 4
}

const postSells = async ({ clavepago, idclientes, comments, opcion } : postSellsInterface ) => {
    try {
        const sellBody = {
            clavepago,
            idclientes,
            comments
        };

        const data = await api.post(`/api/invearts/sell?opcion=${opcion}`, sellBody);
        return data as any;
    } catch (error: any) {
        return { error: { ...error } };
    };

};

export {
    postInventory,
    postSells
}