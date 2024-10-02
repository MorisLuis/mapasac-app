import React, { useCallback, useContext, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useNavigation, useFocusEffect, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { ConfirmationScreenStyles } from '../../../theme/ConfirmationScreenTheme';
import { globalFont } from '../../../theme/appTheme';
import { useTheme } from '../../../context/ThemeContext';
import { getBagInventory, getTotalPriceBag } from '../../../services/bag';
import LayoutConfirmation from '../../../components/Layouts/LayoutConfirmation';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CustomText from '../../../components/Ui/CustumText';
import CardButton from '../../../components/Cards/CardButton';
import { ProductSellsCard } from '../../../components/Cards/ProductCard/ProductSellsCard';
import { SellsRestaurantsNavigationStackParamList } from '../../../navigator/SellsRestaurantsNavigation';
import { ClientInterface, CombinedSellsAndAppNavigationStackParamList, ProductSellsRestaurantInterface } from '../../../interface';
import { SellsRestaurantBagContext } from '../../../context/SellsRestaurants/SellsRestaurantsBagContext';
import ModalMiddle from '../../../components/Modals/ModalMiddle';
import { LocationScreen } from './LocationScreen';
import { inputGoogleValue } from '../../../components/Inputs/GooglePlacesAutocomplete';
import useActionsForModules from '../../../hooks/useActionsForModules';
import { getAddress, postSells, postSellsInterface } from '../../../services';

type ConfirmationSellsScreenRouteProp = RouteProp<SellsRestaurantsNavigationStackParamList, '[SellsRestaurants] - confirmationScreen'>;

interface ConfirmationSellsScreenInterface {
    route: ConfirmationSellsScreenRouteProp;
}

export const ConfirmationSellsRestaurantScreen = ({ route }: ConfirmationSellsScreenInterface) => {

    const opcion = 4
    const { numberOfItemsSells, resetAfterPost } = useContext(SellsRestaurantBagContext);
    const { typeTheme, theme } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CombinedSellsAndAppNavigationStackParamList>>();
    const { handleError } = useErrorHandler();
    const { handleColorWithModule } = useActionsForModules()

    const [createSellLoading, setCreateSellLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [bags, setBags] = useState<ProductSellsRestaurantInterface[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [totalPrice, setTotalPrice] = useState<number>();
    const [methodPayment, setMethodPayment] = useState(0);
    const [typeSelected, setTypeSelected] = useState<ClientInterface>();
    const [openConfirmationInfo, setOpenConfirmationInfo] = useState(true);
    const [openModalLocation, setOpenModalLocation] = useState(false);
    const availableToPost = methodPayment !== 0;
    const [locationValue, setLocationValue] = useState<inputGoogleValue | undefined>();

    const onPostInventory = async () => {
        setCreateSellLoading(true);
        try {
            const sellBody: postSellsInterface = {
                clavepago: methodPayment,
                idclientes: typeSelected?.idclientes,
                opcion: 4
            };

            const postSell = await postSells(sellBody);

            if (postSell.error) {
                handleError(postSell.error);
                return;
            };

            navigate('succesMessageScreen', {
                redirection: 'SellsNavigation',
                from: 'Sells',
                numberOfProducts: numberOfItemsSells,
                importe: totalPrice as number
            });
            resetAfterPost();

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
            const newBags = await getBagInventory({ page, limit: 5, option: opcion });


            if (newBags.error) {
                handleError(newBags.error);
                return;
            }

            if (newBags && newBags.length > 0) {
                setBags((prevBags: ProductSellsRestaurantInterface[]) => [...prevBags, ...newBags]);
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
            const totalprice = await getTotalPriceBag({ opcion: opcion });
            if (totalprice.error) return handleError(totalprice.error);
            setTotalPrice(parseFloat(totalprice))
        } catch (error: any) {
            handleError(error);
        }
    }

    const refreshBags = async () => {

        try {
            setIsLoading(true);
            const refreshedBags = await getBagInventory({ page: 1, limit: 5, option: opcion });

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

    const renderItem = useCallback(({ item }: { item: ProductSellsRestaurantInterface }) => (
        <ProductSellsCard
            product={item}
            onClick={() => navigate('[Modal] - editProductSellRestaurantsInBag', { product: item })}
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
                                style={[
                                    methodPayment === 1 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                        ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === 1 && { backgroundColor: handleColorWithModule.primary }
                                ]}
                                onPress={() => setMethodPayment(1)}
                            >
                                <Icon name='card-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText>Credito</CustomText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    methodPayment === 2 ? ConfirmationScreenStyles(theme, typeTheme).paymentMethodItemActive :
                                        ConfirmationScreenStyles(theme, typeTheme).paymentMethodItem, methodPayment === 2 && { backgroundColor: handleColorWithModule.primary }
                                ]}
                                onPress={() => setMethodPayment(2)}
                            >
                                <Icon name='cash-sharp' color={theme.text_color} size={globalFont.font_normal} />
                                <CustomText>Contado</CustomText>
                            </TouchableOpacity>
                        </View>

                        <CardButton
                            onPress={() => setOpenModalLocation(true)}
                            label='Ubicación'
                            valueDefault='Seleccionar el cliente'
                            color='black'
                            icon='location'
                            specialValue={
                                locationValue
                                    ? `${locationValue.street.trim()} ${locationValue.number ? `- ${locationValue.number}` : ''} ${locationValue.neighborhood ? `/ ${locationValue.neighborhood}` : ''} ${locationValue.locality ? `/ ${locationValue.locality}` : ''}`
                                    : undefined
                            }
                        />
                    </View>
                }
            </SafeAreaView>
        )
    };

    const handleGetAddress = async () => {
        const address = await getAddress();
        setLocationValue({
            street: address.direccion ?? undefined,
            number:  address.numero ?? undefined,
            neighborhood:  address.colonia ?? undefined,
            locality:  address.estado ?? undefined     
        })
    }

    useFocusEffect(
        useCallback(() => {
            handleGetPrice();
            refreshBags();
            handleGetAddress();
        }, [])
    );

    return (
        <>
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

            <ModalMiddle
                visible={openModalLocation}
                onClose={() => setOpenModalLocation(false)}
                title='Ubicación'
            >
                <LocationScreen
                    locationValue={locationValue}
                    setLocationValue={setLocationValue}
                    onClose={() => setOpenModalLocation(false)}
                />
            </ModalMiddle>
        </>
    )
};