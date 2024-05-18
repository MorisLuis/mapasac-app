import { StyleSheet } from "react-native";
import { colores, globalStyles } from "./appTheme";



export const loginStyles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        backgroundColor: colores.background_color
    },
    LoginDBScreen: {
        flex: 1,
        backgroundColor: colores.background_color_secondary,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        height: 120,
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    logo: {
        maxWidth: "40%",
        objectFit: "cover",
        height: "100%"
    },
    logoHorizontal: {
        maxWidth: "60%",
        objectFit: "cover",
        height: "100%"
    },
    logoActived: {
        maxWidth: "30%",
        objectFit: "cover",
        height: "80%"
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,    
    },
    titleDB: {
        color: 'black',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 40,
        textTransform: "uppercase",
        width: "80%"
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainerDB: {
        alignItems: 'center',
        marginTop: 20
    }
});


export const loginDBStyles = StyleSheet.create({
    LoginScreen: {
        flex: 1,
        backgroundColor: colores.background_color
    },
    LoginDBScreen: {
        flex: 1,
        backgroundColor: colores.background_color_secondary,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50
    },
    logoContainer: {
        //backgroundColor: colores.color_blue,
        height: "20%",
        width: "100%",
        display: "flex",
        alignContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        width: "100%",
        height: "20%",
        marginBottom: globalStyles.globalMarginBottom.marginBottom
    },
    headers: {
        //backgroundColor: "yellow",
        height: "25%",
        width: "100%"
    },
    logo: {
        maxWidth: "40%",
        objectFit: "cover",
        height: "100%"
    },
    logoHorizontal: {
        maxWidth: "60%",
        objectFit: "cover",
        height: "100%"
    },
    logoActived: {
        maxWidth: "30%",
        objectFit: "cover",
        height: "80%"
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,    
    },
    titleDB: {
        color: 'black',
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 40,
        textTransform: "uppercase",
        width: "85%"
    },
    titleDBActive: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,  
        width: "80%"
    },
    inputsContainer:{
        //backgroundColor: "green",
        height: "25%",
        width: "100%"
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainerDB: {
        alignItems: 'center',
        marginTop: 20
    }
});