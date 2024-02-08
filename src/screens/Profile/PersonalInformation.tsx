import React, { useEffect } from 'react'

import { Text, View } from 'react-native'
import { styles } from '../../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const PersonalInformation = () => {

    const { top } = useSafeAreaInsets();

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    return (
        <View
            style={{
                ...styles.globalMargin,
                marginTop: top + 10
            }}
        >
            <Text style={styles.title}> Informacion personal </Text>
            <Text>  Nombre: Luis Morado </Text>
        </View>
    )
}
