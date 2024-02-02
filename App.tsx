import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation } from './src/navigator/BottomNavigation';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
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
    <InventoryProvider>
      { children }
    </InventoryProvider>
  )
}


export default App;