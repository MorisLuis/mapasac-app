import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomText from '../Ui/CustumText';
import { ProductInterfaceBag } from '../../interface/product';
import { ProductSellsInterfaceBag } from '../../interface/productSells';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { ConfirmationSkeleton } from '../Skeletons/ConfirmationSkeleton';
import { globalFont } from '../../theme/appTheme';
import { useProtectPage } from '../../hooks/useProtectPage';
import { format } from '../../utils/currency';
import FooterScreen from '../Navigation/FooterScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { ModuleInterface } from '../../interface/utils';
import { LoadingScreen } from '../../screens/LoadingScreen';

export type CombinedProductInterface = ProductInterfaceBag | ProductSellsInterfaceBag;

interface LayoutConfirmationInterface {
    data: CombinedProductInterface[];
    renderItem: ({ item }: { item: any }) => React.JSX.Element;
    loadBags: () => Promise<void>;
    ListHeaderComponent?: () => React.JSX.Element;
    Type:  ModuleInterface['module'];
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
        if (Type === 'Inventory') {
            return 'Inventario'
        } else {
            return 'Venta'
        }
    }

    const navigateProtectPage = () => {
        if (Type === 'Inventory') {
            return 'ScanneNavigation'
        } else {
            return 'SellsScreen'
        }
    }

    const renderListHeaderComponent = () => {
        return (
            <>
                <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <Icon name='checkmark-circle-sharp' color={theme.color_secondary} size={globalFont.font_normal} />
                    <CustomText style={{ fontFamily: 'Rubik-Bold', color: theme.color_secondary }}>Confirmacion de pedido</CustomText>
                </View>
                <View style={ConfirmationScreenStyles(theme).confirmationSells}>

                    <View style={ConfirmationScreenStyles(theme).confirmationContainer}>
                        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Productos afectados: </CustomText>
                            <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{numberOfItems}</CustomText>
                        </View>

                        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                            <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Tipo de movimiento: </CustomText>
                            <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{movementType()}</CustomText>
                        </View>
                        {
                            Type === 'Sells' &&
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItem}>
                                <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationItemLabel}>Total: </CustomText>
                                <CustomText style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText]}>{format(totalPrice as number)}</CustomText>
                            </View>
                        }
                    </View>
                </View>
            </>
        )
    }

    const { protectThisPage } = useProtectPage({
        numberOfItems: numberOfItems,
        loading: buttonPostDisabled,
        navigatePage: navigateProtectPage()
    });


    if (protectThisPage) {
        return (
            <LoadingScreen message='Redireccionando...'/>
        )
    }

    if (!loadData) {
        return (
            <ConfirmationSkeleton />
        )
    }

    return (
        <SafeAreaView >
            <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.idenlacemob}`}
                    onEndReached={loadBags}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={
                        <>
                            {renderListHeaderComponent()}
                            {ListHeaderComponent?.()}
                            <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                                <Icon name='pricetags-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText style={{ fontFamily: 'Rubik-Bold' }}>Productos</CustomText>
                            </View>
                        </>
                    }
                />

                <FooterScreen
                    buttonOnPress={onPost}
                    buttonDisabled={buttonPostDisabled}
                    buttonTitle='Confirmar'
                    visible={availableToPost}
                />
            </View>
        </SafeAreaView>
    )

};

export default LayoutConfirmation;
