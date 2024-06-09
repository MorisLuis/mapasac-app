import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { colores, globalStyles } from '../theme/appTheme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const StartupScreen = () => {
    return (
        <View style={styles.StartupScreen}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo01.png')}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    StartupScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colores.background_color,
        height: "100%"
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        minHeight: hp("10%"),
        maxHeight: hp("20%"),
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    logo: {
        objectFit: "scale-down",
        height: "100%"
    },
})