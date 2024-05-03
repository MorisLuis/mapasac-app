
export interface SettingsState {
    vibration?: boolean,
    cameraAvailable?: boolean,
    limitProductsScanned: number
}


type SettingsActionType =
    | { type: '[Settings] - Vibration state', vibration: boolean }
    | { type: '[Settings] - CameraAvailable state', cameraAvailable: boolean }
    | { type: '[Settings] - limitProductsScanned state', limitProductsScanned: number }

export const settingsReducer = (state: SettingsState, action: SettingsActionType): SettingsState => {

    switch (action.type) {

        case '[Settings] - Vibration state':
            return {
                ...state,
                vibration: action.vibration
            }

        case '[Settings] - CameraAvailable state':
            return {
                ...state,
                cameraAvailable: action.cameraAvailable
            }

        case '[Settings] - limitProductsScanned state':
            return {
                ...state,
                limitProductsScanned: action.limitProductsScanned
            }

        default:
            return state
    }

}