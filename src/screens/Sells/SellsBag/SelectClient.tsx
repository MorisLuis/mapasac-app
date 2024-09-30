import React, { useCallback, useState } from 'react';
import { getSearchClients } from '../../../services/searchs';
import { getClients } from '../../../services/utils';
import ClientInterface from '../../../interface/utils';
import useErrorHandler from '../../../hooks/useErrorHandler';
import CardSelect from '../../../components/Cards/CardSelect';
import { LayoutSearch } from '../../../components/Layouts/LayoutSearch';
import { useNavigation } from '@react-navigation/native';

export const SelectClient = () => {

    const { handleError } = useErrorHandler()
    const [itemSelected, setItemSelected] = useState<ClientInterface | null>(null);
    const { navigate } = useNavigation<any>();

    const handleGetClient = async (page: number) => {
        let newClients
        try {
            newClients = await getClients({ page, limit: 5 });
            if (newClients.error) return handleError(newClients.error);
            return newClients;
        } catch (error: any) {
            handleError(error)
        }
        return newClients;
    }

    const handleSearchClient = async (text: string) => {
        let clientsSearch
        try {
            clientsSearch = await getSearchClients({ searchTerm: text });
            if (clientsSearch.error) return handleError(clientsSearch.error);
            return clientsSearch;
        } catch (error: any) {
            handleError(error)
        }
        return clientsSearch;
    }

    const renderItem = useCallback(({ item }: { item: ClientInterface }) => (
        <CardSelect
            onPress={() => setItemSelected(item)}
            sameValue={item.idclientes === itemSelected?.idclientes}
            message={item.nombres.trim()}
            subMessage={`No. Comercial: ${item.ncomercial}`}
        />
    ), [itemSelected]);

    const onSelect = useCallback(() => {
        if (itemSelected) {
            navigate("[Sells] - confirmationScreen", { client: itemSelected });
        }
    }, [itemSelected, navigate]);

    return (
        <LayoutSearch
            handleGetItem={handleGetClient}
            handleSearchItem={handleSearchClient}
            renderItem={renderItem}
            title='cliente'
            onSelect={onSelect}
        />
    );
};
