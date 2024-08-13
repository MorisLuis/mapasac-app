import { SellsBagInterface } from "./SellsBagProvider";


type SellsBagActionType =
    | {
        type: '[SellsBag] - Update Summary',
        payload: {
            numberOfItemsSells?: string;
        }
    }


export const sellsBagReducer = (state: SellsBagInterface, action: SellsBagActionType): SellsBagInterface => {

    switch (action.type) {

        case '[SellsBag] - Update Summary':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }

}