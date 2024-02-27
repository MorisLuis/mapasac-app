import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { AuthProvider } from './src/context/auth/AuthProvider';

import { AppNavigation } from './src/navigator/AppNavigation';

const App = () => {

  return (
    <NavigationContainer>
      <AppState>
        <AppNavigation />
      </AppState>
    </NavigationContainer>
  );
};

const AppState = ({ children }: any ) => {
  return (
    <AuthProvider>
      <InventoryProvider>
        { children }
      </InventoryProvider>
    </AuthProvider>
  )
}


export default App;