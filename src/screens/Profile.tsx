import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

import { Text, View } from 'react-native'
import { styles, colores } from '../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const Profile = () => {

    const { top } = useSafeAreaInsets();

    useEffect(() => {
        console.log('Profile effect');
    }, [])

    return (
        <View
            style={{
                ...styles.globalMargin,
                marginTop: top + 10
            }}
        >
            <Text style={styles.title}> Perfil </Text>

            <Text>
                <Icon name="person-outline" size={80} color={colores.primary} />
            </Text>

        </View>
    )
}
