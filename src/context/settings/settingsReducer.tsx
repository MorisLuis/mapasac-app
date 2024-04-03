
export interface SettingsState {
    vibration?: boolean
}


type SettingsActionType =
    | { type: '[Settings] - Vibration state', vibration: boolean }

export const settingsReducer = (state: SettingsState, action: SettingsActionType): SettingsState => {

    switch (action.type) {

        case '[Settings] - Vibration state':
            return {
                ...state,
                vibration: action.vibration
            }

        default:
            return state
    }

}