import React from 'react';
import { DbAuthProvider } from './src/context/dbAuth/DbAuthProvider';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { NavigationContainer } from '@react-navigation/native';
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
    <DbAuthProvider>
      <AuthProvider>
        <SettingsProvider>
          <InventoryProvider>
            {children}
          </InventoryProvider>
        </SettingsProvider>
      </AuthProvider>
    </DbAuthProvider>
  )
}


export default App;
