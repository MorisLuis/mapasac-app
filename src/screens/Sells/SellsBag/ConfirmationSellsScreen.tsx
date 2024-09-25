import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterface, ProductSellsInterfaceBag } from '../../../interface/productSells';
import { ProductSellsConfirmationCard } from '../../../components/Cards/ProductSellsConfirmationCard';
import { postSells, postSellsInterface } from '../../../services/sells';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont, globalStyles } from '../../../theme/appTheme';
import { TextInputContainer } from '../../../components/Inputs/TextInputContainer';
import { selectStyles } from '../../../theme/UI/inputs';
import ClientInterface from '../../../interface/utils';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../navigator/AppNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/Ui/CustumText';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - confirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

export const ConfirmationSellsScreen = ({ route }: ConfirmationSellsScreenInterface) => {

    const { client } = route?.params ?? {};
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();
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
    const [openConfirmationInfo, setOpenConfirmationInfo] = useState(true);
    const availableToPost = methodPayment !== 0;

    const onPostInventory = async () => {
        setCreateSellLoading(true);
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                idclientes: typeSelected?.idclientes,
                comments
            }
            const postSell = await postSells(sellBody);
            
            if (postSell.error) {
                handleError(postSell.error);
                return;
            };

            setTimeout(() => {
                navigate('succesMessageScreen', { message: 'Se ha generado con exito su pedido.', redirection: 'SellsNavigation' });
                resetAfterPost();
            }, 500);

            setTimeout(() => {
                setCreateSellLoading(false);
            }, 750);

        } catch (error: any) {
            handleError(error)
        } finally {
            setCreateSellLoading(false);
        }
    };

    const loadBags = async () => {
        if (isLoading || !hasMore) return;

        try {            
            setIsLoading(true);
            const newBags = await getBagInventory({ page, limit: 5, option: 2, mercado: true });


            if (newBags.error) {
                handleError(newBags.error);
                return;
            }
    
            if (newBags && newBags.length > 0) {
                setBags((prevBags: ProductSellsInterfaceBag[]) => [...prevBags, ...newBags]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        };

    };

    const handleGetPrice = async () => {

        try {
            const totalprice = await getTotalPriceBag({ opcion: 2, mercado: true });

            if (totalprice.error) {
                handleError(totalprice.error);
                return;
            };

            setTotalPrice(parseFloat(totalprice))
        } catch (error) {
            handleError(error);
        }
    }

    const handleGetClient = () => {
        setTypeSelected(client)
    }

    const renderScreen = () => {
        return (
            <SafeAreaView>
                <View>
                    {
                        methodPayment !== 0 &&
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: 'center'
                        }}>
                            {
                                !openConfirmationInfo ? <CustomText>Metodo de pago</CustomText> : <View></View>
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
                                <CustomText style={ConfirmationScreenStyles(theme, typeTheme).confirmationText}>Forma de pago</CustomText>
                            </View>

                            <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodContainer}>
                                <TouchableOpacity
                                    style={methodPayment === 1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive : ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem}
                                    onPress={() => setMethodPayment(1)}
                                >
                                    <Icon name='card-outline' color={iconColor} size={globalFont.font_normal} />
                                    <CustomText>Credito</CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={methodPayment === 2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive : ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem}
                                    onPress={() => setMethodPayment(2)}
                                >
                                    <Icon name='cash-outline' color={iconColor} size={globalFont.font_normal} />
                                    <CustomText>Contado</CustomText>
                                </TouchableOpacity>
                            </View>

                            {
                                methodPayment === 1 &&
                                <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodClient}>
                                    <TouchableOpacity onPress={() => navigate("[Modal] - SelectClient")} style={selectStyles(theme).input}>
                                        <CustomText>{typeSelected ? typeSelected.nombres : 'Selecciona el cliente...'}</CustomText>
                                    </TouchableOpacity>
                                </View>
                            }

                            {
                                methodPayment !== 0 &&
                                <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodClient}>
                                    <TextInputContainer label='Comentarios' setComments={setComments} value={comments} />
                                </View>
                            }
                        </>
                    }

                </View>
            </SafeAreaView>
        )
    }

    const refreshBags = async () => {

        try {            
            setIsLoading(true);
            const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 2, mercado: true });

            if (refreshedBags.error) {
                handleError(refreshedBags.error);
                return;
            }

            setBags(refreshedBags);

        } catch (error) {
            handleError(error);
        } finally {
            setPage(2);
            setIsLoading(false);
            setHasMore(true);
            setDataUploaded(true)
        }
    };

    const renderItem = useCallback(({ item }: { item: ProductSellsInterface }) => (
        <ProductSellsConfirmationCard
            product={item}
            onClick={() => navigate('[Modal] - editProductSellInBag', { product: item })}
            disabled={createSellLoading}
        />
    ), [createSellLoading, bags]);

    useFocusEffect(
        useCallback(() => {
            handleGetPrice();
            refreshBags();
        }, [])
    );

    useEffect(() => {
        handleGetClient();
    }, [client])

    return (
        <LayoutConfirmation
            data={bags}
            renderItem={renderItem}
            loadBags={loadBags}
            ListHeaderComponent={renderScreen}
            Type="sells"
            onPost={onPostInventory}
            loadData={dataUploaded}
            availableToPost={availableToPost}
            buttonPostDisabled={createSellLoading}
            numberOfItems={numberOfItemsSells}
            totalPrice={totalPrice}
        />
    )
};