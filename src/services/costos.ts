import { api } from "../api/api";
import CostosInterface from "../interface/costos";


interface updateCostosInterface {
    codigo: string;
    Id_Marca: number;
    body?: Partial<CostosInterface>
}


const updateCostos = async ({
    codigo,
    Id_Marca,
    body = {}
}: updateCostosInterface) => {

    try {
        const updatedProduct = await api.put(`/api/costos?codigo=${codigo}&Id_Marca=${Id_Marca}`, body);

    } catch (error: any) {
        console.log({ error: error })
    }
}

export {
    updateCostos
}