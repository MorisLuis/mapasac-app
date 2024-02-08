import React, { useEffect } from 'react'

import { Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export const ProfileScreen = () => {

    const { top } = useSafeAreaInsets();
    const { navigate } = useNavigation<any>();

    useEffect(() => {
        console.log('Personal Information effect');
    }, [])

    const onClick = () => {
        navigate('personalInformation');
    }

    return (
        <View
            style={{
                ...styles.globalMargin,
                marginTop: top + 10
            }}
        >
            <Text style={styles.title}> Perfil</Text>
            <TouchableOpacity
                onPress={onClick}
                style={{
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5
                }}
            >
                <View>
                    <Text>Información Personal</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
