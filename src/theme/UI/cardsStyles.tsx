import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginBottom: 20
    },
    productInventoryCard: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 8, 
        padding: 10,
        marginBottom:10
    },
    productInventoryCard__data: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    productInventoryCard__Image: {
        width: 60,
        height: 80,
        marginRight: 10,
        borderRadius: 5
    },
    productInventoryCard__stock: {
        backgroundColor: "beige",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 100,
        padding: 10,
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    delete: {
        color: "red",
        paddingVertical: 10
    }
});