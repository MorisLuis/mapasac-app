import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { colores } from '../theme/appTheme'

export const LoadingScreen = () => {
    return (
        <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colores.background_color
        }}>
            <ActivityIndicator 
                size={ 50 }
                color="black"
            />
        </View>
    )
}
