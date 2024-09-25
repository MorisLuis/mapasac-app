import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FlatList, SafeAreaView, View } from 'react-native';
import { InventoryBagScreenStyles } from '../../theme/InventoryBagScreenTheme';
import { EmptyMessageCard } from '../../components/Cards/EmptyMessageCard';
import { InventoryBagSkeleton } from '../../components/Skeletons/InventoryBagSkeleton';
import { globalFont } from '../../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { getSearchClients } from '../../services/searchs';
import { inputStyles } from '../../theme/UI/inputs';
import { getClients } from '../../services/utils';
import ClientInterface from '../../interface/utils';
import { OneDataCard } from '../../components/Cards/OneDataCard';
import { SellsNavigationProp } from '../../navigator/SellsNavigation';
import useErrorHandler from '../../hooks/useErrorHandler';
import ButtonCustum from '../../components/Inputs/ButtonCustum';

export const SelectClient = () => {
    const { navigate } = useNavigation<SellsNavigationProp>();
    const { theme, typeTheme } = useTheme();

    const [searchText, setSearchText] = useState<string>('');
    const { handleError } = useErrorHandler()
    const [filteredClients, setFilteredClients] = useState<ClientInterface[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const searchInputRef = useRef<any>(null);

    const [itemSelected, setItemSelected] = useState<ClientInterface>()

    const iconColor = typeTheme === 'light' ? theme.text_color : theme.text_color_secondary;

    const onPostInventary = async () => {
        navigate("[Sells] - confirmationScreen", { client: itemSelected });
    };

    const loadClients = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            const newClients = await getClients({ page, limit: 5 });
            if (newClients.error) return handleError(newClients.error);

            if (newClients && newClients.length > 0) {
                //setClients(prevClients => [...prevClients, ...newClients]);
                setFilteredClients(prevClients => [...prevClients, ...newClients]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
            setDataUploaded(true);
        }
    }, [isLoading, hasMore, page]);


    const handleSearch = async (text: string) => {

        try {
            setSearchText(text);
            if (text === '') {
                setDataUploaded(false)
                setFilteredClients([]);
                setPage(0);
                loadClients();
                return;
            }

            const clientsSearch = await getSearchClients({ searchTerm: text });
            if (clientsSearch.error) return handleError(clientsSearch.error);

            setFilteredClients(clientsSearch || []);
        } catch (error) {
            handleError(error);
        } finally {
            setPage(1);
        };

    };

    const renderItem = useCallback(({ item }: { item: ClientInterface }) => (
        <OneDataCard data={item.nombres} onClick={() => setItemSelected(item)} optionSelected={item.idclientes === itemSelected?.idclientes} />

    ), [itemSelected]);

    const renderFooter = useCallback(() => (
        (filteredClients?.length <= 0 && dataUploaded) ? <ActivityIndicator size="large" color={theme.color_primary} /> : null
    ), [isLoading, theme.color_primary]);

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <SafeAreaView style={InventoryBagScreenStyles(theme, typeTheme).InventoryBagScreen}>

            {/* SEARCH BAR */}
            {
                ((filteredClients.length > 0 && dataUploaded) || (filteredClients.length <= 0 && searchText.length > 0 && dataUploaded)) &&
                <Searchbar
                    ref={searchInputRef}
                    placeholder="Buscar producto por nombre..."
                    onChangeText={query => handleSearch(query)}
                    value={searchText}
                    style={[inputStyles(theme).searchBar, inputStyles(theme).input, { gap: 0 }]}
                    iconColor={theme.text_color}
                    placeholderTextColor={theme.text_color}
                    icon={() => <Icon name="search-outline" size={20} color={iconColor} />}
                    clearIcon={() => searchText !== "" && <Icon name="close-circle" size={20} color={iconColor} />}
                    inputStyle={{ fontSize: globalFont.font_normal, fontFamily: 'SourceSans3-Regular' }}
                />
            }

            {/* PRODUCTS */}
            {
                (filteredClients?.length <= 0 && dataUploaded) ?
                    <View style={InventoryBagScreenStyles(theme, typeTheme).message}>
                        <EmptyMessageCard
                            title="No hay productos con ese nombre."
                            message='Intenta escribiendo algo diferente.'
                            icon='sad-outline'
                        />
                    </View>
                    :
                    (filteredClients.length > 0 && dataUploaded) ?
                        <FlatList
                            style={InventoryBagScreenStyles(theme, typeTheme).content}
                            data={filteredClients}
                            renderItem={renderItem}
                            keyExtractor={cliente => `${cliente.idclientes}`}
                            ListFooterComponent={renderFooter}
                            onEndReached={searchText !== "" ? null : loadClients}
                            onEndReachedThreshold={searchText !== "" ? null : 1}
                        />
                        :
                        <InventoryBagSkeleton length={10} />
            }

            {/* FOOTER */}
            {
                (filteredClients.length > 0 && dataUploaded) &&
                <View style={InventoryBagScreenStyles(theme, typeTheme).footer}>
                    <View style={InventoryBagScreenStyles(theme, typeTheme).footer_actions}>
                        <ButtonCustum
                            title='Agregar'
                            onPress={onPostInventary}
                            buttonColor='green'
                            //disabled={buttondisabled}
                            iconName='bookmark-outline'
                        />
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};
