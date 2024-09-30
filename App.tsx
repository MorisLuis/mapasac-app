import React from 'react';
import { AuthProvider } from './src/context/auth/AuthProvider';
import { SettingsProvider } from './src/context/settings/SettingsProvider';
import { InventoryProvider } from './src/context/Inventory/InventoryBagProvider';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigation } from './src/navigator/AppNavigation';
import { ShowToastMessage } from './src/components/Ui/ToastMesage';
import { ThemeProvider } from './src/context/ThemeContext';
import { SellsProvider } from './src/context/Sells/SellsBagProvider';
import { SellsRestaurantsProvider } from './src/context/SellsRestaurants/SellsRestaurantsBagProvider';

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
      <ThemeProvider>
        <SettingsProvider>
          <SellsRestaurantsProvider>
            <SellsProvider>
              <InventoryProvider>
                {children}
              </InventoryProvider>
            </SellsProvider>
          </SellsRestaurantsProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App;
