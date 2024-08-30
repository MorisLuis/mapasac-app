import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import { buttonStyles } from '../../../theme/UI/buttons';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import DotLoader from '../../../components/Ui/DotLaoder';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { ConfirmationSkeleton } from '../../../components/Skeletons/ConfirmationSkeleton';
import Toast from 'react-native-toast-message';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterface, ProductSellsInterfaceBag } from '../../../interface/productSells';
import { ProductSellsConfirmationCard } from '../../../components/Cards/ProductSellsConfirmationCard';
import { postSells, postSellsInterface } from '../../../services/sells';
import { format } from '../../../utils/currency';
import { useProtectPage } from '../../../hooks/useProtectPage';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { TextInputContainer } from '../../../components/Ui/TextInputContainer';
import { selectStyles } from '../../../theme/UI/inputs';
import ClientInterface from '../../../interface/utils';

interface ConfirmationSellsScreenInterface {
    route?: {
        params: {
            client: ClientInterface
        };
    };
}

export const ConfirmationSellsScreen = ({ route }: ConfirmationSellsScreenInterface) => {

    const { client } = route?.params ?? {};
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<any>();
    const iconColor = typeTheme === 'light' ? theme.text_color : theme.text_color_secondary;

    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductSellsInterfaceBag[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [methodPayment, setMethodPayment] = useState(0);
    const [typeSelected, setTypeSelected] = useState<ClientInterface>();
    const [comments, setComments] = useState("");
    const availableToPost = methodPayment !== 0;
    const [openConfirmationInfo, setOpenConfirmationInfo] = useState(true);
    const disabledToPost = methodPayment === 1 && !typeSelected;

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsConfirmationCard
            product={item}
            onClick={() => navigate('[Modal] - editProductSellInBag', { product: item })}
            disabled={createSellLoading}
        />
    ), [createSellLoading, bags]);

    const onPostInventory = async () => {
        setCreateSellLoading(true);
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                idclientes: typeSelected?.idclientes,
                comments
            }
            await postSells(sellBody);
            setTimeout(() => {
                navigate('[Sells] - succesMessageScreen');
                resetAfterPost();
            }, 500);

            setTimeout(() => {
                setCreateSellLoading(false);
            }, 750);
        } catch (error: any) {
            Toast.show({
                type: 'tomatoError',
                text1: 'Hubo un error, asegurate de tener conexión a internet.'
            })
            setCreateSellLoading(false);
            console.log("Error al crear inventario:", error);
        }
    };

    const loadBags = async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const newBags = await getBagInventory({ page, limit: 5, option: 2, mercado: true });

        if (newBags && newBags.length > 0) {
            setBags((prevBags: ProductSellsInterfaceBag[]) => [...prevBags, ...newBags]);
            setPage(page + 1);
        } else {
            setHasMore(false);
        }

        setIsLoading(false);
    };

    const handleGetPrice = async () => {
        const totalprice: string = await getTotalPriceBag({ opcion: 2, mercado: true });
        setTotalPrice(parseFloat(totalprice))
    }

    const renderScreen = () => {

        return (
            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmation}>
                <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationInfo}>
                    <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems}>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationItems_number}>{numberOfItemsSells}</Text>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Productos afectados.</Text>
                    </View>
                    <View
                        style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Tipo de movimiento:</Text>
                        <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>Venta</Text>
                    </View>
                    <View
                        style={ConfirmationScreenStyles(theme, typeTheme).confirmationMovement}>
                        <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Total:</Text>
                        <Text style={[ConfirmationScreenStyles(theme, typeTheme).confirmationText, { color: typeTheme === "light" ? theme.color_red : theme.color_tertiary }]}>{format(totalPrice as number)}</Text>
                    </View>
                </View>

                <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationPaymentInfo}>

                    {
                        methodPayment !== 0 &&
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center'
                        }}>
                            {
                                !openConfirmationInfo ? <Text>Metodo de pago</Text> : <View></View>
                            }
                            <TouchableOpacity
                                onPress={() => setOpenConfirmationInfo(!openConfirmationInfo)}
                                style={{
                                    display: "flex",
                                    borderWidth: 1,
                                    backgroundColor: theme.background_color_tertiary,
                                    borderColor: theme.color_border_tertiary,
                                    padding: globalStyles(theme).globalPadding.padding / 4,
                                    borderRadius: globalStyles(theme).borderRadius.borderRadius
                                }}
                            >
                                <Icon name={openConfirmationInfo ? 'chevron-down-outline' : 'chevron-up-outline'} color={iconColor} size={globalFont.font_normal} />
                            </TouchableOpacity>
                        </View>
                    }

                    {
                        openConfirmationInfo &&
                        <>
                            <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationDataHeader}>
                                <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Forma de pago</Text>
                            </View>

                            <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodContainer}>
                                <TouchableOpacity
                                    style={methodPayment === 1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive : ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem}
                                    onPress={() => setMethodPayment(1)}
                                >
                                    <Icon name='card-outline' color={iconColor} size={globalFont.font_normal} />
                                    <Text>Credito</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={methodPayment === 2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive : ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem}
                                    onPress={() => setMethodPayment(2)}
                                >
                                    <Icon name='cash-outline' color={iconColor} size={globalFont.font_normal} />
                                    <Text>Contado</Text>
                                </TouchableOpacity>
                            </View>

                            {
                                methodPayment === 1 &&
                                <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodClient}>
                                    <TouchableOpacity onPress={() => navigate("[Modal] - SelectClient")} style={selectStyles(theme).input}>
                                        <Text>{typeSelected ? typeSelected.nombres : 'Selecciona el cliente...'}</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                            {
                                methodPayment !== 0 &&
                                <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodClient}>
                                    <TextInputContainer label='Comentarios' setComments={setComments} />
                                </View>
                            }
                        </>
                    }

                </View>
            </View>
        )
    }

    useFocusEffect(
        useCallback(() => {
            const refreshBags = async () => {
                setIsLoading(true);
                const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 2, mercado: true });
                setBags(refreshedBags);
                setPage(2);
                setIsLoading(false);
                setHasMore(true);
                setDataUploaded(true)
            };
            handleGetPrice();
            refreshBags();
        }, [])
    );


    useEffect(() => {
        if (!client) return;

        const handleGetClient = () => {
            setTypeSelected(client)
        }

        handleGetClient();
    }, [client])


    const { protectThisPage } = useProtectPage({
        numberOfItems: numberOfItemsSells,
        loading: createSellLoading,
        navigatePage: 'SellsScreen'
    });


    return !protectThisPage ? (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View >
                {
                    dataUploaded ? (
                        <FlatList
                            data={availableToPost ? bags : []}
                            renderItem={renderItem}
                            keyExtractor={product => `${product.idenlacemob}`}
                            onEndReached={loadBags}
                            onEndReachedThreshold={0.5}
                            ListHeaderComponent={
                                <>
                                    {renderScreen()}
                                    {
                                        availableToPost &&
                                        <View style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContent}>
                                            <Text style={ConfirmationScreenStyles(theme, typeTheme).confirmationProductsContentHeader}>Productos</Text>
                                        </View>
                                    }
                                </>
                            }
                        />
                    ) : (
                        <ConfirmationSkeleton />
                    )
                }
            </View>

            {
                availableToPost && (
                    <View style={ConfirmationScreenStyles(theme, typeTheme).footer}>
                        <TouchableOpacity
                            style={[buttonStyles(theme).button, buttonStyles(theme).black, disabledToPost && buttonStyles(theme).disabled]}
                            onPress={onPostInventory}
                            disabled={disabledToPost}
                        >
                            <Text style={buttonStyles(theme, typeTheme).buttonText}>
                                {createSellLoading ? <DotLoader /> : "Confirmar"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </SafeAreaView>
    ) : (
        <SafeAreaView style={ConfirmationScreenStyles(theme, typeTheme).ConfirmationScreen}>
            <View>
                <Text>Redireccionando...</Text>
            </View>
        </SafeAreaView>
    );
};