
export interface SettingsState {
    vibration?: boolean,
    cameraAvailable?: boolean
}


type SettingsActionType =
    | { type: '[Settings] - Vibration state', vibration: boolean }
    | { type: '[Settings] - CameraAvailable state', cameraAvailable: boolean }


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

        default:
            return state
    }

}