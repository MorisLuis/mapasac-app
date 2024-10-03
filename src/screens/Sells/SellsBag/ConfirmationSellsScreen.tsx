import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import { SellsBagContext } from '../../../context/Sells/SellsBagContext';
import { ProductSellsInterface } from '../../../interface/productSells';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalFont } from '../../../theme/appTheme';
import { TextInputContainer } from '../../../components/Inputs/TextInputContainer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SellsNavigationStackParamList } from '../../../navigator/SellsNavigation';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/Ui/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { CombinedSellsAndAppNavigationStackParamList } from '../../../interface/navigation';
import { postSells, postSellsInterface } from '../../../services';
import { ClientInterface } from '../../../interface';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsNavigationStackParamList, '[Sells] - confirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

export const ConfirmationSellsScreen = ({ route }: ConfirmationSellsScreenInterface) => {

    const { client } = route?.params ?? {};
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsBagContext);
    const { typeTheme, theme, toggleTheme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();

    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductSellsInterface[]>([]);
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
                comments,
                opcion: 2
            }
            const postSell = await postSells(sellBody);

            if (postSell.error) {
                handleError(postSell.error);
                return;
            };

            resetAfterPost();

            navigate('succesMessageScreen', {
                redirection: 'SellsNavigation',
                from: 'Sells',
                numberOfProducts: numberOfItemsSells,
                importe: totalPrice as number
            });

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
            const newBags = await getBagInventory({ page, limit: 5, option: 2 });


            if (newBags.error) {
                handleError(newBags.error);
                return;
            }

            if (newBags && newBags.length > 0) {
                setBags((prevBags: ProductSellsInterface[]) => [...prevBags, ...newBags]);
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
            const totalprice = await getTotalPriceBag({ opcion: 2 });
            if (totalprice.error) return handleError(totalprice.error);
            setTotalPrice(parseFloat(totalprice))
        } catch (error: any) {
            handleError(error);
        }
    }

    const handleGetClient = () => {
        setTypeSelected(client)
    }

    const refreshBags = async () => {

        try {
            setIsLoading(true);
            const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: 2 });

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
        <ProductSellsCard
            product={item}
            onClick={() => navigate('[Modal] - editProductSellInBag', { product: item })}
            renderRightProp={() => {
                return (
                    <Icon name='open-outline' color={theme.text_color} size={globalFont.font_normal} />
                )
            }}
        />
    ), [createSellLoading, bags]);

    const renderScreen = () => {
        return (
            <SafeAreaView>
                {/* <Button onPress={toggleTheme} title='ola' /> */}

                <View style={ConfirmationScreenStyles(theme).subtitleConfirmation}>
                    <Icon name='card-sharp' color={theme.color_red} size={globalFont.font_normal} />
                    <CustomText style={{ fontFamily: 'Rubik-Bold', color: theme.color_red }}>Forma de pago</CustomText>
                </View>

                {
                    openConfirmationInfo &&
                    <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodContainer}>
                        <View style={ConfirmationScreenStyles(theme, typeTheme).typeMethodContainer}>
                            <TouchableOpacity
                                style={methodPayment === 1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive : ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem}
                                onPress={() => setMethodPayment(1)}
                            >
                                <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText>Credito</CustomText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={methodPayment === 2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive : ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem}
                                onPress={() => setMethodPayment(2)}
                            >
                                <Icon name='cash-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText>Contado</CustomText>
                            </TouchableOpacity>
                        </View>

                        <CardButton
                            onPress={() => navigate("[Modal] - SelectClient")}
                            label='Cliente'
                            valueDefault='Seleccionar el cliente'
                            color='black'
                            icon='people-sharp'
                            specialValue={typeSelected ? typeSelected.nombres.trim() + "ola jaime" : undefined}
                        />

                        <View style={ConfirmationScreenStyles(theme, typeTheme).paymentMethodClient}>
                            <TextInputContainer setComments={setComments} value={comments} />
                        </View>
                    </View>
                }
            </SafeAreaView>
        )
    }


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
            Type='Sells'
            onPost={onPostInventory}
            loadData={dataUploaded}
            availableToPost={availableToPost}
            buttonPostDisabled={createSellLoading}
            numberOfItems={numberOfItemsSells}
            totalPrice={totalPrice}
        />
    )
};