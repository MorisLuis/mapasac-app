import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../context/ThemeContext';
import { InventoryBagContext } from '../../context/Inventory/InventoryBagContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { PorductInterfaceBag } from '../../interface/product';
import Icon from 'react-native-vector-icons/Ionicons';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { ProductInventoryConfirmationCard } from '../../components/Cards/ProductInventoryConfirmationCard';
import { buttonStyles } from '../../theme/UI/buttons';
import { useNavigation } from '@react-navigation/native';


export const ConfirmationScreen = () => {


    const { typeTheme, theme, toggleTheme } = useTheme();
    const iconColor = theme.color_tertiary
    const { getTypeOfMovementsName, user } = useContext(AuthContext);
    const [filteredBag, setFilteredBag] = useState<PorductInterfaceBag[]>([]);
    const { bag, cleanBag, numberOfItems, postInventory, postInventoryDetails } = useContext(InventoryBagContext);
    const [createInventaryLoading, setCreateInventaryLoading] = useState(false);
    const { navigate } = useNavigation<any>();

    const renderItem = useCallback(({ item }: { item: PorductInterfaceBag }) => (
        <ProductInventoryConfirmationCard product={item} onClick={() => navigate('[Modal] - editProductInBag', { product: item })}/>
    ), []);


    const onPostInventary = async () => {

        setCreateInventaryLoading(true);
        await postInventory();
        await postInventoryDetails(bag);
        cleanBag();
        
        setCreateInventaryLoading(false);
        navigate('BottomNavigation - Scanner');
        navigate('succesMessageScreen');
    };


    useEffect(() => {
        const updateFilteredBag = () => {
            setFilteredBag(bag)
        }
        updateFilteredBag()
    }, [bag])

    return (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeader}>
                <View style={{ position: 'relative', marginBottom: 15 }}>
                    <Icon name={typeTheme === 'light' ? "document-text-outline" : "document-text"} size={50} color={iconColor} />
                    <View style={{ position: "absolute", right: 0, bottom: -8 }}>
                        <Icon name="checkmark-circle" size={22} color={"green"} />
                    </View>
                </View>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationHeaderTitle}>Confirmación de {getTypeOfMovementsName()}</Text>
            </View>

            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados {numberOfItems}</Text>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento: {getTypeOfMovementsName()}</Text>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Almacen: {user?.Id_Almacen}</Text>
            </View>

            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent}>
                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>Productos</Text>
                <FlatList
                    data={filteredBag}
                    renderItem={renderItem}
                    keyExtractor={product => `${product.Codigo}-${product.Id_Marca}-${product.Marca}-${product.Id_Almacen}-${product.key}`}
                    //onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                />
            </View>

            <Button onPress={toggleTheme} title='ola'/>


            <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                <TouchableOpacity
                    style={[buttonStyles(theme).button, buttonStyles(theme).black]}
                    onPress={onPostInventary}
                >
                    <Text style={buttonStyles(theme).buttonText}>Confirmar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
        marginHorizontal: 5,
    },
});
