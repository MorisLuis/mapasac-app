import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, SafeAreaView, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { ProductInterfaceBag } from '../../interface/product';
import { ProductSellsInterfaceBag } from '../../interface/productSells';
import { ConfirmationScreenStyles } from '../../theme/ConfirmationScreenTheme';
import { ConfirmationSkeleton } from '../Skeletons/ConfirmationSkeleton';
import { buttonStyles } from '../../theme/UI/buttons';
import DotLoader from '../Ui/DotLaoder';

export type CombinedProductInterface = ProductInterfaceBag | ProductSellsInterfaceBag;

interface LayoutConfirmationInterface {
    data: CombinedProductInterface[];
    renderItem: ({ item }: { item: any }) => React.JSX.Element;
    loadBags: () => Promise<void>;
    ListHeaderComponent: () => React.JSX.Element;
    Type: 'sells' | 'inventory' | 'sells-restaurant';
    onPost: () => Promise<void>;
    loadData: boolean;
    availableToPost: boolean;
    buttonPostDisabled: boolean;
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
    buttonPostDisabled
}: LayoutConfirmationInterface) => {

    const { theme, typeTheme } = useTheme();

    return (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreenContent}>

                {loadData ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.idenlacemob}`} // Asegúrate de que `idenlacemob` esté presente en ambos tipos
                        onEndReached={loadBags}
                        onEndReachedThreshold={0.5}
                        ListHeaderComponent={ListHeaderComponent}
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
    );
};

export default LayoutConfirmation;
