import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { SellsDataScreenTheme } from '../../theme/SellsDataScreenTheme';
import { AuthContext } from '../../context/auth/AuthContext';
import CustomText from '../../components/Ui/CustumText';
import ImageContainerCustum from '../../components/Ui/ImageContainerCustum';
import FooterScreen from '../../components/Navigation/FooterScreen';
import CardButton from '../../components/Cards/CardButton';
import { UnitType, EnlacemobInterface, SellsRestaurantNavigationProp } from '../../interface';
import { SellsRestaurantBagContext } from '../../context/SellsRestaurants/SellsRestaurantsBagContext';
import { TextInputContainer } from '../../components/Inputs/TextInputContainer';

export type FormSellsRestaurantType = {
    pieces?: string;
    price?: string;
    capa?: string;
    comments?: string;
    typeClass?: UnitType;
    units?: any,
    descripcio?: string,
    image?: string,
    idinvearts?: string;
};

export const SellsRestaurantDataScreen = () => {

    const { user } = useContext(AuthContext);
    const { addProductSell, formSellsData, updateFormData } = useContext(SellsRestaurantBagContext);

    const {
        pieces,
        price,
        typeClass,
        units,
        descripcio,
        image,
        capa,
        idinvearts
    } = formSellsData;


    const { typeTheme, theme } = useTheme();
    const { goBack, navigate } = useNavigation<SellsRestaurantNavigationProp>();
    const [title, setTitle] = useState<string>();
    const [commentsState, setCommentState] = useState('');

    const { control, handleSubmit, setValue, getValues, watch } = useForm<FormSellsRestaurantType>({
        defaultValues: {
            pieces: pieces,
            price: price,
            capa: capa,
            typeClass: typeClass,
            comments: ''
        },
    });

    const formCompleted = watch('price') && watch('pieces');
    const buttonDisabled = !formCompleted;

    const onSubmit = () => {
        const { pieces, price, capa, comments } = getValues();

        const parsedPieces = parseFloat(pieces as string);
        const parsedPrice = parseFloat(price as string);
        const parsedTypeClass = Number(typeClass?.id);
        const parsedidinvearts = Number(idinvearts)
        const userId = user?.idusrmob ?? 0;
        

        if (!parsedTypeClass) return console.log("parsedTypeClass is missing");

        const bagProduct: EnlacemobInterface = {
            cantidad: isNaN(parsedPieces) ? 0 : parsedPieces,
            precio: isNaN(parsedPrice) ? 0 : parsedPrice,
            idinvearts: parsedidinvearts ?? 0,
            unidad: units,
            capa: capa ?? '',
            idusrmob: userId,
            comentario: commentsState
        };

        goBack();
        addProductSell(bagProduct);
    };

    const selectAmount = () => {
        if(commentsState.length > 0){
            updateFormData({
                comments: commentsState
            })
        };
        navigate('[Modal] - PiecesScreen', { from: "pieces", valueDefault: getValues('pieces') as string, unit: 'PZA' })
    }


    // Reset Values
    useEffect(() => {
        // The data comes from props.
        if (pieces) setValue('pieces', pieces);
        if (price) setValue('price', price);
        if (descripcio) setTitle(descripcio);

    }, [pieces, price, descripcio]);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background_color }} >
            <View style={SellsDataScreenTheme(theme, typeTheme).SellsDataScreen}>
                <View style={SellsDataScreenTheme(theme, typeTheme).header}>
                    <CustomText style={SellsDataScreenTheme(theme, typeTheme).title}>
                        {title?.trim()}
                    </CustomText>
                </View>

                <ImageContainerCustum
                    imageValue={image}
                    size="small"
                />

                <>
                    <CardButton
                        onPress={() => console.log()}
                        label='Clase:'
                        valueDefault='Seleccionar la clase'
                        color='blue'
                        control={control}
                        controlValue='typeClass'
                        icon='resize-outline'
                    />

                    <CardButton
                        onPress={() => console.log("")}
                        label='Precio:'
                        valueDefault='Seleccionar precio'
                        color='purple'
                        control={control}
                        controlValue='price'
                        icon="pricetags"
                        isPrice={true}
                    />

                    <CardButton
                        onPress={selectAmount}
                        label='Cantidad:'
                        valueDefault='Seleccionar cantidad'
                        color='green'
                        control={control}
                        controlValue='pieces'
                        icon="bag-handle"
                    />

                    <View>
                        <TextInputContainer
                            setComments={(value) => setCommentState(value)}
                            value={formSellsData.comments}
                        />
                    </View>
                </>

                <FooterScreen
                    buttonTitle="Publicar"
                    buttonOnPress={handleSubmit(onSubmit)}
                    buttonDisabled={buttonDisabled}
                />
            </View>
        </SafeAreaView>
    );
};