import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Tab } from './src/navigator/Tab';

export const App = () => {

  return (
    <NavigationContainer>
      <Tab/>
    </NavigationContainer>
  );
};
