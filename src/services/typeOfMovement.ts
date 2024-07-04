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
        console.log({ errorTP: error })
    }

    return typeOfMov

}


export {
    getTypeOfMovements,
}