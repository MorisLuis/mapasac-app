import { StyleSheet } from 'react-native';
import { colores, globalFont, globalStyles } from '../appTheme';


export const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginBottom: 20
    },
    productInventoryCard: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: colores.color_border_secondary,
        backgroundColor: colores.background_color_secondary,
        borderRadius: 8,
        padding: 10,
        marginBottom: globalStyles.globalMarginBottom.marginBottom,
        /* shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 3, */
    },
    productInventoryCard__Image: {
        width: 60,
        minHeight: 70,
        marginRight: 10,
        borderRadius: 5
    },
    productInventoryCard__data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        maxWidth: "100%"
    },
    dataItem: {
        display: "flex",
        flexDirection: "row"
    },
    dataItemText: {
        fontSize: 12
    },
    label: {
        fontWeight: "bold",
        marginRight: globalStyles.globalMarginBottomSmall.marginBottom,
        fontSize: 12
    },
    information: {
        maxWidth: "80%"
    },
    description: {
        fontWeight: "bold",
        marginBottom: globalStyles.globalMarginBottomSmall.marginBottom
    },
    stock: {
        backgroundColor: colores.background_color,
        borderColor: colores.color_border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        minWidth: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        //maxWidth: "20%",
    },
    delete: {
        color: "red",
        paddingVertical: 10
    },
    notImage: {
        //flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        minHeight: 70,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: colores.background_color_tertiary,
        borderWidth: 1,
        borderColor: colores.color_border
        /* minHeight: 80,
        marginRight: 10,
        borderRadius: 5 */
    },
    notImageText: {
        fontWeight: 'bold',
        fontSize: 8,
        textAlign: "center",
        lineHeight: 8, 
        maxHeight: 40,
        overflow: 'hidden',
        paddingHorizontal: 2
    },
});