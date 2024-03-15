import { api } from "../api/api";

export interface Id_TipoMovInvInterface {
    Id_TipoMovInv: number;
    Accion: number;
    Descripcion: string,
    Id_AlmDest?: number
}

const getTypeOfMovements = async () => {

    let typeOfMov;
    try {
        const getTypeOfMovements = await api.get(`/api/typeofmovements`);
        typeOfMov = getTypeOfMovements.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return typeOfMov

}

/* const updateTypeOfMovements = async (Id_TipoMovInv: number) => {

    let typeOfMov;

    console.log({Id_TipoMovInv})
    try {
        const getTypeOfMovements = await api.put(`/api/typeofmovements`, { Id_TipoMovInv });
        typeOfMov = getTypeOfMovements.data;

    } catch (error: any) {
        console.log({ error: error })
    }

    return typeOfMov
}
 */
export {
    getTypeOfMovements,
    //updateTypeOfMovements
}