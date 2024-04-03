import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { AuthProvider } from './src/context/auth/AuthProvider';

import { AppNavigation } from './src/navigator/AppNavigation';
import { ShowToastMessage } from './src/components/ToastMesage';

const App = () => {

  return (
    <NavigationContainer>
      <AppState>
        <AppNavigation />
      </AppState>
      <ShowToastMessage />
    </NavigationContainer>
  );
};

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <SettingsProvider>
        <InventoryProvider>
          {children}
        </InventoryProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}


export default App;