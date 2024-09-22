import React from 'react';
import { View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductInterfaceBag } from '../../interface/product';
import { ProductSellsInterfaceBag } from '../../interface/productSells';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { ConfirmationSkeleton } from '../Skeletons/ConfirmationSkeleton';
import { buttonStyles } from '../../theme/UI/buttons';
import DotLoader from '../Ui/DotLaoder';
import { useProtectPage } from '../../hooks/useProtectPage';
import { format } from '../../utils/currency';
import CustomText from '../Ui/CustumText';
import ButtonCustum from '../Inputs/ButtonCustum';

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
                        <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems_number}>{numberOfItems}</CustomText>
                        <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados.</CustomText>
                    </View>
                    <View
                        style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                        <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento:</CustomText>
                        <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{movementType()}</CustomText>
                    </View>
                    {
                        Type === 'sells' &&
                        <View
                            style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                            <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Total:</CustomText>
                            <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{format(totalPrice as number)}</CustomText>
                        </View>
                    }
                </View>
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
                <>
                    <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                        <ButtonCustum
                            title='Confirmar'
                            onPress={onPost}
                            buttonColor='green'
                            disabled={buttonPostDisabled}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    )
        :
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View>
                <CustomText>Redireccionando sells...</CustomText>
            </View>
        </SafeAreaView>

};

export default LayoutConfirmation;
