// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioPantalla from './src/pantallas/InicioPantalla';
import DetallePantalla from './src/pantallas/DetallePantalla';
import FormularioAlumnoPantalla from './src/pantallas/FormularioAlumnoPantalla';
import ColorPantalla from './src/pantallas/ColorPantalla';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={InicioPantalla} />
          <Stack.Screen name="Detalle" component={DetallePantalla} />
          <Stack.Screen name="Formulario" component={FormularioAlumnoPantalla} />
          <Stack.Screen name="Color" component={ColorPantalla} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
