import React, { useContext, useEffect } from 'react'

import { Text, View } from 'react-native'
import { styles } from '../../theme/appTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/auth/AuthContext';


export const PersonalInformation = () => {

    const { top } = useSafeAreaInsets();
    const { user } = useContext( AuthContext );

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
            <Text>
                { JSON.stringify( user, null, 5 ) }
            </Text>        
            </View>
    )
}
