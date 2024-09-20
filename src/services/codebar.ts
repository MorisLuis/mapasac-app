import Toast from "react-native-toast-message";
import { api } from "../api/api";


interface updateCostosInterface {
    idinvearts: number;
    codebarras: string;
}


const updateCodeBar = async ({
    idinvearts,
    codebarras
}: updateCostosInterface) => {

    try {
        const codebar = await api.put(`/api/product/codebar/${idinvearts}`, { codbarras: codebarras });
        Toast.show({
            type: 'tomatoToast',
            text1: 'Se actualizó el codigo de barras!'
        })

        return codebar as any;
    } catch (error: any) {
        return { error: error };
    }
}

export {
    updateCodeBar
}