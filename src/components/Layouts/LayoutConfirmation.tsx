import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductInterfaceBag } from '../../interface/product';
import { ProductSellsInterfaceBag } from '../../interface/productSells';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { ConfirmationSkeleton } from '../Skeletons/ConfirmationSkeleton';
import { buttonStyles } from '../../theme/UI/buttons';
import DotLoader from '../Ui/DotLaoder';
import { useProtectPage } from '../../hooks/useProtectPage';
import { format } from '../../utils/currency';

export type CombinedProductInterface = ProductInterfaceBag | ProductSellsInterfaceBag;

interface LayoutConfirmationInterface {
    data: CombinedProductInterface[];
    renderItem: ({ item }: { item: any }) => React.JSX.Element;
    loadBags: () => Promise<void>;
    ListHeaderComponent?: () => React.JSX.Element;
    Type: 'sells' | 'inventory' | 'sells-restaurant';
    onPost: () => Promise<void>;
    loadData: boolean;
    availableToPost: boolean;
    buttonPostDisabled: boolean;
    numberOfItems: string;

    totalPrice?: number
}


const LayoutConfirmation = ({
    data,
    renderItem,
    loadBags,
    ListHeaderComponent,
    Type,
    onPost,
    loadData,
    availableToPost,
    buttonPostDisabled,
    numberOfItems,
    totalPrice
}: LayoutConfirmationInterface) => {

    const { theme, typeTheme } = useTheme();

    const movementType = () => {
        if (Type === 'inventory') {
            return 'Inventario'
        } else {
            return 'Venta'
        }
    }

    const navigateProtectPage = () => {
        if (Type === 'inventory') {
            return 'ScanneNavigation'
        } else {
            return 'SellsScreen'
        }
    }

    const renderListHeaderComponent = () => {
        return (
            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmation}>
                <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                    <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems}>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems_number}>{numberOfItems}</Text>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados.</Text>
                    </View>
                    <View
                        style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento:</Text>
                        <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{movementType()}</Text>
                    </View>
                    {
                        Type === 'sells' &&
                        <View
                            style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                            <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Total:</Text>
                            <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{format(totalPrice as number)}</Text>
                        </View>
                    }
                </View>
                {/* <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent}>
                    <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>Productos</Text>
                </View> */}
            </View>
        )
    }

    const { protectThisPage } = useProtectPage({
        numberOfItems: numberOfItems,
        loading: buttonPostDisabled,
        navigatePage: navigateProtectPage()
    });

    return !protectThisPage ? (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreenContent}>

                {loadData ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.idenlacemob}`} // Asegúrate de que `idenlacemob` esté presente en ambos tipos
                        onEndReached={loadBags}
                        onEndReachedThreshold={0.5}
                        ListHeaderComponent={
                            <>
                                {renderListHeaderComponent()}
                                {ListHeaderComponent?.()}
                            </>
                        }
                    />
                ) : (
                    <ConfirmationSkeleton />
                )}
            </View>

            {availableToPost && (
                <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                    <TouchableOpacity
                        style={[buttonStyles(theme).button, buttonStyles(theme).black, buttonPostDisabled && buttonStyles(theme).disabled]}
                        onPress={onPost}
                        disabled={buttonPostDisabled}
                    >
                        <Text style={buttonStyles(theme, typeTheme).buttonText}>
                            {buttonPostDisabled ? <DotLoader /> : "Confirmar"}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
        :
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View>
                <Text>Redireccionando sells...</Text>
            </View>
        </SafeAreaView>

};

export default LayoutConfirmation;
